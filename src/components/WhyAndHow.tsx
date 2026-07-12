import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  { title: "Creativity", desc: "Fresh perspective on every project" },
  { title: "Strategy", desc: "Data informed creative decisions" },
  { title: "Reliability", desc: "Professional, easy to work with" },
];

const steps = [
  { num: "01", title: "Discovery", desc: "Brand discovery call to understand your goals" },
  { num: "02", title: "Concept", desc: "Creative concept development tailored to your brand" },
  { num: "03", title: "Production", desc: "On location filming and photography" },
  { num: "04", title: "Post Production", desc: "Professional editing and color grading" },
  { num: "05", title: "Delivery", desc: "Ready to use assets delivered on time" },
  { num: "06", title: "Review", desc: "Performance discussion and optimization" },
];

const WhyAndHow = () => {
  const whyRef = useScrollReveal<HTMLElement>();
  const processRef = useScrollReveal<HTMLElement>();

  return (
    <>
      <section id="why-choose-us" ref={whyRef} className="py-20 md:py-26">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">
              Why Choose Us
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

            <div className="grid sm:grid-cols-3 gap-8 mt-16">
              {values.map((item) => (
                <div key={item.title} className="text-center">
                  <h3 className="font-serif text-2xl font-light mb-2">{item.title}</h3>
                  <div className="w-6 h-px bg-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 border border-border p-8 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trusted by 23 brands across five countries. Consistent quality, reliable delivery, and a workflow refined collaboration after collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="process" ref={processRef} className="py-20 md:py-26 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Process
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
              How We <span className="italic">Work</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.num} className="group">
                <span className="text-3xl font-serif text-primary/30 group-hover:text-primary/60 transition-colors duration-300">
                  {step.num}
                </span>
                <h3 className="font-serif text-xl font-medium mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyAndHow;
