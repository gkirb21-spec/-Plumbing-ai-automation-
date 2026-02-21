import { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">{children}</span>;
}
