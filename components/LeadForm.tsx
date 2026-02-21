"use client";
import { useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function LeadForm({ type }: { type: "quote" | "booking" }) {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch(`/api/${type}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setIsError(!res.ok);
    setMessage(data.message || data.error);
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <Card>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label" htmlFor="name">Full name</label><input id="name" name="name" required placeholder="Jane Smith" className="input"/></div>
          <div><label className="label" htmlFor="email">Email</label><input id="email" name="email" required placeholder="you@email.com" className="input"/></div>
          <div><label className="label" htmlFor="phone">Phone</label><input id="phone" name="phone" required placeholder="(555) 123-4567" className="input"/></div>
          <div><label className="label" htmlFor="city">City</label><input id="city" name="city" required placeholder="River City" className="input"/></div>
          {type === "quote" ? (
            <div className="sm:col-span-2"><label className="label" htmlFor="serviceSlug">Requested service</label><input id="serviceSlug" name="serviceSlug" required placeholder="Drain cleaning" className="input"/></div>
          ) : (
            <>
              <div><label className="label" htmlFor="preferredDate">Preferred date</label><input id="preferredDate" name="preferredDate" required placeholder="Friday afternoon" className="input"/></div>
              <div><label className="label" htmlFor="timeWindow">Time window</label><input id="timeWindow" name="timeWindow" required placeholder="1PM - 4PM" className="input"/></div>
            </>
          )}
        </div>
        <div><label className="label" htmlFor="message">Project details</label><textarea id="message" name="message" required placeholder="Tell us what is happening and where." className="input min-h-32"/></div>
        <div><label className="label" htmlFor="turnstileToken">Turnstile token</label><input id="turnstileToken" name="turnstileToken" placeholder="Token" className="input"/><p className="helper">Leave empty in local development.</p></div>
        <Button type="submit" variant="primary">Submit Request</Button>
        {message && <p aria-live="polite" className={`rounded-lg px-3 py-2 text-sm ${isError ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>{message}</p>}
      </form>
    </Card>
  );
}
