import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Video,
  Plane,
  Camera,
  Instagram,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  Target,
  Send,
  Repeat,
  type LucideIcon,
} from "lucide-react";

type Item = { icon: LucideIcon; text: string };

const deliverables: Item[] = [
  { icon: Video, text: "Cinematic vertical videos" },
  { icon: Plane, text: "Drone footage" },
  { icon: Camera, text: "Professionally edited photos" },
  { icon: Instagram, text: "Instagram Stories coverage" },
  { icon: FileCheck, text: "Full commercial usage rights, delivered within 14 days" },
];

const meaning: Item[] = [
  { icon: TrendingUp, text: "Higher engagement within 24 hours of posting" },
  { icon: ShieldCheck, text: "Authentic perception, builds genuine brand trust" },
  { icon: Target, text: "Performance driven content, structured for conversion" },
  { icon: Send, text: "Ready to publish content for your own social channels" },
  { icon: Repeat, text: "Assets you can reuse in ads and on your website for years" },
];

const Deliverables = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section id="services" ref={ref} className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Capabilities
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            What <span className="italic">You Get</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="border border-border p-8 md:p-10">
            <h3 className="font-serif text-2xl md:text-3xl font-light mb-6">
              The <span className="italic">Deliverables</span>
            </h3>
            <ul className="space-y-3">
              {deliverables.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 text-sm text-foreground border-b border-border/50 pb-3 last:border-b-0"
                >
                  <Icon className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border p-8 md:p-10">
            <h3 className="font-serif text-2xl md:text-3xl font-light mb-6">
              What It <span className="italic">Means For You</span>
            </h3>
            <ul className="space-y-3">
              {meaning.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 text-sm text-foreground border-b border-border/50 pb-3 last:border-b-0"
                >
                  <Icon className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deliverables;
