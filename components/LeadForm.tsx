"use client";
import { useState } from "react";

export default function LeadForm({ type }: { type: "quote" | "booking" }) {
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch(`/api/${type}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setMessage(data.message || data.error);
    if (res.ok) e.currentTarget.reset();
  }
  return <form onSubmit={submit} className="space-y-2 bg-white p-4 border rounded">
    <input name="name" required placeholder="Name" className="w-full border p-2"/>
    <input name="email" required placeholder="Email" className="w-full border p-2"/>
    <input name="phone" required placeholder="Phone" className="w-full border p-2"/>
    <input name="city" required placeholder="City" className="w-full border p-2"/>
    {type === "quote" ? <input name="serviceSlug" required placeholder="Service" className="w-full border p-2"/> : <><input name="preferredDate" required placeholder="Preferred date" className="w-full border p-2"/><input name="timeWindow" required placeholder="Time window" className="w-full border p-2"/></>}
    <textarea name="message" required placeholder="Tell us about your issue" className="w-full border p-2"/>
    <input name="turnstileToken" placeholder="Turnstile token" className="w-full border p-2"/>
    <button className="bg-blue-700 text-white px-4 py-2">Submit</button>
    {message && <p aria-live="polite">{message}</p>}
  </form>;
}
