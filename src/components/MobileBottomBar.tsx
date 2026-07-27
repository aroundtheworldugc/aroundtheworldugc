import { useEffect, useRef, useState } from "react";

const MobileBottomBar = () => {
  const [visible, setVisible] = useState(true);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const contactEl = document.getElementById("contact");
    contactRef.current = contactEl;

    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!(entry.isIntersecting && entry.intersectionRatio >= 0.15));
      },
      { threshold: [0, 0.15, 0.3] }
    );

    observer.observe(contactEl);
    return () => observer.disconnect();
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
