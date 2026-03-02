import React, { useRef, useState, useEffect, useCallback } from "react";
import Player from "@vimeo/player";

const categories = [
{
  icon: "🏨",
  title: "Hotel Collaborations",
  items: [
  {
    video: "https://player.vimeo.com/video/1169466245",
    brand: "Surf Camp Weligama",
    caption: "Cinematic reel focused on community and ocean lifestyle."
  },
  {
    video: "https://player.vimeo.com/video/placeholder2",
    brand: "Boutique Resort Bali",
    caption: "Atmosphere-driven storytelling for a luxury eco retreat."
  },
  {
    video: "https://player.vimeo.com/video/placeholder3",
    brand: "Heritage Hotel Galle",
    caption: "Guest journey narrative blending culture and comfort."
  },
  {
    video: "https://player.vimeo.com/video/placeholder4",
    brand: "Jungle Lodge Ella",
    caption: "Immersive room tour with golden hour drone footage."
  }]

},
{
  icon: "🌴",
  title: "Lifestyle",
  items: [
  {
    video: "https://player.vimeo.com/video/placeholder5",
    brand: "Morning Rituals",
    caption: "Slow living content capturing authentic daily moments."
  },
  {
    video: "https://player.vimeo.com/video/placeholder6",
    brand: "Van Life Australia",
    caption: "Road trip storytelling with cinematic transitions."
  },
  {
    video: "https://player.vimeo.com/video/placeholder7",
    brand: "Coastal Living",
    caption: "Beach lifestyle reels optimized for high engagement."
  }]

},
{
  icon: "🧴",
  title: "Products",
  items: [
  {
    video: "https://player.vimeo.com/video/placeholder8",
    brand: "Eco Sunscreen Co.",
    caption: "Natural product placement in real travel scenarios."
  },
  {
    video: "https://player.vimeo.com/video/placeholder9",
    brand: "Travel Essentials Kit",
    caption: "Soft advertising integrated into adventure content."
  },
  {
    video: "https://player.vimeo.com/video/placeholder10",
    brand: "Organic Skincare",
    caption: "Lifestyle-driven vertical video for Instagram Reels."
  }]

}];


const PhoneMockup = ({
  video,
  brand,
  caption




}: {video: string;brand: string;caption: string;}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [muted, setMuted] = useState(true);

  const isPlaceholder = video.includes("placeholder");
  const isVimeo = video.includes("vimeo");

  useEffect(() => {
    if (isVimeo && !isPlaceholder && iframeRef.current) {
      const player = new Player(iframeRef.current);
      playerRef.current = player;
      player.setVolume(0);
      return () => {
        player.destroy();
      };
    }
  }, [isVimeo, isPlaceholder]);

  const toggleSound = useCallback(() => {
    if (isVimeo && playerRef.current) {
      if (muted) {
        playerRef.current.setVolume(1);
      } else {
        playerRef.current.setVolume(0);
      }
      setMuted(!muted);
    } else if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }, [muted, isVimeo]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative mx-auto" style={{ width: "280px" }}>
        {/* Phone frame */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "9/19.5",
            borderRadius: "40px",
            border: "4px solid #111",
            background: "#111",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
          }}>

          {/* Notch */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-20"
            style={{
              width: "80px",
              height: "20px",
              background: "#111",
              borderRadius: "12px"
            }} />


          {/* Screen content */}
          <div className="absolute inset-[2px] overflow-hidden" style={{ borderRadius: "36px" }}>
            {isPlaceholder ?
            <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-foreground/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground">Coming Soon</p>
                </div>
              </div> : isVimeo ?
            <iframe
              ref={iframeRef}
              src={`${video}?autoplay=1&loop=1&muted=1&background=1`}
              className="w-full h-full"
              style={{ border: "none", objectFit: "cover" }}
              allow="autoplay; fullscreen"
              title={brand} /> :


            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover">

                <source src={video} type="video/mp4" />
              </video>
            }
          </div>

          {/* Sound toggle */}
          {!isPlaceholder &&
          <button
            onClick={toggleSound}
            className="absolute bottom-4 right-4 z-20 flex items-center justify-center cursor-pointer"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              border: "none"
            }}
            aria-label={muted ? "Unmute" : "Mute"}>

              {muted ?
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg> :

            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M19.07 4.93a10 10 0 010 14.14" />
                  <path d="M15.54 8.46a5 5 0 010 7.07" />
                </svg>
            }
            </button>
          }
        </div>
      </div>

      <div className="text-center max-w-[260px]">
        <p className="font-serif text-lg font-medium">{brand}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          {caption}
        </p>
      </div>
    </div>);

};

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
          {categories.map((cat) =>
          <div key={cat.title}>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-10 text-center">
                <span className="mr-2">{cat.icon}</span>
                {cat.title}
              </h3>

              {/* Desktop: grid — Mobile: horizontal scroll */}
              <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {cat.items.map((item) =>
              <PhoneMockup key={item.brand} {...item} />
              )}
              </div>

              <div className="flex md:hidden gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6">
                {cat.items.map((item) =>
              <div
                key={item.brand}
                className="snap-center shrink-0">

                    <PhoneMockup {...item} />
                  </div>
              )}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-16 italic">
          More examples available upon request.
        </p>
      </div>
    </section>);

};

export default RealWork;