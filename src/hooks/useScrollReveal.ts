import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use GPU-accelerated properties only (opacity + transform)
    el.style.opacity = "0";
    el.style.transform = "translate3d(0, 20px, 0)";
    el.style.willChange = "opacity, transform";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate3d(0, 0, 0)";
          // Clean up will-change after animation completes
          setTimeout(() => {
            el.style.willChange = "auto";
          }, 700);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
