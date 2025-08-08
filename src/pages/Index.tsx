import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-devclubs.jpg";

const Index = () => {
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/` : '/';

  return (
    <main>
      <Helmet>
        <title>DevClub Forge — Create and Discover Tech Clubs</title>
        <meta name="description" content="Create your developer club and discover communities near you. Host events, share knowledge, and grow together." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <section className="relative">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-16 md:py-24 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Create and Discover Developer Clubs
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-prose">
              Bring developers together on your campus or in your city. Launch your club, run events, and build real-world projects with a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/clubs/create">
                <Button size="lg" variant="hero">Create a Club</Button>
              </Link>
              <Link to="/clubs">
                <Button size="lg" variant="outline">Explore Clubs</Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-[var(--shadow-elegant)]">
              <img
                src={heroImage}
                alt="Developers collaborating in a modern tech club setting"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 -z-10 h-64 animated-gradient-bg" />
      </section>
    </main>
  );
};

export default Index;
