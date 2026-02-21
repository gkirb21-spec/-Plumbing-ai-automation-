import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";

export default async function ServiceDetail({ params }: { params: { slug: string } }) {
  const s = await prisma.service.findUnique({ where: { slug: params.slug } }).catch(() => null);
  if (!s) return <Section><p>Service not found.</p></Section>;

  return <Section>
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <article className="space-y-4">
        <h1 className="text-4xl font-bold">{s.title}</h1>
        <p className="text-lg">{s.description}</p>
        <div className="rounded-2xl border border-[var(--border)] bg-white p-6 text-sm leading-7 text-slate-700">{s.body}</div>
      </article>
      <Card>
        <h2 className="text-lg font-semibold">Need this service?</h2>
        <p className="mt-2 text-sm">We provide prompt scheduling and straightforward pricing.</p>
        <div className="mt-4 flex flex-col gap-2"><Button href="/contact">Request Quote</Button><Button href="tel:+15551234567" variant="outline">Call Now</Button></div>
      </Card>
    </div>
  </Section>;
}
