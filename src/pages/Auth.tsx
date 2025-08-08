import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!" });
      navigate("/");
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { display_name: displayName }
      }
    });
    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "Confirm to complete sign up." });
      navigate("/");
    }
  };

  return (
    <main className="container mx-auto max-w-md py-12">
      <Helmet>
        <title>{mode === "signin" ? "Sign In" : "Create Account"} — DevClub Forge</title>
        <meta name="description" content="Sign in or create your account to join developer clubs and manage your profile." />
        <link rel="canonical" href={`${window.location.origin}/auth`} />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-muted-foreground">
          {mode === "signin" ? "Welcome back." : "Join the community in a minute."}
        </p>
      </header>

      {mode === "signup" && (
        <div className="mb-4 space-y-2">
          <Label htmlFor="displayName">Display name</Label>
          <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Ada Lovelace" />
        </div>
      )}

      <div className="mb-4 space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>
      <div className="mb-6 space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      </div>

      <div className="flex items-center gap-3">
        {mode === "signin" ? (
          <Button onClick={handleSignIn} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
        ) : (
          <Button onClick={handleSignUp} disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
        )}
        <Button variant="outline" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          aria-label={mode === "signin" ? "Switch to sign up" : "Switch to sign in"}
        >
          {mode === "signin" ? "Need an account?" : "Have an account?"}
        </Button>
      </div>
    </main>
  );
};

export default Auth;
