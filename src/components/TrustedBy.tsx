import { useScrollReveal } from "@/hooks/useScrollReveal";

const brands = [
  "Wholebone",
  "Ningaloo Discovery",
  "Mutts Caffè",
  "Cadillacs Bar and Grill",
  "The Whitehouse",
  "Seahaus",
  "Jurien Bay Origin",
  "Quokka Tours",
  "The Surfer Surf Camp",
  "Safari Lodge Yala",
  "Sky Rainbow Cottage Ella",
  "Theva Residency Kandy",
  "Yashi's Place Sigiriya",
  "Lion Face Sigiriya",
  "Soul Food Sigiriya",
  "Aqua Luna Dhangheti",
  "Subsea Estate Vinery",
  "Sauna Esperance",
  "Flatstak",
  "The Gifty Girls",
  "Anantara Elephant Camp and Resort",
  "ISDIN",
  "Bialetti",
];

const TrustedBy = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className="py-20 md:py-26 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Trusted By
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-12">
            50+ Brands, <span className="italic">One Standard</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-0 text-left">
            {brands.map((brand) => (
              <div
                key={brand}
                className="text-xs md:text-sm text-foreground border-b border-border/50 py-3"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
