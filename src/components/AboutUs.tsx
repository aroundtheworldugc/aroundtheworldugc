import aboutWebpSm from "@/assets/about-photo.jpg?format=webp&w=400";
import aboutWebpMd from "@/assets/about-photo.jpg?format=webp&w=700";
import aboutWebpLg from "@/assets/about-photo.jpg?format=webp&w=1000";
import aboutFallbackSm from "@/assets/about-photo.jpg?w=400";
import aboutFallbackMd from "@/assets/about-photo.jpg?w=700";
import aboutFallbackLg from "@/assets/about-photo.jpg?w=1000";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutUs = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section id="about" ref={ref} className="py-20 md:py-26 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">About Us</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
            We Don't Just Create Content.<br />
            <span className="italic">We Live It.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">We are a creative travel duo specializing in User Generated Content for hotels, travel brands and lifestyle companies. We travel in our van exploring unique destinations, capturing real experiences and turning them into engaging digital assets.</p>
        </div>

        {/* Image + Bios */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <div className="aspect-[4/5] overflow-hidden">
            <picture>
              <source
                srcSet={`${aboutWebpSm} 400w, ${aboutWebpMd} 700w, ${aboutWebpLg} 1000w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                type="image/webp"
              />
              <img
                src={aboutFallbackSm}
                srcSet={`${aboutFallbackSm} 400w, ${aboutFallbackMd} 700w, ${aboutFallbackLg} 1000w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Davide and Claudia"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={700}
                height={875}
              />
            </picture>
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
                  "Marketing Awareness",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs tracking-widest uppercase border border-border px-3 py-1.5 text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
