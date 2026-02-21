import { prisma } from "@/lib/prisma";
export default async function CityPage({ params }: { params: { city: string } }) {
  const area = await prisma.serviceArea.findUnique({ where: { slug: params.city } }).catch(() => null);
  if (!area) return <div className="container py-10">City page not found.</div>;
  return <div className="container py-10"><h1 className="text-3xl font-bold">Plumbing in {area.city}</h1><p>{area.seoContent}</p></div>;
}
