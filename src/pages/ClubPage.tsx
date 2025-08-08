import { Helmet } from "react-helmet-async";
import { useParams, Link, useLocation } from "react-router-dom";
import { clubs } from "@/data/clubs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ClubPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const club = clubs.find((c) => c.slug === slug);
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${location.pathname}` : location.pathname;

  if (!club) {
    return (
      <main className="min-h-[60vh] container mx-auto flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Club not found</h1>
          <p className="text-muted-foreground">The club you are looking for does not exist yet.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/clubs"><Button variant="outline">Back to Clubs</Button></Link>
            <Link to="/clubs/create"><Button variant="hero">Create a Club</Button></Link>
          </div>
        </div>
      </main>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: club.name,
    url: canonical,
    description: club.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: club.location,
    },
  };

  return (
    <main>
      <Helmet>
        <title>{club.name} — DevClub Forge</title>
        <meta name="description" content={club.description} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="animated-gradient-bg">
        <div className="container mx-auto py-16">
          <h1 className="text-4xl font-bold tracking-tight mb-3">{club.name}</h1>
          <p className="text-muted-foreground max-w-prose mb-4">{club.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {club.tags.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Location: {club.location}</p>
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
