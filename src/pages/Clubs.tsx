import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const Clubs = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/clubs` : '/clubs';
  const [searchTerm, setSearchTerm] = useState("");
  
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

  const filteredClubs = data?.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) ?? [];

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Clubs Directory — DevClub Forge</title>
        <meta name="description" content="Browse developer clubs near you. Find communities focused on web, mobile, AI, cloud, and more." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <section className="animated-gradient-bg py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Clubs <span className="gradient-text">Directory</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover active developer communities near you
          </p>
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Search clubs, technologies, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 text-lg glass-card border-0"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club) => (
            <Card key={club.id} className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2 border-0 glass-card">
            <CardHeader>
              <CardTitle className="text-xl group-hover:gradient-text transition-all duration-300">{club.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{club.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {club.tags?.map((t: string) => (
                  <Badge key={t} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">{t}</Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {club.location}
              </p>
            </CardContent>
            <CardFooter>
              <Link to={`/clubs/${club.slug}`}>
                <Button size="sm" variant="hero" className="w-full">View Club</Button>
              </Link>
            </CardFooter>
          </Card>
          ))}
        </div>
        
        {filteredClubs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-4">No clubs found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or create a new club</p>
            <Link to="/clubs/create">
              <Button variant="hero">Create a Club</Button>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Clubs;
