"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { controlStyles } from "@/components/ui/form-styles";
import { messages } from "@/content/messages";
import { contactSchema, type ContactFormValues } from "@/lib/validators/contact";

type SubmitStatus = "idle" | "success" | "error" | "network" | "rateLimited";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="title-4">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="caption-2 text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        reset();
        setStatus("success");
      } else {
        setStatus(response.status === 429 ? "rateLimited" : "error");
      }
    } catch {
      setStatus("network");
    }
  }

  const errorMessage =
    status === "rateLimited"
      ? messages.contact.rateLimited
      : status === "network"
        ? messages.common.networkError
        : messages.contact.error;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Field id="contact-name" label="Aapka naam" error={errors.name?.message}>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={controlStyles}
          {...register("name")}
        />
      </Field>

      <Field id="contact-email" label="Email" error={errors.email?.message}>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={controlStyles}
          {...register("email")}
        />
      </Field>

      <Field id="contact-phone" label="Phone number (zaroori nahi)" error={errors.phone?.message}>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          className={controlStyles}
          {...register("phone")}
        />
      </Field>

      <Field id="contact-message" label="Aapka message" error={errors.message?.message}>
        <textarea
          id="contact-message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${controlStyles} min-h-32 resize-y`}
          {...register("message")}
        />
      </Field>

      {/* Hidden trap for spam bots. Real visitors never see or fill this. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "success" ? (
        <p role="status" className="body-6 flex items-start gap-2 text-success">
          <CheckCircle aria-hidden="true" size={20} weight="fill" className="mt-0.5 shrink-0" />
          {messages.contact.success}
        </p>
      ) : null}

      {status === "error" || status === "network" || status === "rateLimited" ? (
        <p role="alert" className="body-6 flex items-start gap-2 text-danger">
          <WarningCircle aria-hidden="true" size={20} weight="fill" className="mt-0.5 shrink-0" />
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto sm:self-start">
        {isSubmitting ? "Bhej rahe hain..." : "Message bhejein"}
      </Button>
    </form>
  );
}
