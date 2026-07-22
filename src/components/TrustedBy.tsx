import { useScrollReveal } from "@/hooks/useScrollReveal";

import whalebone from "@/assets/logos/whalebone.webp.asset.json";
import ningaloo from "@/assets/logos/ningaloo.png.asset.json";
import mutts from "@/assets/logos/mutts.png.asset.json";
import cadillacs from "@/assets/logos/cadillacs.webp.asset.json";
import whitehouse from "@/assets/logos/whitehouse.webp.asset.json";
import seahaus from "@/assets/logos/seahaus.webp.asset.json";
import jurien from "@/assets/logos/jurien.webp.asset.json";
import quokka from "@/assets/logos/quokka.webp.asset.json";
import surfer from "@/assets/logos/surfer.avif.asset.json";
import safariYala from "@/assets/logos/safari-yala.webp.asset.json";
import rainbowSky from "@/assets/logos/rainbow-sky.webp.asset.json";
import theva from "@/assets/logos/theva.png.asset.json";
import soulFood from "@/assets/logos/soul-food.png.asset.json";
import aquaLuna from "@/assets/logos/aqua-luna.webp.asset.json";
import subsea from "@/assets/logos/subsea.webp.asset.json";
import saunaEsperance from "@/assets/logos/sauna-esperance.webp.asset.json";
import flatstak from "@/assets/logos/flatstak.avif.asset.json";
import giftyGirls from "@/assets/logos/gifty-girls.webp.asset.json";
import anantara from "@/assets/logos/anantara.avif.asset.json";
import isdin from "@/assets/logos/isdin.webp.asset.json";

type Brand = { name: string; logo?: { url: string } };

const brands: Brand[] = [
  { name: "Whalebone", logo: whalebone },
  { name: "Ningaloo Discovery", logo: ningaloo },
  { name: "Mutts Caffè", logo: mutts },
  { name: "Cadillacs Bar and Grill", logo: cadillacs },
  { name: "The Whitehouse", logo: whitehouse },
  { name: "Seahaus", logo: seahaus },
  { name: "Jurien Bay Origin", logo: jurien },
  { name: "Quokka Tours", logo: quokka },
  { name: "The Surfer Surf Camp", logo: surfer },
  { name: "Safari Lodge Yala", logo: safariYala },
  { name: "Sky Rainbow Cottage Ella", logo: rainbowSky },
  { name: "Theva Residency Kandy", logo: theva },
  { name: "Soul Food Sigiriya", logo: soulFood },
  { name: "Aqua Luna Dhangheti", logo: aquaLuna },
  { name: "Subsea Estate Vinery", logo: subsea },
  { name: "Sauna Esperance", logo: saunaEsperance },
  { name: "Flatstak", logo: flatstak },
  { name: "The Gifty Girls", logo: giftyGirls },
  { name: "Anantara Elephant Camp and Resort", logo: anantara },
  { name: "ISDIN", logo: isdin },
];

const TrustedBy = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className="py-20 md:py-26 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Trusted By
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-16">
            50+ Brands, <span className="italic">One Standard</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-12 md:gap-x-14 md:gap-y-16 items-center justify-items-center">
            {brands
              .filter((b) => b.logo)
              .map((brand) => {
                const needsDarkBg =
                  brand.name === "Jurien Bay Origin" ||
                  brand.name === "Subsea Estate Vinery" ||
                  brand.name === "Anantara Elephant Camp and Resort";
                const logoImg = (
                  <img
                    src={brand.logo!.url}
                    alt={`${brand.name} logo`}
                    loading="lazy"
                    className="max-w-[140px] max-h-20 md:max-w-[160px] md:max-h-24 w-auto h-auto object-contain"
                  />
                );
                return (
                  <div
                    key={brand.name}
                    className="flex items-center justify-center w-full h-20 md:h-24"
                  >
                    {needsDarkBg ? (
                      <div className="bg-foreground rounded-sm p-3 flex items-center justify-center">
                        {logoImg}
                      </div>
                    ) : (
                      logoImg
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
