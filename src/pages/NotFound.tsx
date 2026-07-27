import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
  return el;
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const title = "Page Not Found — Davide & Claudia";
    const description =
      "This page doesn't exist. Return to Davide & Claudia, travel UGC creators producing cinematic content for hotels and travel brands.";
    const url = `${window.location.origin}${location.pathname}`;

    const previous = {
      title: document.title,
      ogTitle: document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? "",
      ogDesc: document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? "",
      ogUrl: document.head.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? "",
      desc: document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      twTitle: document.head.querySelector('meta[name="twitter:title"]')?.getAttribute("content") ?? "",
      twDesc: document.head.querySelector('meta[name="twitter:description"]')?.getAttribute("content") ?? "",
      canonical: document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
    };

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    canonical?.setAttribute("href", url);

    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, follow";
    document.head.appendChild(robots);

    return () => {
      document.title = previous.title;
      setMeta('meta[name="description"]', "content", previous.desc);
      setMeta('meta[property="og:title"]', "content", previous.ogTitle);
      setMeta('meta[property="og:description"]', "content", previous.ogDesc);
      setMeta('meta[property="og:url"]', "content", previous.ogUrl);
      setMeta('meta[name="twitter:title"]', "content", previous.twTitle);
      setMeta('meta[name="twitter:description"]', "content", previous.twDesc);
      canonical?.setAttribute("href", previous.canonical);
      robots.remove();
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
