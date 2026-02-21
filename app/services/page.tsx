import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default async function ServicesPage() {
  const services = await prisma.service.findMany().catch(() => []);
  return <div className="container py-10"><h1 className="text-3xl font-bold">Services</h1><ul>{services.map(s => <li key={s.id}><Link href={`/services/${s.slug}`}>{s.title}</Link></li>)}</ul></div>;
}
