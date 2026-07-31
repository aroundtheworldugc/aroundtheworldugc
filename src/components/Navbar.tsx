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
  // While a programmatic (smooth) scroll is running, freeze the active item.
  const scrollLockRef = useRef(false);
  const unlockRafRef = useRef<number | undefined>(undefined);
  const unlockTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stable scroll-spy: compare the visible area of every linked section.
  // A new section must be clearly more visible than the current one and
  // remain dominant briefly before the active state changes.
  useEffect(() => {
    let sectionEls = allLinks
      .map((l) => document.querySelector(l.href) as HTMLElement | null)
      .filter((el): el is HTMLElement => Boolean(el));

    let ticking = false;
    let pendingId: string | null = null;
    let pendingTimer: number | undefined;

    const compute = () => {
      ticking = false;
      if (scrollLockRef.current) return;

      if (sectionEls.length !== allLinks.length) {
        sectionEls = allLinks
          .map((link) => document.querySelector(link.href) as HTMLElement | null)
          .filter((element): element is HTMLElement => Boolean(element));
      }
      if (!sectionEls.length) return;

      const header = document.querySelector("nav");
      const headerH = header?.getBoundingClientRect().height ?? 72;
      const vh = window.innerHeight;
      const visibleTop = headerH;
      const visibleHeight = Math.max(1, vh - visibleTop);
      const areas = sectionEls.map((section) => {
        const rect = section.getBoundingClientRect();
        const visibleArea = Math.max(
          0,
          Math.min(rect.bottom, vh) - Math.max(rect.top, visibleTop),
        );
        return { id: `#${section.id}`, visibleArea };
      });

      const dominant = areas.reduce((largest, item) =>
        item.visibleArea > largest.visibleArea ? item : largest,
      );

      const current = activeIdRef.current;
      const currentArea = areas.find((item) => item.id === current)?.visibleArea ?? 0;
      const dominanceMargin = Math.max(32, visibleHeight * 0.05);
      const shouldSwitch =
        dominant.visibleArea > 0 &&
        dominant.id !== current &&
        (currentArea === 0 || dominant.visibleArea >= currentArea + dominanceMargin);

      if (shouldSwitch) {
        if (pendingId === dominant.id) return;
        window.clearTimeout(pendingTimer);
        pendingId = dominant.id;
        pendingTimer = window.setTimeout(() => {
          const nextId = pendingId;
          if (nextId) {
            activeIdRef.current = nextId;
            setActiveId(nextId);
          }
          pendingId = null;
        }, 100);
      } else {
        window.clearTimeout(pendingTimer);
        pendingId = null;
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
    const sectionObserver = new MutationObserver(compute);
    sectionObserver.observe(document.body, { childList: true, subtree: true });
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      sectionObserver.disconnect();
      window.clearTimeout(pendingTimer);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    activeIdRef.current = href;
    setActiveId(href);

    // Lock detection until the smooth scroll settles on the target.
    scrollLockRef.current = true;
    if (unlockRafRef.current) cancelAnimationFrame(unlockRafRef.current);
    window.clearTimeout(unlockTimerRef.current);

    let lastY = window.scrollY;
    let stableFrames = 0;
    const watch = () => {
      const y = window.scrollY;
      stableFrames = Math.abs(y - lastY) < 1 ? stableFrames + 1 : 0;
      lastY = y;
      if (stableFrames > 6) {
        scrollLockRef.current = false;
        return;
      }
      unlockRafRef.current = requestAnimationFrame(watch);
    };
    unlockRafRef.current = requestAnimationFrame(watch);
    // Safety net in case the scroll never settles.
    unlockTimerRef.current = window.setTimeout(() => {
      if (unlockRafRef.current) cancelAnimationFrame(unlockRafRef.current);
      scrollLockRef.current = false;
    }, 2500);
  };

  useEffect(
    () => () => {
      if (unlockRafRef.current) cancelAnimationFrame(unlockRafRef.current);
      window.clearTimeout(unlockTimerRef.current);
    },
    [],
  );


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
