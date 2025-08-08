import { Helmet } from "react-helmet-async";
import { useParams, Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { toast } from "@/components/ui/use-toast";

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
      <main className="min-h-[60vh] container mx-auto flex items-center justify-center">
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

      <section className="animated-gradient-bg">
        <div className="container mx-auto py-16">
          <h1 className="text-4xl font-bold tracking-tight mb-3">{club?.name}</h1>
          <p className="text-muted-foreground max-w-prose mb-4">{club?.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {club?.tags?.map((t: string) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mb-4">Location: {club?.location}</p>
          <div className="flex gap-3">
            {user ? (
              membership ? (
                <Button variant="outline" onClick={async () => {
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
                <Button variant="hero" onClick={async () => {
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
              <Link to="/auth"><Button variant="outline">Sign in to join</Button></Link>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-10">
        <h2 className="text-xl font-semibold mb-3">Upcoming & Past Activities</h2>
        <p className="text-muted-foreground">No events yet. Be the first to organize one!</p>
      </section>
    </main>
  );
};

export default ClubPage;
