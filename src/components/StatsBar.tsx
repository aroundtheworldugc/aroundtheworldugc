import { useEffect, useRef, useState } from "react";

const stats = [
  {
    target: 150,
    suffix: "+",
    label: "Contents delivered across accommodations, tours, restaurants and products",
  },
  {
    target: 5,
    suffix: "",
    label: "Countries explored and documented:\nAustralia, Maldives, Sri Lanka, Thailand, Italy",
  },
];

const DURATION = 1200; // ms
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const StatItem = ({
  target,
  suffix,
  label,
  play,
}: {
  target: number;
  suffix: string;
  label: string;
  play: boolean;
}) => {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 for ring

  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = easeOutCubic(t);
      setProgress(eased);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, target]);

  // SVG ring
  const size = 100; // viewBox units
  const stroke = 2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-5">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 w-full h-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground text-center leading-none m-0">
            {count}
            {suffix}
          </p>
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
