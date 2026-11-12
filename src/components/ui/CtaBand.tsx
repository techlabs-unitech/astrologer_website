import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import Container from '@/components/ui/Container'

interface CtaBandProps {
  title: ReactNode
  description?: ReactNode
  primary: { href: string; label: ReactNode }
  secondary?: { href: string; label: ReactNode }
  id?: string
}

/**
 * Closing call-to-action band. It is a deep-violet "night panel" in both
 * themes, so it uses the fixed `night` / `saffron` colours, not theme roles.
 */
export default function CtaBand({ title, description, primary, secondary, id = 'cta-heading' }: CtaBandProps) {
  return (
    <section className="border-y border-saffron/30 bg-night" aria-labelledby={id}>
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
          <div className="flex max-w-3xl flex-col gap-3">
            <h2 id={id} className="text-balance font-serif text-3xl font-bold text-[#F4E5DD] sm:text-4xl">
              {title}
            </h2>
            {description && <p className="text-base leading-relaxed text-[#D8C8E2] sm:text-lg">{description}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              href={primary.href}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-lg bg-saffron px-7 text-[15px] font-semibold text-night-deep transition-opacity hover:opacity-90"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="text-[15px] font-semibold text-[#F4E5DD] underline decoration-saffron decoration-2 underline-offset-[6px] hover:text-saffron"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
