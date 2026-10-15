'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react'
import {
  contactFormSchema,
  CONTACT_SUBJECTS,
  type ContactFormSchema,
} from '@/lib/validations'
import { submitContactMessage } from '@/app/contact/actions'
import { useLanguage } from '@/components/LanguageProvider'

// ─── Field error helper ───────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const { t } = useLanguage()
  const [submitted, setSubmitted]     = useState(false)
  const [serverError, setServerError] = useState('')
  const [isPending, startTransition]  = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name:    '',
      email:   '',
      phone:   '',
      subject: undefined,
      message: '',
    },
  })

  function onSubmit(data: ContactFormSchema) {
    setServerError('')
    startTransition(async () => {
      const result = await submitContactMessage(data)
      if (result.success) {
        setSubmitted(true)
        reset()
      } else {
        setServerError(result.error)
      }
    })
  }

  // ── Success state ─────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-violet/20 border border-gold/40 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-gold-bright" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="heading-serif text-xl font-semibold text-cream">
            {t.common.messageReceived}
          </h3>
          <p className="text-silver text-sm max-w-xs leading-relaxed">
            {t.common.thankYouMessage}
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setServerError('') }}
          className="btn-ghost text-xs px-5 py-2"
        >
          {t.common.sendAnotherMessage}
        </button>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={t.common.contactForm}
      className="flex flex-col gap-5"
    >
      {/* Server error */}
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          {serverError}
        </div>
      )}

      {/* Row 1 — Name + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="label-cosmic">
            {t.common.fullName} <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            placeholder={t.common.yourFullName}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            className="input-cosmic"
            {...register('name')}
          />
          <span id="cf-name-error">
            <FieldError message={errors.name?.message} />
          </span>
        </div>

        <div>
          <label htmlFor="cf-email" className="label-cosmic">
            {t.common.email} <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            placeholder={t.common.email}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            className="input-cosmic"
            {...register('email')}
          />
          <span id="cf-email-error">
            <FieldError message={errors.email?.message} />
          </span>
        </div>
      </div>

      {/* Row 2 — Phone + Subject */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-phone" className="label-cosmic">
            {t.common.phone}{' '}
            <span className="text-muted text-xs font-normal">({t.common.optional})</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t.common.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
            className="input-cosmic"
            {...register('phone')}
          />
          <span id="cf-phone-error">
            <FieldError message={errors.phone?.message} />
          </span>
        </div>

        <div>
          <label htmlFor="cf-subject" className="label-cosmic">
            {t.common.subject} <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <select
            id="cf-subject"
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'cf-subject-error' : undefined}
            className="input-cosmic appearance-none bg-cosmic-card"
            {...register('subject')}
          >
            <option value="" disabled>
              {t.common.selectSubject}
            </option>
            {CONTACT_SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span id="cf-subject-error">
            <FieldError message={errors.subject?.message} />
          </span>
        </div>
      </div>

      {/* Row 3 — Message */}
      <div>
        <label htmlFor="cf-message" className="label-cosmic">
          {t.common.message} <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder={t.home.finalDescription}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          className="input-cosmic resize-none"
          {...register('message')}
        />
        <span id="cf-message-error">
          <FieldError message={errors.message?.message} />
        </span>
      </div>

      <p className="text-muted text-xs">
        {t.common.requiredFields}
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="btn-primary self-start text-sm px-8 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            {t.common.sending}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            {t.common.sendMessage}
          </>
        )}
      </button>
    </form>
  )
}
