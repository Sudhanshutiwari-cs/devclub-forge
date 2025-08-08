import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

      <section className="relative overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-16 md:py-24 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Create and Discover <span className="gradient-text">Developer Clubs</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-prose leading-relaxed">
              Bring developers together on your campus or in your city. Launch your club, run events, and build real-world projects with a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/clubs/create">
                <Button size="lg" variant="hero" className="pulse-glow">Create a Club</Button>
              </Link>
              <Link to="/clubs">
                <Button size="lg" variant="outline">Explore Clubs</Button>
              </Link>
            </div>
          </div>
          <div className="relative floating-animation">
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src={heroImage}
                alt="Developers collaborating in a modern tech club setting"
                loading="lazy"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 -z-10 h-96 animated-gradient-bg" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-green-500 rounded-full opacity-80 animate-pulse delay-500"></div>
      </section>

      <section className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Why Choose <span className="gradient-text">DevClub Forge</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build and grow a thriving developer community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="glass-card border-0 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Build Community</h3>
              <p className="text-muted-foreground">Connect like-minded developers and create lasting professional relationships</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Organize Events</h3>
              <p className="text-muted-foreground">Host workshops, hackathons, and networking events with built-in tools</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Grow Skills</h3>
              <p className="text-muted-foreground">Learn new technologies through collaborative projects and peer mentoring</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Popular <span className="gradient-text">Focus Areas</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover clubs specializing in cutting-edge technologies
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {["Web Development", "Mobile Apps", "AI & Machine Learning", "Cloud Computing", "DevOps", "Blockchain", "Cybersecurity", "Data Science", "Game Development", "Open Source"].map((tech) => (
            <Badge key={tech} variant="secondary" className="px-6 py-3 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
              {tech}
            </Badge>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
