import { Mail, Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CallToAction = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section id="contact" ref={ref} className="py-10 md:py-16 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-primary-foreground mb-6">
            Let's Create Something<br />
            <span className="italic">Memorable Together</span>
          </h2>
          <p className="text-primary-foreground/60 mb-10 text-sm">
            Ready to elevate your brand with authentic, cinematic content?
          </p>

          <a
            href="mailto:aroundtheworld.ugc@gmail.com"
            className="inline-flex items-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-widest uppercase hover:bg-primary-foreground/90 transition-colors duration-300"
          >
            <Mail className="w-4 h-4" />
            Start a Collaboration
          </a>

          <p className="text-primary-foreground/40 text-xs mt-8 tracking-wider">
            aroundtheworld.ugc@gmail.com
          </p>

          <a
            href="https://instagram.com/aroundtheworld.ugc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-xs mt-3 tracking-wider transition-colors duration-300"
          >
            <Instagram className="w-3.5 h-3.5" />
            @aroundtheworld.ugc
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
