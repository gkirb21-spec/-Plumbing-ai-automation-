import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  if (!isAdmin()) {
    return <Section>
      <div className="mx-auto max-w-md"><h1 className="text-3xl font-bold">Admin Login</h1>
        <form action="/api/admin/login" method="post" className="mt-6 space-y-4 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <div><label className="label" htmlFor="username">Username</label><input id="username" name="username" placeholder="Username" className="input"/></div>
          <div><label className="label" htmlFor="password">Password</label><input id="password" name="password" type="password" placeholder="Password" className="input"/></div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </Section>;
  }

  const [leads, services, areas, reviews, faqs, posts] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.service.findMany(), prisma.serviceArea.findMany(), prisma.review.findMany(), prisma.fAQ.findMany(), prisma.blogPost.findMany()
  ]).catch(() => [[], [], [], [], [], []] as any);

  return <Section>
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2"><Button href="/api/admin/export" variant="outline">Export Leads CSV</Button><form action="/api/admin/logout" method="post"><Button type="submit" variant="outline">Logout</Button></form></div>
      </div>

      <Card>
        <h2 className="text-xl font-semibold">Content Snapshot</h2>
        <p className="mt-2 text-sm">Services: {services.length} · Areas: {areas.length} · Reviews: {reviews.length} · FAQs: {faqs.length} · Posts: {posts.length}</p>
      </Card>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Recent Leads</h2>
        <div className="space-y-3">
          {leads.map((l: any) => <Card key={l.id} className="space-y-3">
            <p className="text-sm font-semibold text-slate-800">{l.type.toUpperCase()} · {l.name} · <span className="text-[var(--accent)]">{l.status}</span></p>
            <p className="text-sm">{l.phoneRaw} {l.phoneE164 ? `(${l.phoneE164})` : "(invalid for SMS)"}</p>
            <div className="flex flex-wrap gap-3">
              <form action={`/api/admin/leads/${l.id}/status`} method="post" className="flex items-center gap-2"><select name="status" defaultValue={l.status} className="input py-2">{["new", "contacted", "booked", "closed"].map(s => <option key={s}>{s}</option>)}</select><Button type="submit" variant="outline" className="px-3 py-2">Update</Button></form>
              <form action={`/api/admin/leads/${l.id}/notes`} method="post" className="flex items-center gap-2"><input name="notes" defaultValue={l.notes || ""} className="input py-2"/><Button type="submit" variant="outline" className="px-3 py-2">Save Note</Button></form>
            </div>
          </Card>)}
        </div>
      </section>
    </div>
  </Section>;
}
