import { Camera, Film, Image, Plane, FileVideo, Package } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const deliverables = [
  { icon: Film, label: "15s Instagram Reel / TikTok" },
  { icon: Camera, label: "Cinematic short-form vertical videos" },
  { icon: Image, label: "Professional edited photos" },
  { icon: Plane, label: "Drone footage" },
  { icon: FileVideo, label: "Story-based content" },
  { icon: Package, label: "Ready-to-use marketing assets" },
];

const extras = [
  "Raw footage (optional add-on)",
  "Usage rights options",
  "Long-term content partnerships",
];

const Services = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section id="services" ref={ref} className="py-20 md:py-26">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Services</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            Our <span className="italic">Deliverables</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm">
            Every deliverable is designed as a ready-to-use asset for paid or organic campaigns.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {deliverables.map((item) => (
            <div
              key={item.label}
              className="border border-border p-6 flex items-start gap-4 hover:border-primary/40 transition-colors duration-300"
            >
              <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {extras.map((extra) => (
            <span
              key={extra}
              className="text-xs tracking-widest uppercase text-muted-foreground border-b border-border pb-1"
            >
              {extra}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
