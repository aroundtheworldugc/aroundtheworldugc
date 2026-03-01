import portfolioTravel from "@/assets/portfolio-travel.jpg";
import portfolioHotel from "@/assets/portfolio-hotel.jpg";
import portfolioLifestyle from "@/assets/portfolio-lifestyle.jpg";

const categories = [
  {
    title: "Travel & Destinations",
    description:
      "Immersive storytelling that inspires exploration. Cinematic reels. Lifestyle photography. Drone footage. Experience-based narrative.",
    image: portfolioTravel,
  },
  {
    title: "Hotels & Accommodations",
    description:
      "Atmosphere-driven content. Room tours. Detail shots. Guest journey storytelling. Luxury & boutique positioning. Highlighting experience, not just structure.",
    image: portfolioHotel,
  },
  {
    title: "Lifestyle & Product",
    description:
      "Natural integration of products into real-life travel scenarios. Soft advertising. Emotional product placement. Short-form vertical videos optimized for Instagram and TikTok.",
    image: portfolioLifestyle,
  },
];

const WhatWeCreate = () => {
  return (
    <section id="what-we-create" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">What We Create</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            Content That <span className="italic">Connects</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.title} className="group">
              <div className="aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-2xl font-light mb-3">{cat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeCreate;
