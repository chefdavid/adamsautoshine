import { type LucideIcon } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface SectionHeaderProps {
  icon: LucideIcon;
  tag: string;
  title: string;
  titleAccent: string;
  subtitle: string;
}

export function SectionHeader({
  icon: Icon,
  tag,
  title,
  titleAccent,
  subtitle,
}: SectionHeaderProps) {
  return (
    <ScrollReveal className="text-center mb-15">
      <span className="inline-flex items-center gap-2 bg-amber/10 border border-border-accent rounded-full px-5 py-2 text-amber text-[0.85rem] font-medium uppercase tracking-wider mb-5">
        <Icon className="h-4 w-4" />
        {tag}
      </span>
      <h2 className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-text-white mb-4 leading-tight">
        {title} <span className="text-amber">{titleAccent}</span>
      </h2>
      <p className="text-[1.05rem] text-text-muted max-w-[600px] mx-auto leading-relaxed">
        {subtitle}
      </p>
    </ScrollReveal>
  );
}
