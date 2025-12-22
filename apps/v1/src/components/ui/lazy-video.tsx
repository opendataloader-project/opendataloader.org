"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";

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
    <>
      {/* Preload poster image for priority videos */}
      {priority && poster && (
        <Head>
          <link rel="preload" as="image" href={poster} />
        </Head>
      )}
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
      />
    </>
  );
}
