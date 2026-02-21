import { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm ${className}`}>{children}</article>;
}
