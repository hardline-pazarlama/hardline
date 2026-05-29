import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  /** Heading with an italic emphasis word wrapped in *asterisks* */
  heading: string;
  subtext: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

/** Renders a heading string, italicizing the word wrapped in *asterisks*. */
function renderHeading(heading: string) {
  const parts = heading.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <span key={i} className="font-display italic">
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function SectionHeader({
  eyebrow,
  heading,
  subtext,
  buttonLabel,
  onButtonClick,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14"
    >
      <div className="max-w-xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-primary leading-[1.05] mb-4">
          {renderHeading(heading)}
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md">{subtext}</p>
      </div>

      {buttonLabel && (
        <button
          onClick={onButtonClick}
          className="group relative hidden md:inline-flex rounded-full text-sm self-start md:self-end shrink-0"
        >
          <span
            className="absolute rounded-full accent-gradient-animated opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-2px" }}
          />
          <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-text-primary transition-colors duration-300 group-hover:border-transparent">
            {buttonLabel}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </button>
      )}
    </motion.div>
  );
}
