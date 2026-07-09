"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Dictionary } from "@/i18n/dictionaries";

type FormStrings = Dictionary["contato"]["form"];

export function ContactForm({ t }: { t: FormStrings }) {
  const schema = z.object({
    name: z.string().min(2, t.errName).max(120, t.errName),
    email: z.string().email(t.errEmail).max(160, t.errEmail),
    company: z.string().max(160).optional().or(z.literal("")),
    message: z.string().min(10, t.errMessage).max(2000, t.errMessage),
  });

  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  function onSubmit(values: Values) {
    const subject = `Contato Vyntra — ${values.name}${
      values.company ? ` (${values.company})` : ""
    }`;
    const body = `${values.message}\n\n— ${values.name}\n${values.email}${
      values.company ? `\n${values.company}` : ""
    }`;
    const mailto = `mailto:contact@vyntra.sh?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.assign(mailto);
  }

  const inputCls =
    "w-full border border-line bg-base px-4 py-3.5 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-ink";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-px bg-line">
      <Field label={t.name} error={errors.name?.message}>
        <input type="text" autoComplete="name" className={inputCls} {...register("name")} />
      </Field>
      <Field label={t.email} error={errors.email?.message}>
        <input type="email" autoComplete="email" className={inputCls} {...register("email")} />
      </Field>
      <Field label={t.company} error={errors.company?.message}>
        <input type="text" className={inputCls} {...register("company")} />
      </Field>
      <Field label={t.message} error={errors.message?.message}>
        <textarea rows={5} className={inputCls} {...register("message")} />
      </Field>

      <div className="flex flex-col gap-4 border border-line bg-base p-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
          {t.note}
        </span>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 border border-ink bg-ink px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-black transition-opacity hover:opacity-80"
        >
          {t.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 border border-line bg-base p-4">
      <span className="flex items-center justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
          {label}
        </span>
        {error && <span className="text-[0.65rem] text-ink">{error}</span>}
      </span>
      {children}
    </label>
  );
}
