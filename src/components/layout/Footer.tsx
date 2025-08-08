const Footer = () => {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto py-10">
        <div className="animated-gradient-bg h-px w-full mb-6 rounded" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DevClub Forge</p>
          <nav className="flex items-center gap-6">
            <a href="/clubs" className="hover:text-foreground">Clubs</a>
            <a href="/clubs/create" className="hover:text-foreground">Create a Club</a>
            <a href="/" className="hover:text-foreground">Home</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
