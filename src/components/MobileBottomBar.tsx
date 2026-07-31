import { useEffect, useState } from "react";

const MobileBottomBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const pastHero = window.scrollY > window.innerHeight; // past ~100vh
      const nearContact = scrollPos >= docHeight - 600;
      setVisible(pastHero && !nearContact);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <a
          href="#contact"
          className="block w-full max-w-md mx-auto text-center text-sm tracking-widest uppercase bg-primary text-primary-foreground px-8 py-3.5 hover:bg-primary/90 transition-colors duration-300"
        >
          Get In Touch
        </a>
      </div>
    </div>
  );
};

export default MobileBottomBar;
