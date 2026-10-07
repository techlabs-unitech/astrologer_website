'use client'

import { useState, useCallback, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { startOfMonth } from 'date-fns'
import { AlertCircle, ChevronRight } from 'lucide-react'

import { appointmentSchema, type AppointmentSchema, type AvailableService } from '@/lib/validations'
import { createAppointment } from '@/app/appointment/actions'
import { useLanguage } from '@/components/LanguageProvider'

import ServiceSelector    from './ServiceSelector'
import DateSelector       from './DateSelector'
import TimeSlotSelector   from './TimeSlotSelector'
import BookingSummary     from './BookingSummary'
import BookingConfirmation from './BookingConfirmation'

// ─── Step definitions ─────────────────────────────────────────────────────────

type Step = 'service' | 'datetime' | 'details' | 'summary' | 'confirmed'

// ─── FieldError helper ────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p role="alert" className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

// ─── StepIndicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const { t } = useLanguage()
  if (current === 'confirmed') return null
  const steps = [
    { id: 'service' as Step, label: t.common.service, number: 1 },
    { id: 'datetime' as Step, label: `${t.common.date} & ${t.common.time}`, number: 2 },
    { id: 'details' as Step, label: t.common.name, number: 3 },
    { id: 'summary' as Step, label: t.common.confirmAppointment, number: 4 },
  ]
  const currentIndex = steps.findIndex((s) => s.id === current)

  return (
    <nav aria-label={t.common.appointmentForm} className="mb-8">
      <ol className="flex items-center gap-0">
        {steps.map((step, i) => {
          const done    = i < currentIndex
          const active  = step.id === current

          return (
            <li key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200
                    ${done   ? 'bg-gold border-gold text-cosmic-black'
                    : active ? 'bg-violet border-violet-bright text-white shadow-glow-violet'
                    :          'bg-transparent border-cosmic-border text-muted'}
                  `}
                  aria-current={active ? 'step' : undefined}
                >
                  {done ? '✓' : step.number}
                </span>
                <span className={`text-[10px] font-medium hidden sm:block ${active ? 'text-cream' : done ? 'text-gold-bright' : 'text-muted'}`}>
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-1 sm:mx-2 transition-all duration-300 ${done ? 'bg-gold/60' : 'bg-cosmic-border'}`}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

interface AppointmentFormProps {
  preselectedService: AvailableService | ''
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AppointmentForm({ preselectedService }: AppointmentFormProps) {
  const { t } = useLanguage()
  // ── Step state — skip service selection if arriving with a preselected service
  const [step, setStep] = useState<Step>(preselectedService ? 'datetime' : 'service')

  // ── Selection state ──────────────────────────────────────────────────────
  const [selectedService, setSelectedService]   = useState<AvailableService | ''>(preselectedService)
  const [selectedDate, setSelectedDate]         = useState<string>('')
  const [selectedTime, setSelectedTime]         = useState<string>('')
  const [viewMonth, setViewMonth]               = useState<Date>(startOfMonth(new Date()))
  const [bookedSlots, setBookedSlots]           = useState<string[]>([])
  const [slotsLoading, setSlotsLoading]         = useState(false)
  const [serverError, setServerError]           = useState('')
  const [confirmedData, setConfirmedData]       = useState<AppointmentSchema | null>(null)
  const [isPending, startTransition]            = useTransition()

  // ── Step 1 validation ────────────────────────────────────────────────────
  const [serviceError, setServiceError] = useState('')

  // ── Step 2 validation ────────────────────────────────────────────────────
  const [dateError, setDateError]   = useState('')
  const [timeError, setTimeError]   = useState('')

  // ── Step 3 — details form ────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name:             '',
      email:            '',
      phone:            '',
      service:          preselectedService || undefined,
      appointment_date: '',
      appointment_time: '',
      notes:            '',
    },
  })

  // ── Fetch booked slots when a date is selected ───────────────────────────
  const loadBookedSlots = useCallback(async (date: string) => {
    setSlotsLoading(true)
    setSelectedTime('')
    try {
      const res = await fetch(`/api/booked-slots?date=${date}`)
      if (res.ok) {
        const json = await res.json() as { slots: string[] }
        setBookedSlots(json.slots ?? [])
      } else {
        setBookedSlots([])
      }
    } catch {
      setBookedSlots([])
    } finally {
      setSlotsLoading(false)
    }
  }, [])

  // ── Navigation helpers ───────────────────────────────────────────────────

  function handleServiceNext() {
    if (!selectedService) {
      setServiceError(`${t.common.selectService}.`)
      return
    }
    setServiceError('')
    // Sync wizard selection into RHF so Zod sees it at Step 3 submit
    setValue('service', selectedService as AvailableService, { shouldValidate: false })
    setStep('datetime')
  }

  function handleDatetimeNext() {
    let hasError = false
    if (!selectedDate) {
      setDateError(`${t.common.date}.`)
      hasError = true
    } else {
      setDateError('')
    }
    if (!selectedTime) {
      setTimeError(`${t.common.time}.`)
      hasError = true
    } else {
      setTimeError('')
    }
    if (!hasError) {
      // Sync wizard selections into RHF so Zod sees them at Step 3 submit
      setValue('appointment_date', selectedDate, { shouldValidate: false })
      setValue('appointment_time', selectedTime, { shouldValidate: false })
      setStep('details')
    }
  }

  // Step 3 → 4: RHF calls this only when ALL fields (including the hidden
  // wizard ones synced above) pass Zod validation.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleDetailsNext(_data: AppointmentSchema) {
    setServerError('')
    setStep('summary')
  }

  // Step 4: submit to server action
  function handleConfirm() {
    // All wizard selections were synced into RHF at each step, so getValues()
    // returns the complete, already-validated payload.
    const payload: AppointmentSchema = {
      ...getValues(),
      service:          selectedService as AvailableService,
      appointment_date: selectedDate,
      appointment_time: selectedTime,
    }

    startTransition(async () => {
      const result = await createAppointment(payload)
      if (result.success) {
        setConfirmedData(payload)
        setStep('confirmed')
      } else {
        setServerError(result.error)
        if (result.field === 'appointment_time') {
          // Slot taken — go back to datetime step and reload slots
          setSelectedTime('')
          setValue('appointment_time', '', { shouldValidate: false })
          await loadBookedSlots(selectedDate)
          setStep('datetime')
        }
      }
    })
  }

  function handleBookAnother() {
    setSelectedService(preselectedService)
    setSelectedDate('')
    setSelectedTime('')
    setViewMonth(startOfMonth(new Date()))
    setBookedSlots([])
    setServerError('')
    setConfirmedData(null)
    setValue('service',          (preselectedService || undefined) as AvailableService, { shouldValidate: false })
    setValue('appointment_date', '', { shouldValidate: false })
    setValue('appointment_time', '', { shouldValidate: false })
    setStep('service')
  }

  // ── Layout wrapper ───────────────────────────────────────────────────────

  const panelClass = 'card-cosmic p-6 sm:p-8'

  // ── Confirmed screen ─────────────────────────────────────────────────────
  if (step === 'confirmed' && confirmedData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className={panelClass}>
          <BookingConfirmation
            service={confirmedData.service}
            date={confirmedData.appointment_date}
            time={confirmedData.appointment_time}
            name={confirmedData.name}
            email={confirmedData.email}
            onBookAnother={handleBookAnother}
          />
        </div>
      </div>
    )
  }

  // ── Main multi-step form ─────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator current={step} />

      {/* ── STEP 1: Service ─────────────────────────────────────────── */}
      {step === 'service' && (
        <div className={panelClass}>
          <div className="mb-6">
            <h3 className="heading-serif text-xl font-semibold mb-1">{t.common.selectService}</h3>
            <p className="text-muted text-sm">{t.home.servicesSubtitle}</p>
          </div>

          <ServiceSelector
            selected={selectedService}
            onSelect={(svc) => { setSelectedService(svc); setServiceError('') }}
          />

          {serviceError && (
            <p role="alert" className="flex items-center gap-1.5 mt-4 text-xs text-red-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {serviceError}
            </p>
          )}

          <div className="flex justify-end mt-6">
            <button type="button" onClick={handleServiceNext} className="btn-primary text-sm px-8">
              {t.common.continue}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Date & Time ──────────────────────────────────────── */}
      {step === 'datetime' && (
        <div className={panelClass}>
          <div className="mb-6">
            <h3 className="heading-serif text-xl font-semibold mb-1">{t.common.date} &amp; {t.common.time}</h3>
            <p className="text-muted text-sm">{t.home.finalDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Date picker */}
            <div className="flex flex-col gap-2">
              <span className="label-cosmic">{t.common.date}</span>
              <DateSelector
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  setDateError('')
                  void loadBookedSlots(date)
                }}
                viewMonth={viewMonth}
                onPrevMonth={() => setViewMonth((m) => startOfMonth(new Date(m.getFullYear(), m.getMonth() - 1)))}
                onNextMonth={() => setViewMonth((m) => startOfMonth(new Date(m.getFullYear(), m.getMonth() + 1)))}
              />
              <FieldError message={dateError} />
            </div>

            {/* Time slots */}
            <div className="flex flex-col gap-2">
              <span className="label-cosmic">
                {t.common.availableTimeSlots}
                {slotsLoading && (
                  <span className="ml-2 text-[10px] text-muted">(loading…)</span>
                )}
              </span>
              {selectedDate ? (
                <TimeSlotSelector
                  selectedDate={selectedDate}
                  selected={selectedTime}
                  bookedSlots={bookedSlots}
                  onSelect={(t) => { setSelectedTime(t); setTimeError('') }}
                />
              ) : (
                <p className="text-muted text-sm py-4">{t.common.selectDateFirst}</p>
              )}
              <FieldError message={timeError} />
            </div>
          </div>

          {/* Slot-taken error from server (after round-trip) */}
          {serverError && step === 'datetime' && (
            <div role="alert" className="mt-4 rounded-xl border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300 flex items-start gap-2">
              <span className="shrink-0 mt-0.5" aria-hidden="true">⚠</span>
              {serverError}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => setStep('service')} className="btn-secondary text-sm">
              {t.common.back}
            </button>
            <button type="button" onClick={handleDatetimeNext} className="btn-primary text-sm px-8">
              {t.common.continue}
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Your Details ─────────────────────────────────────── */}
      {step === 'details' && (
        <form
          onSubmit={handleSubmit(handleDetailsNext)}
          noValidate
          aria-label={t.common.contactForm}
        >
          <div className={panelClass}>
            <div className="mb-6">
              <h3 className="heading-serif text-xl font-semibold mb-1">{t.common.name}</h3>
              <p className="text-muted text-sm">{t.home.confidentialDescription}</p>
            </div>

            <div className="flex flex-col gap-5">
              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="appt-name" className="label-cosmic">
                    {t.common.fullName} <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="appt-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.common.yourFullName}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'appt-name-err' : undefined}
                    className="input-cosmic"
                    {...register('name')}
                  />
                  <span id="appt-name-err"><FieldError message={errors.name?.message} /></span>
                </div>

                <div>
                  <label htmlFor="appt-email" className="label-cosmic">
                    {t.common.email} <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="appt-email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.common.email}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'appt-email-err' : undefined}
                    className="input-cosmic"
                    {...register('email')}
                  />
                  <span id="appt-email-err"><FieldError message={errors.email?.message} /></span>
                </div>
              </div>

              {/* Phone */}
              <div className="sm:w-1/2">
                <label htmlFor="appt-phone" className="label-cosmic">
                  {t.common.phone} <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                  id="appt-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={t.common.phone}
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'appt-phone-err' : undefined}
                  className="input-cosmic"
                  {...register('phone')}
                />
                <span id="appt-phone-err"><FieldError message={errors.phone?.message} /></span>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="appt-notes" className="label-cosmic">
                  {t.common.notesQuestions}{' '}
                  <span className="text-muted text-xs font-normal">({t.common.optional})</span>
                </label>
                <textarea
                  id="appt-notes"
                  rows={4}
                  placeholder={t.home.astrologyDescription}
                  aria-invalid={!!errors.notes}
                  aria-describedby={errors.notes ? 'appt-notes-err' : undefined}
                  className="input-cosmic resize-none"
                  {...register('notes')}
                />
                <span id="appt-notes-err"><FieldError message={errors.notes?.message} /></span>
              </div>
            </div>

            <p className="text-muted text-xs mt-4">
              {t.common.requiredFields}
            </p>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="btn-secondary text-sm"
              >
                {t.common.back}
              </button>
              <button type="submit" className="btn-primary text-sm px-8">
                {t.common.reviewBooking}
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ── STEP 4: Summary + Confirm ────────────────────────────────── */}
      {step === 'summary' && (
        <div className={panelClass}>
          <div className="mb-6">
            <h3 className="heading-serif text-xl font-semibold mb-1">{t.common.reviewBooking}</h3>
            <p className="text-muted text-sm">{t.home.finalDescription}</p>
          </div>

          <BookingSummary
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            name={getValues('name')}
            email={getValues('email')}
            phone={getValues('phone')}
            notes={getValues('notes') ?? ''}
            onBack={() => setStep('details')}
            onConfirm={handleConfirm}
            submitting={isPending}
            error={serverError}
          />
        </div>
      )}
    </div>
  )
}
