import { prisma } from "@/lib/prisma";
export default async function ServiceDetail({ params }: { params: { slug: string } }) {
  const s = await prisma.service.findUnique({ where: { slug: params.slug } }).catch(() => null);
  if (!s) return <div className="container py-10">Service not found.</div>;
  return <div className="container py-10"><h1 className="text-3xl font-bold">{s.title}</h1><p>{s.description}</p><article>{s.body}</article></div>;
}
