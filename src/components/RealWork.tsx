import React, { useRef, useState, useEffect, useCallback } from "react";
import Player from "@vimeo/player";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Global registry: only one video plays at a time
const activePlayerRef: { current: (() => void) | null } = { current: null };

const categories = [
{
  icon: "🏨",
  title: "Hotel Collaborations",
  items: [
  {
    video: "https://player.vimeo.com/video/1169466245",
    brand: "Box Hill – Esperance",
    caption: "Cinematic reel focused on boutique coastal stay and immersive ocean atmosphere."
  },
  {
    video: "https://player.vimeo.com/video/1169824564",
    brand: "Anantara – Thailand",
    caption: "Luxury resort storytelling designed for premium brand positioning."
  },
  {
    video: "https://player.vimeo.com/video/1169466233",
    brand: "False Cape – Kangaroo Island",
    caption: "Experience-driven content highlighting wine tasting and destination immersion."
  },
  ]
},
{
  icon: "🌴",
  title: "Lifestyle",
  items: [
  {
    video: "https://player.vimeo.com/video/1169831299",
    brand: "Australia – Blue vs Red",
    caption: "From turquoise coastlines to red desert landscapes, a cinematic contrast narrative."
  },
  {
    video: "https://player.vimeo.com/video/1169825504",
    brand: "Van Life – Life on the Road",
    caption: "Authentic travel storytelling capturing freedom, simplicity and real moments."
  },
  {
    video: "https://player.vimeo.com/video/1169825509",
    brand: "Van Life – The Reality",
    caption: "Unfiltered cinematic narrative revealing the true rhythm of life on the road."
  }]
},
{
  icon: "🧴",
  title: "Products",
  items: [
  {
    video: "https://player.vimeo.com/video/1169824168",
    brand: "ISDIN",
    caption: "Performance-focused product integration highlighting sun protection in real travel conditions."
  },
  {
    video: "https://player.vimeo.com/video/1169824546",
    brand: "Gifty Girls",
    caption: "Creative lifestyle storytelling transforming personalized products into emotional keepsakes."
  },
  {
    video: "https://player.vimeo.com/video/1169824553",
    brand: "Bialetti",
    caption: "Cinematic step-by-step narrative blending ritual, lifestyle and iconic brand identity."
  }]
}];


const PhoneMockup = ({
  video,
  brand,
  caption
}: {video: string; brand: string; caption: string;}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef<number>(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activated, setActivated] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const isTouchDevice = useRef(false);

  const isPlaceholder = video.includes("placeholder");
  const isVimeo = video.includes("vimeo");
  const vimeoId = isVimeo ? video.split("/").pop() : null;

  // Detect touch device
  useEffect(() => {
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  // Lazy load: observe when component enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-activate when visible
  useEffect(() => {
    if (isVisible && !activated) {
      const timer = setTimeout(() => setActivated(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, activated]);

  // Initialize Vimeo player with throttled progress
  useEffect(() => {
    if (!isVimeo || isPlaceholder || !activated || !iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;
    player.setVolume(0);

    // Throttled progress: update every ~250ms instead of every rAF
    let lastUpdate = 0;
    const updateProgress = (timestamp: number) => {
      if (timestamp - lastUpdate > 250) {
        lastUpdate = timestamp;
        player.getCurrentTime().then((t) => {
          player.getDuration().then((d) => {
            if (d > 0) setProgress(t / d);
          });
        }).catch(() => {});
      }
      animFrameRef.current = requestAnimationFrame(updateProgress);
    };
    animFrameRef.current = requestAnimationFrame(updateProgress);

    // Mark as loaded when playing
    player.on("playing", () => setIframeLoaded(true));

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      player.destroy();
    };
  }, [isVimeo, isPlaceholder, activated]);

  // Native video progress tracking
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || isVimeo) return;
    const onTime = () => {
      if (vid.duration > 0) setProgress(vid.currentTime / vid.duration);
    };
    vid.addEventListener("timeupdate", onTime);
    return () => vid.removeEventListener("timeupdate", onTime);
  }, [isVimeo]);

  const togglePlay = useCallback(() => {
    if (isVimeo && playerRef.current) {
      if (playing) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      setPlaying(!playing);
    } else if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [playing, isVimeo]);

  const toggleSound = useCallback(() => {
    if (isVimeo && playerRef.current) {
      playerRef.current.setVolume(muted ? 1 : 0);
      setMuted(!muted);
    } else if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }, [muted, isVimeo]);

  const handleScrub = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const bar = scrubberRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

    if (isVimeo && playerRef.current) {
      playerRef.current.getDuration().then((d) => {
        playerRef.current?.setCurrentTime(pct * d);
      });
    } else if (videoRef.current) {
      videoRef.current.currentTime = pct * videoRef.current.duration;
    }
    setProgress(pct);
  }, [isVimeo]);

  // Auto-hide controls after 3s on touch devices
  const showControlsWithTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const handleTap = useCallback(() => {
    if (isTouchDevice.current) {
      if (showControls) {
        // If controls visible, hide them
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setShowControls(false);
      } else {
        showControlsWithTimer();
      }
    } else {
      setShowControls((prev) => !prev);
    }
  }, [showControls, showControlsWithTimer]);

  // Show thumbnail when: not activated yet, or activated but iframe not loaded
  const showThumbnail = !isPlaceholder && !isVimeo ? false : (!activated || (activated && !iframeLoaded));

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-5">
      <div className="relative mx-auto" style={{ width: "280px" }}>
        {/* Phone frame */}
        <div
          className="relative overflow-hidden group"
          style={{
            aspectRatio: "9/19.5",
            borderRadius: "40px",
            border: "4px solid #111",
            background: "#111",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            willChange: "auto",
            contain: "layout style paint",
          }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onClick={handleTap}
        >

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
            {isPlaceholder ? (
              <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-foreground/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Thumbnail layer — visible until video plays */}
                {vimeoId && showThumbnail && (
                  <div
                    className="absolute inset-0 z-10 transition-opacity duration-500"
                    style={{ opacity: showThumbnail ? 1 : 0 }}
                  >
                    <img
                      src={`https://vumbnail.com/${vimeoId}_large.jpg`}
                      alt={brand}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video layer */}
                {activated && isVimeo ? (
                  <iframe
                    ref={iframeRef}
                    src={`${video}?autoplay=1&loop=1&muted=1&background=1&quality=720p`}
                    className="w-full h-full"
                    style={{ border: "none", objectFit: "cover", pointerEvents: showControls ? "none" : "auto" }}
                    allow="autoplay; fullscreen"
                    loading="lazy"
                    title={brand}
                  />
                ) : !isVimeo ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ pointerEvents: "none" }}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                ) : null}
              </>
            )}
          </div>

          {/* Controls overlay */}
          {!isPlaceholder && activated && iframeLoaded && (
            <>
              {/* Play/Pause button - center */}
              <button
                onClick={(e) => { e.stopPropagation(); togglePlay(); if (isTouchDevice.current) showControlsWithTimer(); }}
                className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
                style={{
                  background: "transparent",
                  border: "none",
                  opacity: showControls ? 1 : 0,
                  pointerEvents: showControls ? "auto" : "none",
                  transition: "opacity 0.2s ease-out",
                }}
                aria-label={playing ? "Pause" : "Play"}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {playing ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Scrubber */}
              <div
                className="absolute bottom-14 left-4 right-4 z-20"
                style={{
                  opacity: showControls ? 1 : 0,
                  pointerEvents: showControls ? "auto" : "none",
                  transition: "opacity 0.2s ease-out",
                }}
              >
                <div
                  ref={scrubberRef}
                  className="relative h-2 rounded-full cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.25)" }}
                  onClick={(e) => { e.stopPropagation(); handleScrub(e); }}
                  onTouchStart={(e) => { e.stopPropagation(); handleScrub(e); }}
                >
                  <div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ width: `${progress * 100}%`, background: "rgba(255,255,255,0.85)" }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left: `${progress * 100}%`,
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: "#fff",
                      transform: `translate(-50%, -50%)`,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.4)"
                    }}
                  />
                </div>
              </div>

              {/* Sound toggle */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleSound(); if (isTouchDevice.current) showControlsWithTimer(); }}
                className="absolute bottom-4 right-4 z-20 flex items-center justify-center cursor-pointer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  opacity: showControls ? 1 : 0,
                  pointerEvents: showControls ? "auto" : "none",
                  transition: "opacity 0.2s ease-out",
                }}
                aria-label={muted ? "Unmute" : "Mute"}>
                {muted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M19.07 4.93a10 10 0 010 14.14" />
                    <path d="M15.54 8.46a5 5 0 010 7.07" />
                  </svg>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="text-center max-w-[280px]">
        <p className="font-serif text-xl font-semibold tracking-tight">{brand}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2 font-light">
          {caption}
        </p>
      </div>
    </div>
  );
};

const RealWork = () => {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section id="work" ref={ref} className="py-20 md:py-26 bg-card">
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

              {/* Desktop: grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-8 justify-items-center max-w-4xl mx-auto">
                {cat.items.map((item) => (
                  <PhoneMockup key={item.brand} {...item} />
                ))}
              </div>

              {/* Mobile: horizontal scroll with momentum */}
              <div
                className="flex md:hidden gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {cat.items.map((item) => (
                  <div key={item.brand} className="snap-center shrink-0">
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
