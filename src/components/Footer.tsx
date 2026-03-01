const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-serif text-lg tracking-wider">D&C</p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Davide & Claudia — Travel UGC Creators
        </p>
        <p className="text-xs text-muted-foreground italic">
          Strategic UGC for Travel & Hospitality
        </p>
      </div>
    </footer>
  );
};

export default Footer;
