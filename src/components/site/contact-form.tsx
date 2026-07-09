"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(2, "Informe seu nome.")
    .max(120, "Nome muito longo."),
  email: z.string().email("E-mail inválido.").max(160),
  company: z.string().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Descreva brevemente o que precisa.")
    .max(2000, "Mensagem muito longa."),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  async function onSubmit(values: Values) {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-px bg-line"
    >
      <Field label="Nome" error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          className={inputCls}
          {...register("name")}
        />
      </Field>
      <Field label="E-mail" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          className={inputCls}
          {...register("email")}
        />
      </Field>
      <Field label="Empresa / projeto (opcional)" error={errors.company?.message}>
        <input type="text" className={inputCls} {...register("company")} />
      </Field>
      <Field label="Mensagem" error={errors.message?.message}>
        <textarea rows={5} className={inputCls} {...register("message")} />
      </Field>

      <div className="flex flex-col gap-4 border border-line bg-base p-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
          Resposta em até 1 dia útil
        </span>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 border border-ink bg-ink px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-black transition-opacity hover:opacity-80"
        >
          Abrir no email →
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full border border-line bg-base px-4 py-3.5 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-ink";

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
        {error && (
          <span className="text-[0.65rem] text-ink">{error}</span>
        )}
      </span>
      {children}
    </label>
  );
}
