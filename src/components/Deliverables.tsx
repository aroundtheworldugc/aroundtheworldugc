import { useScrollReveal } from "@/hooks/useScrollReveal";

const deliverables = [
  "One cinematic vertical video",
  "5 to 7 professionally edited photos",
  "Instagram Stories coverage",
  "Full commercial usage rights",
  "Delivery within 14 days",
];

const meaning = [
  "Ready-to-publish content for your own social channels",
  "Assets you can reuse in ads and on your website for years",
  "A stronger, more authentic brand presence without lifting a camera",
];

const Deliverables = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section id="services" ref={ref} className="py-20 md:py-26">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Deliverables
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
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="text-sm text-foreground border-b border-border/50 pb-3 last:border-b-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border p-8 md:p-10">
            <h3 className="font-serif text-2xl md:text-3xl font-light mb-6">
              What It <span className="italic">Means For You</span>
            </h3>
            <ul className="space-y-3">
              {meaning.map((item) => (
                <li
                  key={item}
                  className="text-sm text-foreground border-b border-border/50 pb-3 last:border-b-0"
                >
                  {item}
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
