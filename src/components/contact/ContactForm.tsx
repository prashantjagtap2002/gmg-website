"use client";

import { useState, type FormEvent } from "react";

const fields = [
  { name: "name", label: "Name", placeholder: "Name", type: "text", autoComplete: "name" },
  { name: "mobile", label: "Mobile No.", placeholder: "Mobile No.", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", placeholder: "Email Address", type: "email", autoComplete: "email" },
  { name: "location", label: "Location", placeholder: "Location", type: "text", autoComplete: "address-level2", optional: true },
] as const;

const inputClass =
  "w-full rounded-[10px] border border-[#8383835c] bg-[#111] px-[15px] py-[11px] text-[16px] leading-none text-white placeholder:text-white/65 focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-white">Thank you for your message. We will get in touch with you shortly.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={`contact-${field.name}`} className="sr-only">
            {field.label}
          </label>
          <input
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            required={!("optional" in field)}
            className={`${inputClass} h-11`}
          />
        </div>
      ))}
      <div>
        <label htmlFor="contact-query" className="sr-only">
          Write your query here
        </label>
        <textarea id="contact-query" name="query" rows={3} required placeholder="Write your query here" className={`${inputClass} h-[90px] resize-y leading-6`} />
      </div>
      {status === "error" && (
        <p role="alert" className="text-[15px] text-red-400">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-[12px] border border-white/25 bg-black px-[30px] py-[11px] text-[16px] leading-6 font-medium text-white transition-colors hover:bg-[#18181b] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
