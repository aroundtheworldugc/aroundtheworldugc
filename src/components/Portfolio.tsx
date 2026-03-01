import portfolioTravel from "@/assets/portfolio-travel.jpg";
import portfolioHotel from "@/assets/portfolio-hotel.jpg";
import portfolioLifestyle from "@/assets/portfolio-lifestyle.jpg";
import portfolioSurfcamp from "@/assets/portfolio-surfcamp.jpg";

const items = [
  { src: portfolioTravel, label: "Travel Australia", span: "col-span-1 row-span-1" },
  { src: portfolioHotel, label: "Hotel Collaborations", span: "col-span-1 row-span-1" },
  { src: portfolioSurfcamp, label: "Surf Camp", span: "col-span-2 row-span-1 md:col-span-1" },
  { src: portfolioLifestyle, label: "Lifestyle & Product", span: "col-span-1 row-span-1" },
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
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
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
