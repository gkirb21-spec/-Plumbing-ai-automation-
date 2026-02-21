import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
};

const variantMap: Record<Variant, string> = {
  primary: "bg-[var(--primary)] text-white hover:bg-[#0c2146]",
  secondary: "bg-[var(--accent)] text-white hover:bg-[#1f62bf]",
  outline: "border border-[var(--border)] text-[var(--primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
};

const base =
  "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors";

export default function Button({ children, href, type = "button", variant = "primary", className = "" }: ButtonProps) {
  const classes = `${base} ${variantMap[variant]} ${className}`;

  if (href) return <Link href={href} className={classes}>{children}</Link>;

  return <button type={type} className={classes}>{children}</button>;
}
