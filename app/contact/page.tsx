import LeadForm from "@/components/LeadForm";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export default function Contact() {
  return <Section>
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <Card>
        <h1 className="text-3xl font-bold">Contact River City Plumbing</h1>
        <p className="mt-3 text-sm">Call us for urgent issues or submit the form for quote requests.</p>
        <div className="mt-4 space-y-2 text-sm"><p><strong>Phone:</strong> <a href="tel:+15551234567">(555) 123-4567</a></p><p><strong>Hours:</strong> Mon-Sat, 7AM-7PM</p></div>
        <Button href="tel:+15551234567" className="mt-5">Call Now</Button>
        <div className="mt-6 h-48 rounded-xl border border-dashed border-[var(--border)] bg-slate-50 grid place-items-center text-sm text-slate-500">Map Placeholder</div>
      </Card>
      <div><h2 className="mb-4 text-2xl font-semibold">Request a Quote</h2><LeadForm type="quote"/></div>
    </div>
  </Section>;
}
