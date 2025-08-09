import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

const Navbar = () => {
  const { user } = useSupabaseAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Logout failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Signed out" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b glass-card backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="font-bold tracking-tight text-xl gradient-text hover:scale-105 transition-transform">
          IdeaKode <span className="text-foreground">Developers on Campus</span>
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/clubs" className={({ isActive }) => isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}>
            <Button variant="ghost">Explore Clubs</Button>
          </NavLink>
          <NavLink to="/clubs/create">
            <Button variant="hero" className="hover:scale-105 transition-transform">Create Club</Button>
          </NavLink>
          {user ? (
            <>
              <NavLink to="/profile">
                <Button variant="outline">My Profile</Button>
              </NavLink>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <NavLink to="/auth">
              <Button variant="outline">Sign In</Button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
