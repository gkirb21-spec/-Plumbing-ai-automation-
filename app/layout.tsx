import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "River City Plumbing",
  description: "Local plumbing services in River City + surrounding towns",
  openGraph: { title: "River City Plumbing", description: "Quote and booking requests online." },
  twitter: { card: "summary_large_image", title: "River City Plumbing" }
};

const navItems = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/service-areas", "Service Areas"],
  ["/reviews", "Reviews"],
  ["/contact", "Contact"],
  ["/book-online", "Book Online"],
  ["/about", "About"],
  ["/blog", "Blog"]
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = { "@context": "https://schema.org", "@type": "LocalBusiness", name: "River City Plumbing", telephone: "(555) 123-4567", areaServed: "River City + surrounding towns" };
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 backdrop-blur">
          <Container className="py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link href="/" className="text-lg font-bold text-[var(--primary)]">River City Plumbing</Link>
              <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
                {navItems.map(([href, label]) => <Link key={href} href={href} className="hover:text-[var(--primary)]">{label}</Link>)}
                <Link href="/admin" className="text-xs text-slate-500 hover:text-[var(--primary)]">Admin</Link>
              </nav>
              <div className="flex items-center gap-2">
                <Button href="tel:+15551234567" variant="outline">Call Now</Button>
                <Button href="/contact" variant="primary">Get Quote</Button>
              </div>
            </div>
          </Container>
        </header>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <main>{children}</main>
        <footer className="border-t border-[var(--border)] bg-white">
          <Container className="py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div><h3 className="text-base font-semibold">River City Plumbing</h3><p className="mt-2 text-sm">Dependable residential and light commercial plumbing with fast local response.</p></div>
              <div><h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Services</h4><ul className="mt-2 space-y-1 text-sm"><li>Drain Cleaning</li><li>Leak Repair</li><li>Water Heater Service</li></ul></div>
              <div><h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Service Areas</h4><ul className="mt-2 space-y-1 text-sm"><li>River City</li><li>North Ridge</li><li>West Creek</li></ul></div>
              <div><h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Contact</h4><ul className="mt-2 space-y-1 text-sm"><li><a href="tel:+15551234567">(555) 123-4567</a></li><li>Mon-Sat · 7AM–7PM</li><li className="text-slate-500">Follow: Facebook · Google</li></ul></div>
            </div>
            <p className="mt-8 border-t border-[var(--border)] pt-5 text-xs text-slate-500">© {new Date().getFullYear()} River City Plumbing. All rights reserved.</p>
          </Container>
        </footer>
      </body>
    </html>
  );
}
