import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Cinematic golden hour travel scene"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className="text-sm tracking-[0.3em] uppercase text-primary-foreground/80 mb-6 animate-fade-up md:text-xl"
          style={{ animationDelay: "0.2s" }}>

          Travel UGC Creators
        </p>
        <h1
          className="font-serif text-4xl md:text-7xl lg:text-8xl font-light text-primary-foreground leading-[1.1] mb-6 animate-fade-up max-w-5xl mx-auto"
          style={{ animationDelay: "0.4s" }}>
          Davide & Claudia
        </h1>
        <p
          className="font-serif text-xl md:text-2xl text-primary-foreground/90 italic mb-4 animate-fade-up"
          style={{ animationDelay: "0.6s" }}>

          Cinematic Storytelling for Hotels, Travel & Lifestyle Brands
        </p>
        <p
          className="text-sm md:text-base text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.8s" }}>

          We create immersive, authentic content that makes people feel the experience before they even arrive.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "1s" }}>

          <a
            href="#contact"
            className="bg-primary-foreground text-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-primary-foreground/90 transition-colors duration-300">

            Work With Us
          </a>
          <a
            href="#work"
            className="border border-primary-foreground/50 text-primary-foreground px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-primary-foreground/10 transition-colors duration-300">

            View Our Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.5s" }}>
        <div className="w-px h-12 bg-primary-foreground/40 mx-auto mb-2" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary-foreground/50">Scroll</p>
      </div>
    </section>);

};

export default Hero;