import { ReactNode } from "react";
import Container from "./Container";

export default function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`py-10 sm:py-14 ${className}`}><Container>{children}</Container></section>;
}
