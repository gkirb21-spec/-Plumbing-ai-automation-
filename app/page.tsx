import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export default async function Home() {
  const [faqs, services, reviews] = await Promise.all([
    prisma.fAQ.findMany(),
    prisma.service.findMany({ take: 6 }),
    prisma.review.findMany({ take: 3 })
  ]).catch(() => [[], [], []] as any);

  return <>
    <Section className="pt-16">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-6">
          <Badge>Trusted Local Plumbing Experts</Badge>
          <h1 className="text-4xl font-bold sm:text-5xl">Modern plumbing service with same-day response in River City.</h1>
          <p className="max-w-xl text-lg">From urgent leaks to planned upgrades, our licensed team provides clear communication, quality workmanship, and respectful in-home service.</p>
          <div className="flex flex-wrap gap-3"><Button href="/contact">Get a Quote</Button><Button href="tel:+15551234567" variant="outline">Call Now</Button></div>
        </div>
        <Card className="bg-gradient-to-br from-white to-blue-50">
          <h2 className="text-xl font-semibold">Why homeowners choose us</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>• Licensed & insured technicians</li>
            <li>• Fast appointments with real ETAs</li>
            <li>• Upfront pricing before work begins</li>
            <li>• Backed by satisfaction guarantee</li>
          </ul>
        </Card>
      </div>
    </Section>

    <Section>
      <div className="grid gap-4 sm:grid-cols-3">
        {["Licensed & Insured", "Fast Local Response", "100% Satisfaction Promise"].map(item => <Card key={item}><p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">{item}</p></Card>)}
      </div>
    </Section>

    <Section>
      <div className="mb-6 flex items-end justify-between gap-3"><div><h2 className="text-3xl font-bold">Popular Services</h2><p>Clean solutions for repairs, maintenance, and installation.</p></div><Button href="/services" variant="outline">View all</Button></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s:any) => <Card key={s.id}><p className="text-2xl">🔧</p><h3 className="mt-3 text-lg font-semibold">{s.title}</h3><p className="mt-2 text-sm">{s.description}</p><Link className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)]" href={`/services/${s.slug}`}>Learn more →</Link></Card>)}
      </div>
    </Section>

    <Section>
      <h2 className="text-3xl font-bold">Customer Reviews</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{reviews.map((r:any) => <Card key={r.id}><p className="text-amber-400">★★★★★</p><p className="mt-3 text-sm">“{r.content}”</p><p className="mt-3 text-sm font-semibold text-slate-800">{r.author}</p></Card>)}</div>
    </Section>

    <Section>
      <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      <div className="mt-6 space-y-3">{faqs.slice(0, 8).map((f:any) => <details key={f.id} className="rounded-2xl border border-[var(--border)] bg-white p-5"><summary className="cursor-pointer font-semibold text-slate-800">{f.question}</summary><p className="mt-3 text-sm">{f.answer}</p></details>)}</div>
    </Section>

    <Section>
      <Card className="flex flex-col items-start justify-between gap-5 bg-[var(--primary)] text-white sm:flex-row sm:items-center">
        <div><h2 className="text-2xl font-bold text-white">Need a plumber today?</h2><p className="mt-1 text-blue-100">Request a quote online or call for immediate help.</p></div>
        <div className="flex gap-3"><Button href="/contact" className="bg-white !text-[var(--primary)] hover:bg-slate-100">Get Quote</Button><Button href="tel:+15551234567" variant="secondary">Call (555) 123-4567</Button></div>
      </Card>
    </Section>
  </>;
}
