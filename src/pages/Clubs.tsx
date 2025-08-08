import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Clubs = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/clubs` : '/clubs';
  const { data } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clubs")
        .select("id, name, slug, description, location, tags")
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <main className="container mx-auto py-12">
      <Helmet>
        <title>Clubs Directory — DevClub Forge</title>
        <meta name="description" content="Browse developer clubs near you. Find communities focused on web, mobile, AI, cloud, and more." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Clubs Directory</h1>
        <p className="text-muted-foreground">Discover active developer communities</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((club) => (
          <Card key={club.id} className="transition-transform hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="text-xl">{club.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{club.description}</p>
              <div className="flex flex-wrap gap-2">
                {club.tags?.map((t: string) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{club.location}</span>
              <Link to={`/clubs/${club.slug}`}>
                <Button size="sm" variant="outline">View Club</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default Clubs;
