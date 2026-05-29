export interface Project {
  title: string;
  category: string;
  image: string;
  span: string; // tailwind md:col-span-* class
  aspect: string; // tailwind aspect ratio class
}

export const projects: Project[] = [
  {
    title: "Automotive Motion",
    category: "Motion / 3D",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    title: "Urban Architecture",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1000&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    title: "Human Perspective",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&w=1000&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    title: "Brand Identity",
    category: "Design System",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
];

export interface JournalEntry {
  title: string;
  image: string;
  readTime: string;
  date: string;
}

export const journalEntries: JournalEntry[] = [
  {
    title: "The quiet power of restraint in interface design",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=400&q=80",
    readTime: "6 min read",
    date: "May 2026",
  },
  {
    title: "Building systems that scale with intention",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=400&q=80",
    readTime: "4 min read",
    date: "Apr 2026",
  },
  {
    title: "Why motion is a language, not a decoration",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
    readTime: "8 min read",
    date: "Mar 2026",
  },
  {
    title: "Notes from the edge of design and engineering",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80",
    readTime: "5 min read",
    date: "Feb 2026",
  },
];

export interface Exploration {
  image: string;
  rotation: number;
}

export const explorations: Exploration[] = [
  {
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80",
    rotation: -4,
  },
  {
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=700&q=80",
    rotation: 3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=700&q=80",
    rotation: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=700&q=80",
    rotation: -3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=700&q=80",
    rotation: 2,
  },
  {
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=700&q=80",
    rotation: -5,
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "20+", label: "Years Experience" },
  { value: "95+", label: "Projects Done" },
  { value: "200%", label: "Satisfied Clients" },
];

export const socials = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
];
