import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const faqs = await prisma.fAQ.findMany().catch(() => []);
  return <div className="container py-10 space-y-8">
    <section><h1 className="text-4xl font-bold">River City Plumbing</h1><p>Trusted service in River City + surrounding towns.</p><div className="flex gap-3 mt-3"><a href="tel:+15551234567" className="bg-green-700 text-white px-4 py-2">Call Now</a><Link href="/contact" className="bg-blue-700 text-white px-4 py-2">Get a Quote</Link></div></section>
    <section><h2 className="text-2xl font-semibold">Trust badges</h2><p>Licensed • Insured • Same-Day Service</p></section>
    <section><h2 className="text-2xl font-semibold">FAQs</h2><ul>{faqs.slice(0,8).map(f => <li key={f.id}><strong>{f.question}</strong> {f.answer}</li>)}</ul></section>
  </div>;
}
