import { useEffect, useRef, useState } from "react";

const stats = [
  {
    target: 150,
    suffix: "+",
    circleLabel: "CONTENTS",
    label: "delivered across accommodations, tours, restaurants and products",
  },
  {
    target: 5,
    suffix: "",
    circleLabel: "COUNTRIES",
    label: "explored and documented:\nAustralia, Maldives, Sri Lanka, Thailand, Italy",
  },
];

const DURATION = 1200;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Ring geometry: 54° gap centered at 160° (rotated 20° counter-clockwise from the bottom, toward south-west).
// Conic angle 0° = top, growing clockwise.
const GAP = 54;
const GAP_CENTER = 160;
const GAP_START = GAP_CENTER - GAP / 2; // 133deg
const GAP_END = GAP_CENTER + GAP / 2; // 187deg

const StatItem = ({
  target,
  suffix,
  circleLabel,
  label,
  play,
}: {
  target: number;
  suffix: string;
  circleLabel: string;
  label: string;
  play: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = easeOutCubic(t);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, target]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[136px] h-[136px] md:w-[163px] md:h-[163px] lg:w-[190px] lg:h-[190px] mb-5 rounded-full"
        style={{
          background: `conic-gradient(hsl(var(--primary)) 0deg ${GAP_START}deg, transparent ${GAP_START}deg ${GAP_END}deg, hsl(var(--primary)) ${GAP_END}deg 360deg)`,
        }}
        aria-hidden="true"
      >
        {/* Inner mask to create the 2px ring thickness */}
        <div
          className="absolute rounded-full bg-background"
          style={{ inset: "2px" }}
        />
        {/* Centered number + label, nudged up ~12px for optical centering */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: "translateY(-12px)" }}>
          <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground text-center m-0 p-0 leading-none">
            {count}
            {suffix}
          </p>
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-primary mt-1.5 md:mt-2 whitespace-nowrap">
            {circleLabel}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed whitespace-pre-line text-center">
        {label}
      </p>
    </div>
  );
};

const StatsBar = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-26 bg-background border-t border-border"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 text-center">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} play={play} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
