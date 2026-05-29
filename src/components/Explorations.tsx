import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { explorations } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the centered content while the tall section scrolls past.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Scroll-driven parallax: columns drift in opposite directions.
      gsap.to(colLeftRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(colRightRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const left = explorations.filter((_, i) => i % 2 === 0);
  const right = explorations.filter((_, i) => i % 2 === 1);

  const Card = ({ image, rotation }: { image: string; rotation: number }) => (
    <button
      onClick={() => setLightbox(image)}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="group block w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden border border-stroke bg-surface transition-transform duration-500 hover:!rotate-0 hover:scale-[1.03]"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </button>
  );

  return (
    <>
      <section
        id="explorations"
        ref={sectionRef}
        className="relative min-h-[300vh] bg-bg"
      >
        {/* Layer 1: pinned center content */}
        <div
          ref={contentRef}
          className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-text-primary leading-[1.02] mb-5">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-md mb-8">
            Experiments, side quests, and the occasional happy accident.
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            className="group pointer-events-auto relative inline-flex rounded-full text-sm"
          >
            <span
              className="absolute rounded-full accent-gradient-animated opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ inset: "-2px" }}
            />
            <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-text-primary transition-colors duration-300 group-hover:border-transparent">
              View on Dribbble
              <span aria-hidden>↗</span>
            </span>
          </a>
        </div>

        {/* Layer 2: parallax columns */}
        <div className="absolute inset-0 z-20 flex items-start justify-center pt-[20vh] px-6 pointer-events-none">
          <div className="grid grid-cols-2 gap-12 md:gap-40 max-w-[1400px] w-full">
            <div
              ref={colLeftRef}
              className="flex flex-col items-center gap-24 md:gap-40 pointer-events-auto"
            >
              {left.map((item, i) => (
                <Card key={i} image={item.image} rotation={item.rotation} />
              ))}
            </div>
            <div
              ref={colRightRef}
              className="flex flex-col items-center gap-24 md:gap-40 pt-[30vh] pointer-events-auto"
            >
              {right.map((item, i) => (
                <Card key={i} image={item.image} rotation={item.rotation} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 backdrop-blur-md p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              src={lightbox}
              alt=""
              className="max-w-full max-h-full rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
