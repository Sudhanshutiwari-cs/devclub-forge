import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const CreateClub = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}/clubs/create` : '/clubs/create';

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    toast({
      title: "Enable club creation",
      description: "Connect Supabase (green button top-right) to store clubs and publish pages.",
    });
    setTimeout(() => {
      setLoading(false);
      navigate("/clubs");
    }, 1200);
  };

  return (
    <main className="container mx-auto py-12">
      <Helmet>
        <title>Create a Club — DevClub Forge</title>
        <meta name="description" content="Create your developer club page. After connecting Supabase, your club will be publicly accessible." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create a Club</h1>
        <p className="text-muted-foreground">Set up your club profile. You can add events and members later.</p>
      </header>

      <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Club name</Label>
          <Input id="name" name="name" required placeholder="e.g., GDSC Skyline University" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" required placeholder="Campus or city" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Focus areas (comma-separated)</Label>
          <Input id="tags" name="tags" placeholder="Web, Mobile, AI" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required placeholder="What is your club about?" rows={5} />
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="hero" disabled={loading}>{loading ? "Saving..." : "Save draft"}</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/clubs")}>Cancel</Button>
        </div>
      </form>
    </main>
  );
};

export default CreateClub;
