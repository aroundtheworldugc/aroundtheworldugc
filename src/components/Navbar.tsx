import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#services" },
  { label: "Approach", href: "#why-choose-us" },
];

const allLinks = [...navLinks, { label: "Contact", href: "#contact" }];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const activeIdRef = useRef<string>("");
  activeIdRef.current = activeId;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stable scroll-spy: a section becomes active only when it clearly
  // occupies a target line near the center of the viewport (just below
  // the sticky header), with a short debounce so it never flickers
  // near section boundaries.
  useEffect(() => {
    const sectionEls = allLinks
      .map((l) => document.querySelector(l.href) as HTMLElement | null)
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sectionEls.length) return;

    let ticking = false;
    let pending: string | null = null;
    let pendingTimer: number | undefined;

    const compute = () => {
      ticking = false;
      // Target line: ~42% from top, but never behind the sticky header.
      const headerH = 72;
      const vh = window.innerHeight;
      const targetLine = headerH + (vh - headerH) * 0.42;

      let occupying: string | null = null;
      // First pass: section that fully spans the target line.
      for (let i = 0; i < sectionEls.length; i++) {
        const rect = sectionEls[i].getBoundingClientRect();
        if (rect.top <= targetLine && rect.bottom > targetLine) {
          occupying = `#${sectionEls[i].id}`;
          break;
        }
      }
      // Fallback (target line sits in a gap between sections):
      // the last section whose top has passed the line.
      if (!occupying) {
        for (let i = 0; i < sectionEls.length; i++) {
          if (sectionEls[i].getBoundingClientRect().top <= targetLine) {
            occupying = `#${sectionEls[i].id}`;
          }
        }
      }

      const current = activeIdRef.current;
      if (occupying && occupying !== current) {
        // Hysteresis: the new candidate must persist ~140ms before we
        // commit, so brief overshoots near boundaries don't flicker.
        if (pending === occupying) return;
        window.clearTimeout(pendingTimer);
        pending = occupying;
        pendingTimer = window.setTimeout(() => {
          setActiveId(occupying!);
          pending = null;
        }, 140);
      } else if (!occupying) {
        // In a real gap with no candidate: cancel any pending switch
        // and keep the current item sticky.
        window.clearTimeout(pendingTimer);
        pending = null;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      window.clearTimeout(pendingTimer);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setActiveId(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[280ms] ease-out ${
        scrolled
          ? "py-4 bg-background/95 backdrop-blur-[10px] border-b border-warm-taupe/25 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#" className="font-serif text-xl tracking-wider font-semibold text-foreground">
          D&C
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = activeId === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative text-sm tracking-widest uppercase transition-all duration-300 ${
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1.5 h-px bg-foreground transition-all duration-300 ease-out ${
                    active ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => handleNavClick("#contact")}
            className={`text-sm tracking-widest uppercase transition-colors duration-300 px-6 py-3 ${
              activeId === "#contact"
                ? "bg-primary text-primary-foreground ring-1 ring-primary/40"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => {
              const active = activeId === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-sm tracking-widest uppercase transition-all duration-300 ${
                    active
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-1/2 -bottom-1.5 h-px bg-foreground transition-all duration-300 ease-out ${
                      active ? "w-6 opacity-100 -translate-x-1/2" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => handleNavClick("#contact")}
              className={`text-sm tracking-widest uppercase transition-colors duration-300 px-5 py-2.5 ${
                activeId === "#contact"
                  ? "bg-primary text-primary-foreground ring-1 ring-primary/40"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
