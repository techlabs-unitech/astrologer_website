'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react'
import { adminLoginSchema, type AdminLoginSchema } from '@/lib/validations'
import { signIn } from '@/app/admin/actions/auth'
import { useLanguage } from '@/components/LanguageProvider'

export default function AdminLoginPage() {
  const { t } = useLanguage()
  const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
  })

  function onSubmit(data: AdminLoginSchema) {
    setServerError('')
    startTransition(async () => {
      const result = await signIn(data)
      if (result?.error) setServerError(result.error)
    })
  }

  return (
    <div className="min-h-screen bg-cosmic-deep flex items-center justify-center px-4 py-12">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-violet/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet to-gold flex items-center justify-center shadow-glow-violet">
            <Star className="w-7 h-7 text-cosmic-black fill-current" />
          </div>
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-cream">
              Astro<span className="text-gradient-gold">Jyotish</span>
            </h1>
            <p className="text-muted text-sm mt-0.5">{t.common.admin}</p>
          </div>
        </div>

        {/* Form card */}
        <div className="card-cosmic p-7">
          <h2 className="heading-serif text-xl font-semibold mb-6 text-center">{t.common.signIn}</h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            {/* Server error */}
            {serverError && (
              <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {serverError}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="login-email" className="label-cosmic">
                {t.common.email}
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="admin@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'login-email-err' : undefined}
                className="input-cosmic"
                {...register('email')}
              />
              {errors.email && (
                <p id="login-email-err" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="label-cosmic">
                {t.common.password}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'login-pw-err' : undefined}
                  className="input-cosmic pr-11"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? t.common.close : t.common.password}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-silver transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="login-pw-err" role="alert" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              aria-busy={isPending}
              className="btn-primary w-full mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin" />{t.common.signIn}…</>
              ) : t.common.signIn}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          This area is restricted to authorised administrators only.
        </p>
      </div>
    </div>
  )
}
