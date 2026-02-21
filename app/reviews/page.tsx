import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";

export default async function Reviews() {
  const reviews = await prisma.review.findMany().catch(() => []);
  return <Section>
    <h1 className="text-4xl font-bold">Customer Reviews</h1>
    <p className="mt-2">Real feedback from local homeowners and businesses.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-2">{reviews.map(r => <Card key={r.id}><p className="text-amber-400">★★★★★</p><h2 className="mt-2 text-base font-semibold">{r.author} {r.isSample ? <span className="text-xs font-normal text-slate-500">(Sample)</span> : null}</h2><p className="mt-3 text-sm">{r.content}</p></Card>)}</div>
  </Section>;
}
