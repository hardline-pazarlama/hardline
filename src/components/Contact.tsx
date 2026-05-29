import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHlsVideo, HLS_SOURCE } from "../hooks/useHlsVideo";
import { socials } from "../data/content";

export default function Contact() {
  const videoRef = useHlsVideo(HLS_SOURCE);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const marqueeText = Array.from({ length: 10 }).map((_, i) => (
    <span key={i} className="inline-block">
      Building the future&nbsp;•&nbsp;
    </span>
  ));

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden"
    >
      {/* Background video, flipped vertically */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10">
        {/* GSAP marquee */}
        <div className="overflow-hidden whitespace-nowrap mb-16 md:mb-24">
          <div
            ref={marqueeRef}
            className="inline-flex font-display italic text-5xl md:text-7xl lg:text-8xl text-text-primary/90"
          >
            {marqueeText}
            {marqueeText}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center mb-20 md:mb-28">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">
            Let's work together
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-10">
            Have a project in mind?
          </h2>
          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative inline-flex rounded-full text-sm md:text-base transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute rounded-full accent-gradient-animated opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ inset: "-2px" }}
            />
            <span className="relative flex items-center gap-2 rounded-full bg-text-primary text-bg px-8 py-4 transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              hello@michaelsmith.com
              <span aria-hidden>↗</span>
            </span>
          </a>
        </div>

        {/* Footer bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-stroke/60">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} Michael Smith. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted hover:text-text-primary transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              <span className="text-xs text-text-primary/90">
                Available for projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
