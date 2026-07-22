import { useScrollReveal } from "@/hooks/useScrollReveal";

const partnerships = [
  "Hotel stays",
  "Experiences",
  "Restaurants",
  "Brand partnerships",
  "Long-term collaborations",
];

const formats = [
  "Barter partnerships",
  "Content production exchange",
  "Paid UGC packages",
  "Monthly retainers",
];

const PartnershipModel = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Partnership</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            Flexible <span className="italic">Collaboration</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          <div>
            <h3 className="font-serif text-xl font-medium mb-6">Open To</h3>
            <div className="space-y-3">
              {partnerships.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-medium mb-6">Collaboration Formats</h3>
            <div className="space-y-3">
              {formats.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-4 leading-relaxed">
              For premium remote destinations, barter partnerships typically include extended stays to allow for richer, more complete storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipModel;
