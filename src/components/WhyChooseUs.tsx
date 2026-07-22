import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  { title: "Creativity", desc: "Fresh perspective on every project" },
  { title: "Strategy", desc: "Data informed creative decisions" },
  { title: "Reliability", desc: "Professional, easy to work with" },
];

const WhyChooseUs = () => {
  const whyRef = useScrollReveal<HTMLElement>();

  return (
    <section id="why-choose-us" ref={whyRef} className="py-10 md:py-16 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
            Approach
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-center mb-12">
            We Are Always Ready for the Next Adventure
          </h2>

          <div className="space-y-8 text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
            <p>
              We travel together full time. We explore. We document real moments. Nothing feels staged.
            </p>
            <p className="font-serif text-foreground text-xl md:text-2xl italic">
              "Brands choose us because our content feels human. It builds trust. It connects. It performs."
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {values.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-serif text-2xl font-light mb-2">{item.title}</h3>
                <div className="w-6 h-px bg-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-border p-8 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Trusted by 50 brands across five countries. Consistent quality, reliable delivery, and a workflow refined collaboration after collaboration.
            </p>
          </div>

          <div className="mt-10">
            <div className="hidden md:flex items-start justify-between relative">
              {/* Horizontal connector — sits behind the filled circles */}
              <div
                className="absolute top-4 left-[16.67%] right-[16.67%] h-px bg-primary/30"
                aria-hidden="true"
              />
              {[
                { step: "01", title: "First Contact", desc: "A quick message to align on details" },
                { step: "02", title: "On Location", desc: "Days of filming and photography" },
                { step: "03", title: "Delivery", desc: "Fully edited story within 14 days" },
              ].map((item) => (
                <div key={item.step} className="relative flex flex-col items-center text-center w-1/3 px-4">
                  <span className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-serif text-sm tracking-widest mb-5">
                    {item.step}
                  </span>
                  <p className="text-xs tracking-widest uppercase text-foreground font-medium mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="md:hidden flex flex-col">
              {[
                { step: "01", title: "First Contact", desc: "A quick message to align on details" },
                { step: "02", title: "On Location", desc: "Days of filming and photography" },
                { step: "03", title: "Delivery", desc: "Fully edited story within 14 days" },
              ].map((item, i, arr) => (
                <div key={item.step} className="relative flex items-start pb-6 last:pb-0">
                  <span className="z-10 flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-serif text-sm tracking-widest">
                    {item.step}
                  </span>
                  {i < arr.length - 1 && (
                    <div
                      className="absolute top-8 left-4 bottom-6 w-px bg-primary/30"
                      aria-hidden="true"
                    />
                  )}
                  <div className="ml-4 flex flex-col">
                    <p className="text-xs tracking-widest uppercase text-foreground font-medium mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
