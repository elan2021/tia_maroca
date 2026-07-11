type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
  style?: React.CSSProperties;
};

export default function Icon({ name, className = "", filled = false, style }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1", ...style } : style}
    >
      {name}
    </span>
  );
}
