import Link from "next/link";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";

export default async function ServicesPage() {
  const services = await prisma.service.findMany().catch(() => []);
  return <Section>
    <h1 className="text-4xl font-bold">Plumbing Services</h1>
    <p className="mt-2 max-w-2xl">Explore our full lineup of residential and light commercial plumbing solutions.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map(s => <Card key={s.id}><h2 className="text-lg font-semibold">{s.title}</h2><p className="mt-2 text-sm">{s.description}</p><Link href={`/services/${s.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)]">View service →</Link></Card>)}
    </div>
  </Section>;
}
