import { Helmet } from "react-helmet-async";
import { useParams, Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { toast } from "@/components/ui/use-toast";

// Mock team members data - in a real app, this would come from the database
const mockTeamMembers = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Club President",
    bio: "Full-stack developer passionate about building inclusive tech communities. 3+ years experience in React and Node.js.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/sarahchen"
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Technical Lead",
    bio: "AI/ML engineer with expertise in Python and TensorFlow. Loves mentoring newcomers to data science.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/marcusjohnson"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Events Coordinator",
    bio: "UX designer and frontend developer. Organizes workshops on design systems and accessibility.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/emilyrodriguez"
  },
  {
    id: "4",
    name: "David Kim",
    role: "Community Manager",
    bio: "DevOps engineer specializing in cloud infrastructure. Passionate about open source contributions.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/davidkim"
  }
];

const ClubPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { user } = useSupabaseAuth();
  const queryClient = useQueryClient();
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${location.pathname}` : location.pathname;

  const { data: club } = useQuery({
    queryKey: ["club", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clubs")
        .select("id, name, slug, description, location, tags")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: membership } = useQuery({
    queryKey: ["membership", club?.id, user?.id],
    queryFn: async () => {
      if (!club?.id || !user?.id) return null;
      const { data, error } = await supabase
        .from("club_memberships")
        .select("id")
        .eq("club_id", club.id)
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!club?.id && !!user?.id,
  });

  if (!club) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Club not found</h1>
          <p className="text-muted-foreground">The club you are looking for does not exist yet.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/clubs"><Button variant="outline">Back to Clubs</Button></Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Helmet>
        <title>{club?.name} — DevClub Forge</title>
        <meta name="description" content={club?.description ?? ''} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: club?.name,
          url: canonical,
          description: club?.description,
          address: { "@type": "PostalAddress", addressLocality: club?.location },
        })}</script>
      </Helmet>

      <section className="animated-gradient-bg py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {club?.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {club?.description}
            </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {club?.tags?.map((t: string) => (
              <Badge key={t} variant="secondary" className="px-4 py-2 text-sm">{t}</Badge>
            ))}
          </div>
            <p className="text-lg text-muted-foreground mb-8 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {club?.location}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              membership ? (
                <Button size="lg" variant="outline" onClick={async () => {
                  if (!membership?.id) return;
                  const { error } = await supabase.from("club_memberships").delete().eq("id", membership.id);
                  if (error) {
                    toast({ title: "Leave failed", description: error.message, variant: "destructive" });
                  } else {
                    toast({ title: "Left club" });
                    queryClient.invalidateQueries({ queryKey: ["membership", club?.id, user?.id] });
                  }
                }}>Leave Club</Button>
              ) : (
                <Button size="lg" variant="hero" className="pulse-glow" onClick={async () => {
                  if (!user?.id || !club?.id) return;
                  const { error } = await supabase.from("club_memberships").insert({ club_id: club.id, user_id: user.id });
                  if (error) {
                    toast({ title: "Join failed", description: error.message, variant: "destructive" });
                  } else {
                    toast({ title: "Joined club" });
                    queryClient.invalidateQueries({ queryKey: ["membership", club?.id, user?.id] });
                  }
                }}>Join Club</Button>
              )
            ) : (
              <Link to="/auth"><Button size="lg" variant="outline">Sign in to join</Button></Link>
            )}
          </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals driving our community forward
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2 border-0 glass-card text-center">
              <CardHeader className="pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-24 h-24 mx-auto ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:gradient-text transition-all duration-300">
                  {member.name}
                </CardTitle>
                <Badge variant="secondary" className="mx-auto">
                  {member.role}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Upcoming <span className="gradient-text">Events</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join us for exciting workshops, hackathons, and networking sessions
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card p-12 rounded-2xl">
            <svg className="w-16 h-16 mx-auto mb-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-semibold mb-4">No events scheduled yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to organize an event for this amazing community!
            </p>
            <Button variant="hero">Suggest an Event</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ClubPage;
