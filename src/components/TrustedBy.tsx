import { useScrollReveal } from "@/hooks/useScrollReveal";

import whalebone from "@/assets/logos/whalebone.webp.asset.json";
import ningaloo from "@/assets/logos/ningaloo.webp.asset.json";
import mutts from "@/assets/logos/mutts.webp.asset.json";
import cadillacs from "@/assets/logos/cadillacs.webp.asset.json";
import whitehouse from "@/assets/logos/whitehouse.webp.asset.json";
import seahaus from "@/assets/logos/seahaus.webp.asset.json";
import jurien from "@/assets/logos/jurien.webp.asset.json";
import quokka from "@/assets/logos/quokka.webp.asset.json";
import surfer from "@/assets/logos/surfer.webp.asset.json";
import safariYala from "@/assets/logos/safari-yala.webp.asset.json";
import rainbowSky from "@/assets/logos/rainbow-sky.webp.asset.json";
import theva from "@/assets/logos/theva.webp.asset.json";
import soulFood from "@/assets/logos/soul-food.webp.asset.json";
import aquaLuna from "@/assets/logos/aqua-luna.webp.asset.json";
import subsea from "@/assets/logos/subsea.webp.asset.json";
import saunaEsperance from "@/assets/logos/sauna-esperance.webp.asset.json";
import flatstak from "@/assets/logos/flatstak.webp.asset.json";
import giftyGirls from "@/assets/logos/gifty-girls.webp.asset.json";
import anantara from "@/assets/logos/anantara.webp.asset.json";
import isdin from "@/assets/logos/isdin.webp.asset.json";
import bialetti from "@/assets/logos/bialetti.webp.asset.json";

type Brand = {
  name: string;
  logo?: { url: string };
  darkBackground?: boolean;
  w: number;
  h: number;
};

const brands: Brand[] = [
  { name: "The Surfer Surf Camp", logo: surfer, w: 240, h: 115 },
  { name: "Ningaloo Discovery", logo: ningaloo, w: 240, h: 77 },
  { name: "Theva Residency Kandy", logo: theva, w: 240, h: 139 },
  { name: "Aqua Luna Dhangheti", logo: aquaLuna, w: 240, h: 103 },
  { name: "Subsea Estate Vinery", logo: subsea, w: 240, h: 115 },
  { name: "Anantara Elephant Camp and Resort", logo: anantara, darkBackground: true, w: 240, h: 146 },
  { name: "Seahaus Kalbarri", logo: seahaus, w: 240, h: 79 },
  { name: "Jurien Bay Oceanic Experience", logo: jurien, darkBackground: true, w: 240, h: 54 },
  { name: "Rainbow Sky Cottage Ella", logo: rainbowSky, w: 240, h: 51 },
  { name: "Whalebone Brewing Co", logo: whalebone, w: 240, h: 50 },
  { name: "Cadillacs Bar and Grill", logo: cadillacs, w: 240, h: 110 },
  { name: "Sauna Esperance", logo: saunaEsperance, w: 240, h: 233 },
  { name: "Quokka Tours", logo: quokka, w: 240, h: 126 },
  { name: "Soul Food Sigiriya", logo: soulFood, w: 240, h: 142 },
  { name: "The Whitehouse", logo: whitehouse, w: 240, h: 40 },
  { name: "ISDIN", logo: isdin, w: 240, h: 76 },
  { name: "The Gifty Girls", logo: giftyGirls, w: 240, h: 149 },
  { name: "Bialetti", logo: bialetti, w: 240, h: 119 },
  { name: "Mutts Caffè", logo: mutts, w: 240, h: 237 },
  { name: "Safari Lodge Yala", logo: safariYala, w: 240, h: 160 },
  { name: "Flat Stacks", logo: flatstak, w: 240, h: 146 },
];

const TrustedBy = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Trusted By
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-16">
            50+ Brands, <span className="italic">One Standard</span>
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-6 items-center justify-items-center">
            {brands
              .filter((b) => b.logo)
              .map((brand) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-center w-full h-16 md:h-20"
                >
                  {brand.darkBackground ? (
                    <div className="bg-foreground rounded-md p-3">
                      <img
                        src={brand.logo!.url}
                        alt={`${brand.name} logo`}
                        loading="lazy"
                        width={brand.w}
                        height={brand.h}
                        className="max-w-[100px] max-h-14 md:max-w-[112px] md:max-h-16 w-auto h-auto object-contain"
                      />
                    </div>
                  ) : (
                    <img
                      src={brand.logo!.url}
                      alt={`${brand.name} logo`}
                      loading="lazy"
                      width={brand.w}
                      height={brand.h}
                      className="max-w-[100px] max-h-14 md:max-w-[112px] md:max-h-16 w-auto h-auto object-contain"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
