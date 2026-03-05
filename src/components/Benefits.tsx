import { TrendingUp, Eye, Clock, Heart, Zap, BarChart3, CheckCircle, Target } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const benefits = [
  { icon: Eye, title: "Boost of Visibility", desc: "Amplify your brand reach across platforms" },
  { icon: TrendingUp, title: "Higher Engagement", desc: "Within 24 hours of posting" },
  { icon: Clock, title: "High Watch Time", desc: "Content that holds attention" },
  { icon: Heart, title: "Authentic Perception", desc: "Build genuine brand trust" },
  { icon: Zap, title: "Emotional Connection", desc: "Content that resonates deeply" },
  { icon: CheckCircle, title: "Ready-to-Post", desc: "No extra editing needed" },
  { icon: Target, title: "Performance-Driven", desc: "Structured for conversion" },
  { icon: BarChart3, title: "Measurable Impact", desc: "Track real results" },
];

const Benefits = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className="py-20 md:py-26 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">What You Get</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            More Than <span className="italic">Aesthetics</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm">
            Our content isn't just beautiful — it's built for conversion and retention.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <b.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <h3 className="font-serif text-lg font-medium mb-1">{b.title}</h3>
              <p className="text-xs text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
