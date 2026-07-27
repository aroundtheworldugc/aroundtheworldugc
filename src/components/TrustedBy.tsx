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
import bialetti from "@/assets/logos/bialetti.png.asset.json";

type Brand = {
  name: string;
  logo?: { url: string };
  darkBackground?: boolean;
  w: number;
  h: number;
};

const brands: Brand[] = [
  { name: "The Surfer Surf Camp", logo: surfer, w: 256, h: 123 },
  { name: "Ningaloo Discovery", logo: ningaloo, w: 600, h: 194 },
  { name: "Theva Residency Kandy", logo: theva, w: 214, h: 116 },
  { name: "Aqua Luna Dhangheti", logo: aquaLuna, w: 281, h: 132 },
  { name: "Subsea Estate Vinery", logo: subsea, w: 328, h: 170 },
  { name: "Anantara Elephant Camp and Resort", logo: anantara, darkBackground: true, w: 360, h: 140 },
  { name: "Seahaus Kalbarri", logo: seahaus, w: 699, h: 251 },
  { name: "Jurien Bay Oceanic Experience", logo: jurien, darkBackground: true, w: 826, h: 185 },
  { name: "Rainbow Sky Cottage Ella", logo: rainbowSky, w: 248, h: 62 },
  { name: "Whalebone Brewing Co", logo: whalebone, w: 500, h: 108 },
  { name: "Cadillacs Bar and Grill", logo: cadillacs, w: 948, h: 439 },
  { name: "Sauna Esperance", logo: saunaEsperance, w: 800, h: 800 },
  { name: "Quokka Tours", logo: quokka, w: 387, h: 240 },
  { name: "Soul Food Sigiriya", logo: soulFood, w: 300, h: 202 },
  { name: "The Whitehouse", logo: whitehouse, w: 1600, h: 288 },
  { name: "ISDIN", logo: isdin, w: 329, h: 110 },
  { name: "The Gifty Girls", logo: giftyGirls, w: 308, h: 192 },
  { name: "Bialetti", logo: bialetti, w: 315, h: 156 },
  { name: "Mutts Caffè", logo: mutts, w: 594, h: 586 },
  { name: "Safari Lodge Yala", logo: safariYala, w: 330, h: 231 },
  { name: "Flat Stacks", logo: flatstak, w: 105, h: 64 },
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
