import portfolioTravelWebpSm from "@/assets/portfolio-travel.jpg?format=webp&w=300";
import portfolioTravelWebpLg from "@/assets/portfolio-travel.jpg?format=webp&w=600";
import portfolioTravelFb from "@/assets/portfolio-travel.jpg?w=600";
import portfolioHotelWebpSm from "@/assets/portfolio-hotel.jpg?format=webp&w=300";
import portfolioHotelWebpLg from "@/assets/portfolio-hotel.jpg?format=webp&w=600";
import portfolioHotelFb from "@/assets/portfolio-hotel.jpg?w=600";
import portfolioLifestyleWebpSm from "@/assets/portfolio-lifestyle.jpg?format=webp&w=300";
import portfolioLifestyleWebpLg from "@/assets/portfolio-lifestyle.jpg?format=webp&w=600";
import portfolioLifestyleFb from "@/assets/portfolio-lifestyle.jpg?w=600";
import portfolioSurfcampWebpSm from "@/assets/portfolio-surfcamp.jpg?format=webp&w=300";
import portfolioSurfcampWebpLg from "@/assets/portfolio-surfcamp.jpg?format=webp&w=600";
import portfolioSurfcampFb from "@/assets/portfolio-surfcamp.jpg?w=600";

const items = [
  { webpSm: portfolioTravelWebpSm, webpLg: portfolioTravelWebpLg, fallback: portfolioTravelFb, label: "Travel Australia", span: "col-span-1 row-span-1" },
  { webpSm: portfolioHotelWebpSm, webpLg: portfolioHotelWebpLg, fallback: portfolioHotelFb, label: "Hotel Collaborations", span: "col-span-1 row-span-1" },
  { webpSm: portfolioSurfcampWebpSm, webpLg: portfolioSurfcampWebpLg, fallback: portfolioSurfcampFb, label: "Surf Camp", span: "col-span-2 row-span-1 md:col-span-1" },
  { webpSm: portfolioLifestyleWebpSm, webpLg: portfolioLifestyleWebpLg, fallback: portfolioLifestyleFb, label: "Lifestyle & Product", span: "col-span-1 row-span-1" },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Portfolio</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            Selected <span className="italic">Work</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {items.map((item) => (
            <div key={item.label} className={`group relative overflow-hidden aspect-[3/4] ${item.span}`}>
              <picture>
                <source
                  srcSet={`${item.webpSm} 300w, ${item.webpLg} 600w`}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  type="image/webp"
                />
                <img
                  src={item.fallback}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={800}
                />
              </picture>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-end">
                <p className="text-primary-foreground text-sm tracking-widest uppercase p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10 italic">
          More examples available upon request.
        </p>
      </div>
    </section>
  );
};

export default Portfolio;
