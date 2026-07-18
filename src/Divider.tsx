import type { DividerProps } from "./interfaces/dividerProps";

export default function Divider({ icon: Icon, compact = false }: DividerProps) {
  return (
    <div
      className={`dividerContainer ${compact ? "dividerContainerCompact" : ""}`}
    >
      <div className="line" />
      <Icon className="icon" aria-hidden="true" />
      <div className="line" />
    </div>
  );
}
