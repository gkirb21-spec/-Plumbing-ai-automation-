import LeadForm from "@/components/LeadForm";
import Section from "@/components/ui/Section";

export default function Book() {
  return <Section>
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold">Book Online</h1>
      <p className="mt-2">Send your preferred date and time window. We confirm every appointment by phone.</p>
      <div className="mt-6"><LeadForm type="booking"/></div>
    </div>
  </Section>;
}
