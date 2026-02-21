import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";

export default async function CityPage({ params }: { params: { city: string } }) {
  const area = await prisma.serviceArea.findUnique({ where: { slug: params.city } }).catch(() => null);
  if (!area) return <Section><p>City page not found.</p></Section>;

  return <Section>
    <h1 className="text-4xl font-bold">Plumbing in {area.city}</h1>
    <p className="mt-3 max-w-3xl">{area.seoContent}</p>
    <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6">
      <h2 className="text-xl font-semibold">Book a local plumbing visit</h2>
      <p className="mt-2 text-sm">Our team serves {area.city} with transparent pricing and clear updates.</p>
      <div className="mt-4 flex gap-3"><Button href="/book-online">Book Online</Button><Button href="/contact" variant="outline">Request Quote</Button></div>
    </div>
  </Section>;
}
