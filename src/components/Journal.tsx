import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { journalEntries } from "../data/content";

export default function Journal() {
  return (
    <section id="resume" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          heading="Recent *thoughts*"
          subtext="Writing on design, engineering, and the space in between."
          buttonLabel="View all"
        />

        <div className="flex flex-col gap-4">
          {journalEntries.map((entry, i) => (
            <motion.a
              href="#"
              key={entry.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: "-60px" }}
              className="group flex items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors duration-300"
            >
              <img
                src={entry.image}
                alt=""
                loading="lazy"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg text-text-primary truncate group-hover:text-text-primary transition-colors">
                  {entry.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  {entry.readTime} · {entry.date}
                </p>
              </div>
              <span
                aria-hidden
                className="shrink-0 text-muted text-xl pr-2 sm:pr-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-text-primary"
              >
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
