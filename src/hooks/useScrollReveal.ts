import { useEffect, useRef } from "react";

// Premium, unhurried motion: long-tail ease-out, subtle 16px lift.
const EASING = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const DURATION = 0.68; // seconds
const DISTANCE = "16px";

type ScrollRevealOptions = {
  /** Delay before the sequence starts, in ms. */
  delay?: number;
  /** Gap between direct children, in ms. Set to 0 to reveal as a single block. */
  stagger?: number;
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) {
  const { delay = 0, stagger = 80 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Descend through single-child wrappers to find the real content group.
    let group: HTMLElement = el;
    for (let depth = 0; depth < 3; depth += 1) {
      const only = group.children.length === 1 ? group.children[0] : null;
      if (!(only instanceof HTMLElement)) break;
      group = only;
    }

    const children = Array.from(group.children) as HTMLElement[];
    // Stagger direct children so a section reads as one coordinated sequence.
    const targets =
      stagger > 0 && children.length > 1 && children.length <= 10
        ? children
        : [el];


    // Use GPU-accelerated properties only (opacity + transform)
    targets.forEach((target, index) => {
      const targetDelay = delay + index * (targets.length > 1 ? stagger : 0);
      target.style.opacity = "0";
      target.style.transform = `translate3d(0, ${DISTANCE}, 0)`;
      target.style.willChange = "opacity, transform";
      target.style.transition = `opacity ${DURATION}s ${EASING} ${targetDelay}ms, transform ${DURATION}s ${EASING} ${targetDelay}ms`;
    });

    const timers: number[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          targets.forEach((target, index) => {
            target.style.opacity = "1";
            target.style.transform = "translate3d(0, 0, 0)";
            const total =
              delay +
              index * (targets.length > 1 ? stagger : 0) +
              DURATION * 1000 +
              60;
            timers.push(
              window.setTimeout(() => {
                target.style.willChange = "auto";
              }, total),
            );
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [delay, stagger]);

  return ref;
}
