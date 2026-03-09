import portfolioTravelWebpSm from "@/assets/portfolio-travel.jpg?format=webp&w=300";
import portfolioTravelWebpLg from "@/assets/portfolio-travel.jpg?format=webp&w=600";
import portfolioTravelFb from "@/assets/portfolio-travel.jpg?w=600";
import portfolioHotelWebpSm from "@/assets/portfolio-hotel.jpg?format=webp&w=300";
import portfolioHotelWebpLg from "@/assets/portfolio-hotel.jpg?format=webp&w=600";
import portfolioHotelFb from "@/assets/portfolio-hotel.jpg?w=600";
import portfolioLifestyleWebpSm from "@/assets/portfolio-lifestyle.jpg?format=webp&w=300";
import portfolioLifestyleWebpLg from "@/assets/portfolio-lifestyle.jpg?format=webp&w=600";
import portfolioLifestyleFb from "@/assets/portfolio-lifestyle.jpg?w=600";

const categories = [
  {
    title: "Travel & Destinations",
    description: "Immersive storytelling that inspires exploration. Cinematic reels. Lifestyle photography. Drone footage. Experience-based narrative.",
    webpSm: portfolioTravelWebpSm,
    webpLg: portfolioTravelWebpLg,
    fallback: portfolioTravelFb,
  },
  {
    title: "Hotels & Accommodations",
    description: "Atmosphere-driven content. Room tours. Detail shots. Guest journey storytelling. Luxury & boutique positioning. Highlighting experience, not just structure.",
    webpSm: portfolioHotelWebpSm,
    webpLg: portfolioHotelWebpLg,
    fallback: portfolioHotelFb,
  },
  {
    title: "Lifestyle & Product",
    description: "Natural integration of products into real-life travel scenarios. Soft advertising. Emotional product placement. Short-form vertical videos optimized for Instagram and TikTok.",
    webpSm: portfolioLifestyleWebpSm,
    webpLg: portfolioLifestyleWebpLg,
    fallback: portfolioLifestyleFb,
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
                <picture>
                  <source
                    srcSet={`${cat.webpSm} 300w, ${cat.webpLg} 600w`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    type="image/webp"
                  />
                  <img
                    src={cat.fallback}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={800}
                  />
                </picture>
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
