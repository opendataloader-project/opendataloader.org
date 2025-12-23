"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  /** If true, video loads immediately (for above-the-fold content) */
  priority?: boolean;
}

export function LazyVideo({
  src,
  poster,
  className,
  priority = false,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(priority);
  const hasLoadedRef = useRef(false);

  // Preload poster image for priority videos using React 19 preload API
  useEffect(() => {
    if (priority && poster) {
      ReactDOM.preload(poster, {
        as: "image",
        fetchPriority: "high",
      });
    }
  }, [priority, poster]);

  useEffect(() => {
    if (priority || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before entering viewport
        threshold: 0,
      }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleCanPlay = useCallback(() => {
    if (videoRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={isInView ? src : undefined}
      poster={poster}
      autoPlay={isInView}
      loop
      muted
      playsInline
      className={className}
      onCanPlay={handleCanPlay}
      // @ts-expect-error -- fetchPriority is valid HTML attribute but not in React types yet
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
