import React, { useRef, useState, useEffect, useCallback } from "react";
import Player from "@vimeo/player";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Global registry: only one video plays at a time
const activePlayerRef: { current: (() => void) | null } = { current: null };

// Global registry: cap number of simultaneously initialized Vimeo players.
// When the limit is reached and a new player needs to activate, the player
// furthest from the viewport is deactivated (its iframe is unmounted).
const MAX_ACTIVE_VIMEO_PLAYERS = 3;
type ActivatedEntry = {
  el: HTMLElement;
  deactivate: () => void;
};
const activatedVimeoPlayers = new Set<ActivatedEntry>();

const distanceFromViewport = (el: HTMLElement): number => {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const elCenter = rect.top + rect.height / 2;
  const viewportCenter = vh / 2;
  return Math.abs(elCenter - viewportCenter);
};

const registerActivatedPlayer = (entry: ActivatedEntry) => {
  // Evict the furthest-from-viewport player if at capacity
  while (activatedVimeoPlayers.size >= MAX_ACTIVE_VIMEO_PLAYERS) {
    let furthest: ActivatedEntry | null = null;
    let furthestDist = -1;
    activatedVimeoPlayers.forEach((e) => {
      if (e === entry) return;
      const d = distanceFromViewport(e.el);
      if (d > furthestDist) {
        furthestDist = d;
        furthest = e;
      }
    });
    if (!furthest) break;
    activatedVimeoPlayers.delete(furthest);
    furthest.deactivate();
  }
  activatedVimeoPlayers.add(entry);
};

const unregisterActivatedPlayer = (entry: ActivatedEntry) => {
  activatedVimeoPlayers.delete(entry);
};

const categories = [
{
  icon: "🏨",
  title: "Hotel Collaborations",
  items: [
  {
    video: "https://player.vimeo.com/video/1211523867",
    brand: "Aqua Luna Dhangheti",
    caption: "Cinematic reel capturing overwater luxury and the turquoise stillness of the Maldives."
  },
  {
    video: "https://player.vimeo.com/video/1211523870",
    brand: "Theva Residency Kandy",
    caption: "Immersive storytelling showcasing tropical hillside charm and boutique hospitality."
  },
  {
    video: "https://player.vimeo.com/video/1211523869",
    brand: "The Whitehouse",
    caption: "Coastal lifestyle content built around relaxed, elevated stays."
  },
  ]
},
{
  icon: "🧭",
  title: "Experiences",
  items: [
  {
    video: "https://player.vimeo.com/video/1211526471",
    brand: "The Surfer Surf Camp",
    caption: "Energetic surf culture narrative capturing community and coastal adventure."
  },
  {
    video: "https://player.vimeo.com/video/1211526550",
    brand: "Ningaloo Discovery",
    caption: "Adventure driven reel following an unforgettable whale shark encounter."
  },
  {
    video: "https://player.vimeo.com/video/1211526549",
    brand: "Safari Lodge Yala",
    caption: "Wildlife inspired storytelling blending safari adventure with authentic hospitality."
  }]
},
{
  icon: "🍽️",
  title: "Restaurants",
  items: [
  {
    video: "https://player.vimeo.com/video/1211526559",
    brand: "Subsea Estate Vinery",
    caption: "Cinematic vineyard narrative pairing coastal wine culture with refined dining."
  },
  {
    video: "https://player.vimeo.com/video/1211527447",
    brand: "Soul Food Sigiriya",
    caption: "Vibrant food focused reel capturing flavor, atmosphere and local warmth."
  },
  {
    video: "https://player.vimeo.com/video/1211527450",
    brand: "Seahaus",
    caption: "Elevated coastal dining content designed for premium brand storytelling."
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

  // Native <video> files (local, lightweight) activate immediately since there's
  // no streaming cost. Vimeo videos are NOT auto-activated on scroll proximity:
  // starting a Vimeo iframe means starting a real video stream, which is
  // expensive on mobile data. Vimeo videos activate only on explicit tap, via
  // handleFacadeClick below.
  useEffect(() => {
    if (isPlaceholder) return;
    if (!isVimeo && !activated) {
      setActivated(true);
    }
  }, [isVimeo, isPlaceholder, activated]);


  // Click on thumbnail also triggers activation (fallback for users who tap
  // before the observer fires).
  const handleFacadeClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activated && isVimeo && containerRef.current) {
      const entry: ActivatedEntry = {
        el: containerRef.current,
        deactivate: () => {
          setActivated(false);
          setIframeLoaded(false);
        },
      };
      registerActivatedPlayer(entry);
      setActivated(true);
    }
  }, [activated, isVimeo]);

  // Initialize Vimeo player with throttled progress. Autoplay is only allowed
  // when muted per browser policy (iOS/Android), so we enforce muted state
  // before requesting play() and fall back to muted playback if unmuted play
  // is ever rejected.
  useEffect(() => {
    if (!isVimeo || isPlaceholder || !activated || !iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

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

    // Enforce muted state, then attempt autoplay. If play() rejects (rare when
    // muted, but can happen on strict autoplay policies), keep the player ready
    // and let the scroll observer / user tap resume playback via togglePlay.
    player.ready()
      .then(() => Promise.all([player.setMuted(true), player.setVolume(0)]))
      .then(() => {
        setIframeLoaded(true);
        setMuted(true);
        return player.play();
      })
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay blocked: mark loaded so custom play button is available.
        setIframeLoaded(true);
        setPlaying(false);
      });

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

  // Scroll-based autoplay: play when in viewport, pause when out
  useEffect(() => {
    if (isPlaceholder || !activated) return;
    // Wait for player/iframe to be ready
    if (isVimeo && !iframeLoaded) return;

    const el = containerRef.current;
    if (!el) return;

    const playVideo = () => {
      // Pause the previously active video
      if (activePlayerRef.current) {
        activePlayerRef.current();
      }

      if (isVimeo && playerRef.current) {
        const p = playerRef.current;
        p.setCurrentTime(0)
          .then(() => p.play())
          .catch(() => {
            // Autoplay likely blocked because unmuted — force mute and retry.
            p.setMuted(true)
              .then(() => p.setVolume(0))
              .then(() => p.play())
              .then(() => setMuted(true))
              .catch(() => setPlaying(false));
          });
      } else if (videoRef.current) {
        const v = videoRef.current;
        v.currentTime = 0;
        const attempt = v.play();
        if (attempt && typeof attempt.catch === "function") {
          attempt.catch(() => {
            // Force mute + playsInline (iOS) and retry once.
            v.muted = true;
            v.setAttribute("playsinline", "");
            setMuted(true);
            v.play().catch(() => setPlaying(false));
          });
        }
      }
      setPlaying(true);
      setProgress(0);

      // Register this video's pause function as the active one
      activePlayerRef.current = pauseVideo;
    };

    const pauseVideo = () => {
      if (isVimeo && playerRef.current) {
        playerRef.current.pause().catch(() => {});
      } else if (videoRef.current) {
        videoRef.current.pause();
      }
      setPlaying(false);
      if (activePlayerRef.current === pauseVideo) {
        activePlayerRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          pauseVideo();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (activePlayerRef.current === pauseVideo) {
        activePlayerRef.current = null;
      }
    };
  }, [isPlaceholder, activated, isVimeo, iframeLoaded]);

  const togglePlay = useCallback(() => {
    if (isVimeo && playerRef.current) {
      const p = playerRef.current;
      if (playing) {
        p.pause().catch(() => {});
        setPlaying(false);
      } else {
        p.play()
          .then(() => setPlaying(true))
          .catch(() => {
            // Retry muted if autoplay policy blocks unmuted playback.
            p.setMuted(true)
              .then(() => p.setVolume(0))
              .then(() => p.play())
              .then(() => { setMuted(true); setPlaying(true); })
              .catch(() => setPlaying(false));
          });
      }
    } else if (videoRef.current) {
      const v = videoRef.current;
      if (v.paused) {
        const attempt = v.play();
        if (attempt && typeof attempt.catch === "function") {
          attempt.then(() => setPlaying(true)).catch(() => {
            v.muted = true;
            setMuted(true);
            v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
          });
        } else {
          setPlaying(true);
        }
      } else {
        v.pause();
        setPlaying(false);
      }
    }
  }, [playing, isVimeo]);

  const toggleSound = useCallback(() => {
    if (isVimeo && playerRef.current) {
      const p = playerRef.current;
      const nextMuted = !muted;
      // setMuted first, then align volume. Revert UI state if the call fails.
      p.setMuted(nextMuted)
        .then(() => p.setVolume(nextMuted ? 0 : 1))
        .then(() => setMuted(nextMuted))
        .catch(() => {
          // Unmute rejected (rare) — keep muted.
          if (!nextMuted) setMuted(true);
        });
    } else if (videoRef.current) {
      const v = videoRef.current;
      v.muted = !v.muted;
      setMuted(v.muted);
      // If unmuting caused a pause (some mobile browsers), resume.
      if (!v.muted && v.paused) {
        v.play().catch(() => {
          v.muted = true;
          setMuted(true);
          v.play().catch(() => {});
        });
      }
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
                {/* Thumbnail facade — shown until user clicks (Vimeo iframe not instantiated yet) */}
                {vimeoId && showThumbnail && (
                  <div
                    className="absolute inset-0 z-10 transition-opacity duration-500 cursor-pointer"
                    style={{ opacity: showThumbnail ? 1 : 0 }}
                    onClick={handleFacadeClick}
                    role="button"
                    aria-label={`Play ${brand}`}
                  >
                    <picture>
                      <source
                        srcSet={`https://vumbnail.com/${vimeoId}.jpg?fm=webp&w=800`}
                        type="image/webp"
                      />
                      <img
                        src={`https://vumbnail.com/${vimeoId}_800.jpg`}
                        alt={brand}
                        className="w-full h-full object-cover"
                        width={280}
                        height={607}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      {!activated ? (
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "50%",
                            background: "rgba(0,0,0,0.55)",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      )}
                    </div>
                  </div>
                )}

                {/* Video layer */}
                {activated && isVimeo ? (
                  <iframe
                    ref={iframeRef}
                    src={`${video}?autoplay=1&loop=1&muted=1&controls=0&playsinline=1&dnt=1&title=0&byline=0&portrait=0&quality=720p`}
                    className="w-full h-full"
                    style={{ border: "none", objectFit: "cover", pointerEvents: showControls ? "none" : "auto" }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={brand}
                  />
                ) : !isVimeo ? (
                  <video
                    ref={videoRef}
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
              {/* Play/Pause button - center (tap to toggle on mobile, hover on desktop) */}
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

              {/* Scrubber — always visible on mobile, hover on desktop */}
              <div
                className="absolute bottom-14 left-4 right-4 z-20"
                style={{
                  opacity: isTouchDevice.current ? 1 : (showControls ? 1 : 0),
                  pointerEvents: isTouchDevice.current ? "auto" : (showControls ? "auto" : "none"),
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

              {/* Sound toggle — always visible on mobile, hover on desktop */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleSound(); }}
                className="absolute bottom-4 right-4 z-20 flex items-center justify-center cursor-pointer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  opacity: isTouchDevice.current ? 1 : (showControls ? 1 : 0),
                  pointerEvents: isTouchDevice.current ? "auto" : (showControls ? "auto" : "none"),
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
