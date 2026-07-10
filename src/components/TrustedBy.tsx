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
            23 Brands, <span className="italic">One Standard</span>
          </h2>

          <p className="text-sm md:text-base text-foreground leading-relaxed">
            {brands.join("  ·  ")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
