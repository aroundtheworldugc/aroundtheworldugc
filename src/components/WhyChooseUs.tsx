const WhyChooseUs = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 text-center">Why Choose Us</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-center mb-12">We Are Always Ready for the Next Adventure
            <br />
            <span className="italic"></span>
          </h2>

          <div className="space-y-8 text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
            <p>
              We travel together full-time. We explore. We document real moments. Nothing feels staged.
            </p>
            <p className="font-serif text-foreground text-xl md:text-2xl italic">
              "Brands choose us because our content feels human. It builds trust. It connects. It performs."
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mt-16">
            {[
            { title: "Creativity", desc: "Fresh perspective on every project" },
            { title: "Strategy", desc: "Data-informed creative decisions" },
            { title: "Reliability", desc: "Professional, easy to work with" }].
            map((item) =>
            <div key={item.title} className="text-center">
                <h3 className="font-serif text-2xl font-light mb-2">{item.title}</h3>
                <div className="w-6 h-px bg-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            )}
          </div>

          <div className="mt-16 border border-border p-8 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Budget-friendly because we are at the beginning of our growth phase. Open to long-term partnerships. Genuine enthusiasm and adaptability in every collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>);

};

export default WhyChooseUs;