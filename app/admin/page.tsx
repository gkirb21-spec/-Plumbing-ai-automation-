import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  if (!isAdmin()) {
    return <div className="container py-10"><h1 className="text-3xl font-bold">Admin Login</h1><form action="/api/admin/login" method="post" className="space-y-2"><input name="username" placeholder="Username" className="border p-2 block"/><input name="password" type="password" placeholder="Password" className="border p-2 block"/><button className="bg-blue-700 text-white px-4 py-2">Login</button></form></div>;
  }
  const [leads, services, areas, reviews, faqs, posts] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.service.findMany(), prisma.serviceArea.findMany(), prisma.review.findMany(), prisma.fAQ.findMany(), prisma.blogPost.findMany()
  ]).catch(() => [[],[],[],[],[],[]] as any);
  return <div className="container py-10 space-y-6">
    <div className="flex justify-between"><h1 className="text-3xl font-bold">Admin Dashboard</h1><form action="/api/admin/logout" method="post"><button className="border px-3 py-1">Logout</button></form></div>
    <a href="/api/admin/export" className="underline">Export Leads CSV</a>
    <section><h2 className="text-xl font-semibold">Leads</h2>{leads.map((l:any)=><div key={l.id} className="border p-2 my-2"><p>{l.type} - {l.name} - {l.status}</p><p>{l.phoneRaw} {l.phoneE164?`(${l.phoneE164})`:"(invalid for SMS)"}</p><form action={`/api/admin/leads/${l.id}/status`} method="post"><select name="status" defaultValue={l.status}>{["new","contacted","booked","closed"].map(s=><option key={s}>{s}</option>)}</select><button className="ml-2 border px-2">Update</button></form><form action={`/api/admin/leads/${l.id}/notes`} method="post"><input name="notes" defaultValue={l.notes||""} className="border p-1"/><button className="ml-2 border px-2">Save Note</button></form></div>)}</section>
    <section><h2 className="text-xl font-semibold">Content counts</h2><p>Services: {services.length} Areas: {areas.length} Reviews: {reviews.length} FAQs: {faqs.length} Posts: {posts.length}</p></section>
  </div>;
}
