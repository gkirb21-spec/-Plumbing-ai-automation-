import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default async function AreasPage() {
  const areas = await prisma.serviceArea.findMany().catch(() => []);
  return <div className="container py-10"><h1 className="text-3xl font-bold">Service Areas</h1><ul>{areas.map(a => <li key={a.id}><Link href={`/service-areas/${a.slug}`}>{a.city}</Link></li>)}</ul></div>;
}
