const categories = [
  {
    icon: "🏨",
    title: "Hotel Collaborations",
    items: [
      {
        video: "https://player.vimeo.com/video/placeholder1",
        brand: "Surf Camp Weligama",
        caption: "Cinematic reel focused on community and ocean lifestyle.",
      },
      {
        video: "https://player.vimeo.com/video/placeholder2",
        brand: "Boutique Resort Bali",
        caption: "Atmosphere-driven storytelling for a luxury eco retreat.",
      },
      {
        video: "https://player.vimeo.com/video/placeholder3",
        brand: "Heritage Hotel Galle",
        caption: "Guest journey narrative blending culture and comfort.",
      },
      {
        video: "https://player.vimeo.com/video/placeholder4",
        brand: "Jungle Lodge Ella",
        caption: "Immersive room tour with golden hour drone footage.",
      },
    ],
  },
  {
    icon: "🌴",
    title: "Lifestyle",
    items: [
      {
        video: "https://player.vimeo.com/video/placeholder5",
        brand: "Morning Rituals",
        caption: "Slow living content capturing authentic daily moments.",
      },
      {
        video: "https://player.vimeo.com/video/placeholder6",
        brand: "Van Life Australia",
        caption: "Road trip storytelling with cinematic transitions.",
      },
      {
        video: "https://player.vimeo.com/video/placeholder7",
        brand: "Coastal Living",
        caption: "Beach lifestyle reels optimized for high engagement.",
      },
    ],
  },
  {
    icon: "🧴",
    title: "Products",
    items: [
      {
        video: "https://player.vimeo.com/video/placeholder8",
        brand: "Eco Sunscreen Co.",
        caption: "Natural product placement in real travel scenarios.",
      },
      {
        video: "https://player.vimeo.com/video/placeholder9",
        brand: "Travel Essentials Kit",
        caption: "Soft advertising integrated into adventure content.",
      },
      {
        video: "https://player.vimeo.com/video/placeholder10",
        brand: "Organic Skincare",
        caption: "Lifestyle-driven vertical video for Instagram Reels.",
      },
    ],
  },
];

const PhoneMockup = ({
  brand,
  caption,
}: {
  video: string;
  brand: string;
  caption: string;
}) => (
  <div className="flex flex-col items-center gap-4">
    <div
      className="relative mx-auto"
      style={{ width: "180px" }}
    >
      {/* Phone frame */}
      <div
        className="rounded-[2rem] border-[3px] border-foreground/80 bg-foreground/5 overflow-hidden"
        style={{
          aspectRatio: "9/19.5",
          boxShadow:
            "0 20px 40px -12px hsl(var(--foreground) / 0.15), 0 8px 20px -8px hsl(var(--foreground) / 0.1)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground/80 rounded-full z-10" />

        {/* Screen content — placeholder gradient */}
        <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-foreground/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-[10px] text-muted-foreground">Video Preview</p>
          </div>
        </div>
      </div>
    </div>

    <div className="text-center max-w-[200px]">
      <p className="font-serif text-base font-medium">{brand}</p>
      <p className="text-xs text-muted-foreground leading-relaxed mt-1">
        {caption}
      </p>
    </div>
  </div>
);

const RealWork = () => {
  return (
    <section id="work" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Portfolio
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            Real Work. Real <span className="italic">Results.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Vertical cinematic content built for performance.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-24 max-w-7xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-10 text-center">
                <span className="mr-2">{cat.icon}</span>
                {cat.title}
              </h3>

              {/* Desktop: grid — Mobile: horizontal scroll */}
              <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {cat.items.map((item) => (
                  <PhoneMockup key={item.brand} {...item} />
                ))}
              </div>

              <div className="flex md:hidden gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6">
                {cat.items.map((item) => (
                  <div
                    key={item.brand}
                    className="snap-center shrink-0"
                  >
                    <PhoneMockup {...item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-16 italic">
          More examples available upon request.
        </p>
      </div>
    </section>
  );
};

export default RealWork;
