-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy if not exists "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy if not exists "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy if not exists "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Timestamp trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for profiles updated_at
create or replace trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Seed profiles trigger on auth.users signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url, bio)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    null,
    null
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create clubs table
create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  location text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.clubs enable row level security;

-- Public can view clubs
create policy if not exists "Clubs are viewable by everyone"
  on public.clubs for select using (true);

-- Create club_memberships table
create table if not exists public.club_memberships (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  unique (club_id, user_id)
);

alter table public.club_memberships enable row level security;

-- RLS: users manage their own memberships
create policy if not exists "Users can view their own memberships"
  on public.club_memberships for select
  using (auth.uid() = user_id);

create policy if not exists "Users can join clubs"
  on public.club_memberships for insert
  with check (auth.uid() = user_id);

create policy if not exists "Users can leave clubs"
  on public.club_memberships for delete
  using (auth.uid() = user_id);

-- Seed initial clubs
insert into public.clubs (name, slug, description, location, tags)
values
  ('GDSC Skyline University', 'gdsc-skyline-university', 'A community of builders and learners exploring web, mobile, and AI.', 'Skyline University, CA', array['Web','Mobile','AI']),
  ('DevClub Downtown', 'devclub-downtown', 'Weekly meetups, hack nights, and open-source sprints for all levels.', 'Downtown Community Hub, NY', array['Open Source','Hack Nights']),
  ('Cloud & AI Society', 'cloud-ai-society', 'Hands-on workshops on cloud-native, ML, and serverless architectures.', 'Tech Park, TX', array['Cloud','ML','Serverless'])
on conflict (slug) do nothing;
