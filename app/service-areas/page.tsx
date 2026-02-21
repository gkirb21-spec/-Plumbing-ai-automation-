import Link from "next/link";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";

export default async function AreasPage() {
  const areas = await prisma.serviceArea.findMany().catch(() => []);
  return <Section>
    <h1 className="text-4xl font-bold">Service Areas</h1>
    <p className="mt-2">Fast plumbing response across River City and nearby communities.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{areas.map(a => <Card key={a.id}><h2 className="text-lg font-semibold">{a.city}</h2><p className="mt-2 text-sm">Local availability for repairs and maintenance.</p><Link href={`/service-areas/${a.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)]">View city page →</Link></Card>)}</div>
  </Section>;
}
