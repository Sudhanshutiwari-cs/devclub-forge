import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-lg">
          DevClub Forge
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/clubs" className={({ isActive }) => isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}>
            <Button variant="ghost">Explore Clubs</Button>
          </NavLink>
          <NavLink to="/clubs/create">
            <Button variant="hero">Create Club</Button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
