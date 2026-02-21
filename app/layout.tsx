import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "River City Plumbing",
  description: "Local plumbing services in River City + surrounding towns",
  openGraph: { title: "River City Plumbing", description: "Quote and booking requests online." },
  twitter: { card: "summary_large_image", title: "River City Plumbing" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {"@context":"https://schema.org","@type":"LocalBusiness",name:"River City Plumbing",telephone:"(555) 123-4567",areaServed:"River City + surrounding towns"};
  return (
    <html lang="en"><body>
      <header className="bg-white border-b"><div className="container py-4 flex gap-4"><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/service-areas">Service Areas</Link><Link href="/about">About</Link><Link href="/reviews">Reviews</Link><Link href="/contact">Contact</Link><Link href="/book-online">Book Online</Link><Link href="/blog">Blog</Link><Link href="/admin">Admin</Link></div></header>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>{children}</main>
    </body></html>
  );
}
