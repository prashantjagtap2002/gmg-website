"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode, type SelectHTMLAttributes } from "react";
import {
  AlertCircle, ArrowRight, Briefcase, Building2, CheckCircle2, ChevronDown, FileText, Globe, Link2, Loader2, Mail,
  Megaphone, Target, UploadCloud, User, X,
} from "lucide-react";
import { APPLICATION_COUNTRIES, APPLICATION_SOURCES } from "@/lib/careers/format";
import { isResumeStorageEnabled, RESUME_MAX_BYTES, resumeContentType, resumeUrl, saveResume } from "@/lib/careers/resume";

const inputCls =
  "h-11 w-full rounded-[10px] border border-[#8383835c] bg-[#111] pl-10 pr-3.5 text-sm text-white placeholder:text-white/40 [color-scheme:dark] transition focus:border-gold/60 focus:outline-none focus:ring-[3px] focus:ring-gold/15";
const labelCls = "mb-2 block text-[13px] font-semibold text-white/80";
const optionCls = "bg-[#161616] text-white";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Field({ label, required, htmlFor, icon, className = "", children }: {
  label: string;
  required?: boolean;
  htmlFor?: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`group ${className}`}>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
        {required && <span aria-hidden className="ml-0.5 text-gold">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-gold [&_svg]:size-4">
            {icon}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

function SelectField(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <>
      <select {...props} className={`${inputCls} cursor-pointer appearance-none pr-10`}>
        {props.children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-white/40" />
    </>
  );
}

function Step({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded-full bg-gold text-sm font-semibold text-black">{step}</div>
      <h3 className="text-xl font-medium text-white">{title}</h3>
    </div>
  );
}

export default function ApplyForm({ job, jobOptions }: { job: { id: string; title: string }; jobOptions: { id: string; label: string }[] }) {
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // The confirmation replaces a long form — bring it into view.
  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [submitted]);

  function acceptFile(f: File | undefined | null) {
    if (!f) return;
    if (!resumeContentType(f)) {
      setFileError("Please upload a PDF, DOC or DOCX file.");
      return;
    }
    if (f.size > RESUME_MAX_BYTES) {
      setFileError(`That file is ${formatSize(f.size)}. Please upload a resume of 5 MB or less.`);
      return;
    }
    setFileError(null);
    setResume(f);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const data = new FormData(e.currentTarget);
    // Fresh id per attempt: the resume Worker is create-only, so a retry
    // after a failed submit must not reuse a key that already has a file.
    const id = `app-${crypto.randomUUID()}`;
    try {
      if (resume && !(await saveResume(id, resume))) {
        setSubmitError("We couldn't upload your resume. Please try again, or remove it and submit without one.");
        return;
      }
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          jobId: String(data.get("applyingFor") || job.id),
          firstName: String(data.get("firstName") || "").trim(),
          lastName: String(data.get("lastName") || "").trim(),
          email: String(data.get("email") || "").trim(),
          company: String(data.get("company") || "").trim(),
          currentTitle: String(data.get("currentTitle") || "").trim(),
          country: String(data.get("country") || ""),
          website: String(data.get("website") || "").trim(),
          source: String(data.get("source") || ""),
          message: String(data.get("message") || "").trim(),
          resumeName: resume?.name ?? "",
          resumeLink: resume ? resumeUrl(id) : "",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setSubmitError(body.error || "We couldn't submit your application. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't submit your application. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/40">
          <CheckCircle2 className="size-8 text-gold" />
        </div>
        <h2 className="text-xl font-bold text-white">Application received!</h2>
        <p className="max-w-sm text-sm leading-relaxed text-white/60">
          Thanks for your interest in <span className="font-medium text-white">{job.title}</span>. Your application has been
          recorded, and our recruitment team will reach out to you soon.
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Link href={`/careers/${job.id}`} className="rounded-xl bg-gold px-5 py-3 text-sm font-bold text-black transition hover:bg-[#ffc233]">
            Back to job details
          </Link>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setResume(null);
            }}
            className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-lg font-bold text-white">Apply for this role</h2>
      <p className="mt-1.5 text-sm text-white/50">Tell us a little about yourself. Your details are shared with our recruitment team.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-7">
        <div className="space-y-4">
          <Step step={1} title="About you" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First Name" required htmlFor="firstName" icon={<User />}>
              <input id="firstName" name="firstName" required autoComplete="given-name" maxLength={255} placeholder="First name" className={inputCls} />
            </Field>
            <Field label="Last Name" required htmlFor="lastName" icon={<User />}>
              <input id="lastName" name="lastName" required autoComplete="family-name" maxLength={255} placeholder="Last name" className={inputCls} />
            </Field>
            <Field label="Email" required htmlFor="email" icon={<Mail />}>
              <input id="email" name="email" type="email" required autoComplete="email" maxLength={254} placeholder="you@example.com" className={inputCls} />
            </Field>
            <Field label="Country" required htmlFor="country" icon={<Globe />}>
              <SelectField id="country" name="country" required defaultValue="" autoComplete="country-name">
                <option value="" disabled className={optionCls}>Select country</option>
                {APPLICATION_COUNTRIES.map((c) => (
                  <option key={c} value={c} className={optionCls}>{c}</option>
                ))}
              </SelectField>
            </Field>
          </div>
        </div>

        <div className="space-y-4">
          <Step step={2} title="Professional background" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Current / Last Company" htmlFor="company" icon={<Building2 />}>
              <input id="company" name="company" autoComplete="organization" maxLength={255} placeholder="Leave blank if you're a fresher" className={inputCls} />
            </Field>
            <Field label="Current Job Title" htmlFor="currentTitle" icon={<Briefcase />}>
              <input id="currentTitle" name="currentTitle" autoComplete="organization-title" maxLength={255} placeholder="e.g. Sales Manager" className={inputCls} />
            </Field>
            <Field label="LinkedIn Profile (Optional)" htmlFor="website" icon={<Link2 />} className="sm:col-span-2">
              <input id="website" name="website" type="url" maxLength={255} placeholder="https://linkedin.com/in/your-name" className={inputCls} />
            </Field>
          </div>
        </div>

        <div className="space-y-4">
          <Step step={3} title="Your application" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Job You're Applying For" required htmlFor="applyingFor" icon={<Target />}>
              <SelectField id="applyingFor" name="applyingFor" required defaultValue={job.id}>
                {jobOptions.map((o) => (
                  <option key={o.id} value={o.id} className={optionCls}>{o.label}</option>
                ))}
              </SelectField>
            </Field>
            <Field label="How did you find GMG?" required htmlFor="source" icon={<Megaphone />}>
              <SelectField id="source" name="source" required defaultValue="">
                <option value="" disabled className={optionCls}>Select a source</option>
                {APPLICATION_SOURCES.map((s) => (
                  <option key={s} value={s} className={optionCls}>{s}</option>
                ))}
              </SelectField>
            </Field>
          </div>

          {isResumeStorageEnabled && (
            <div>
              <span className={labelCls}>Attach Resume (Optional)</span>
              {resume ? (
                <div className="flex items-center gap-3 rounded-[10px] border border-gold/30 bg-gold/[.06] px-4 py-3">
                  <FileText className="size-5 shrink-0 text-gold" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{resume.name}</p>
                    <p className="text-xs text-white/40">{formatSize(resume.size)}</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove attached resume"
                    onClick={() => {
                      setResume(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="rounded-md p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="resume"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    acceptFile(e.dataTransfer.files?.[0]);
                  }}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[10px] border border-dashed px-4 py-7 text-center transition-colors ${
                    dragOver ? "border-gold/70 bg-gold/[.06]" : "border-white/20 bg-white/[.03] hover:border-gold/40 hover:bg-white/[.05]"
                  }`}
                >
                  <UploadCloud className={`size-6 ${dragOver ? "text-gold" : "text-white/35"}`} />
                  <p className="text-sm text-white/70">
                    <span className="font-semibold text-gold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-white/35">PDF, DOC or DOCX · up to 5 MB</p>
                  <input ref={fileInputRef} id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => acceptFile(e.target.files?.[0])} />
                </label>
              )}
              {fileError && (
                <p role="alert" className="mt-2 text-xs font-medium text-red-400">{fileError}</p>
              )}
            </div>
          )}

          <Field label="Message (Optional)" htmlFor="message">
            <textarea id="message" name="message" rows={4} maxLength={5000} placeholder="Briefly, why are you a good fit for this role?" className={`${inputCls} h-auto resize-y py-3 pl-3.5`} />
          </Field>
        </div>

        <div className="space-y-3 pt-1">
          {submitError && (
            <div role="alert" className="flex items-start gap-2.5 rounded-[10px] border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group/submit flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold text-sm font-bold text-black transition hover:bg-[#ffc233] hover:shadow-[0_0_28px_rgba(255,180,0,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Submitting application...
              </>
            ) : (
              <>
                Submit application <ArrowRight className="size-4 transition-transform group-hover/submit:translate-x-0.5" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-white/35">Your details are only shared with the GMG recruitment team.</p>
        </div>
      </form>
    </>
  );
}
