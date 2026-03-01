const steps = [
  { num: "01", title: "Discovery", desc: "Brand discovery call to understand your goals" },
  { num: "02", title: "Concept", desc: "Creative concept development tailored to your brand" },
  { num: "03", title: "Production", desc: "On-location filming and photography" },
  { num: "04", title: "Post-Production", desc: "Professional editing and color grading" },
  { num: "05", title: "Delivery", desc: "Ready-to-use assets delivered on time" },
  { num: "06", title: "Review", desc: "Performance discussion and optimization" },
];

const Process = () => {
  return (
    <section id="process" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Process</p>
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
  );
};

export default Process;
