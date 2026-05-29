import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { projects } from "../data/content";

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          heading="Featured *projects*"
          subtext="A selection of projects I've worked on, from concept to launch."
          buttonLabel="View all work"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: (i % 2) * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true, margin: "-80px" }}
              className={`group relative ${project.span} ${project.aspect} bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer`}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Halftone overlay */}
              <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" />

              {/* Category tag */}
              <span className="absolute top-5 left-5 z-10 text-xs text-text-primary/80 uppercase tracking-[0.2em] bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                {project.category}
              </span>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 backdrop-blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="group/label relative inline-flex rounded-full">
                  <span
                    className="absolute rounded-full accent-gradient-animated"
                    style={{ inset: "-2px" }}
                  />
                  <span className="relative rounded-full bg-white text-bg px-6 py-3 text-sm">
                    View —{" "}
                    <span className="font-display italic">{project.title}</span>
                  </span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
