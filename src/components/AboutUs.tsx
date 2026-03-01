import aboutImg from "@/assets/about-duo.jpg";

const AboutUs = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">About Us</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
            We Don't Just Create Content.<br />
            <span className="italic">We Live It.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">We are a creative travel duo specializing in User Generated Content for hotels, travel brands and lifestyle companies. We travel in our van exploring unique destinations, capturing real experiences and turning them into engaging digital assets.

          </p>
        </div>

        {/* Image + Bios */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <div className="aspect-[4/5] overflow-hidden">
            <img

              alt="Davide and Claudia"
              className="w-full h-full object-cover" src="/lovable-uploads/4070b360-2001-4e1e-a131-72217a0fcdb4.jpg" />

          </div>

          <div className="space-y-10">
            {/* Davide */}
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-3">Davide</h3>
              <div className="w-8 h-px bg-primary mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Master's Degree in Finance. Background in startups, venture capital and marketing. Strategic mindset focused on positioning, audience psychology and measurable results. Brings structure, performance focus and growth thinking to every collaboration.
              </p>
            </div>

            {/* Claudia */}
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-3">Claudia</h3>
              <div className="w-8 h-px bg-primary mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Osteopath with a deep understanding of body awareness, lifestyle and wellbeing. Natural talent for visual storytelling. Focus on emotion, authenticity and aesthetic coherence. Creates human-centered narratives that resonate.
              </p>
            </div>

            {/* Together */}
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-3 italic">Together</h3>
              <div className="w-8 h-px bg-primary mb-4" />
              <div className="flex flex-wrap gap-3">
                {[
                "Creative Direction",
                "Cinematic Filmmaking",
                "Strategic Positioning",
                "Authentic Storytelling",
                "Marketing Awareness"].
                map((skill) =>
                <span
                  key={skill}
                  className="text-xs tracking-widest uppercase border border-border px-3 py-1.5 text-muted-foreground">

                    {skill}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content feels */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-20">
          {["Natural", "Unforced", "Human", "Immersive", "Emotionally Engaging"].map((word) =>
          <span key={word} className="font-serif text-xl md:text-2xl italic text-muted-foreground">
              {word}
            </span>
          )}
        </div>
      </div>
    </section>);

};

export default AboutUs;