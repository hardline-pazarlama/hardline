import { useEffect, useRef } from "react";
import Hls from "hls.js";

/**
 * Attaches an HLS stream to a video element, using hls.js where supported
 * and falling back to native HLS playback (Safari) otherwise.
 */
export function useHlsVideo(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    // Best-effort autoplay (muted autoplay is allowed by browsers)
    const tryPlay = () => video.play().catch(() => {});
    video.addEventListener("loadedmetadata", tryPlay);
    tryPlay();

    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
      if (hls) hls.destroy();
    };
  }, [src]);

  return videoRef;
}

export const HLS_SOURCE =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
