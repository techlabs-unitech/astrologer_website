import { SOCIAL } from '@/lib/contact-info'

/*
 * Brand icons drawn inline (lucide no longer ships brand logos). Instagram and
 * Facebook use the same 2px outline style as the site's other icons;
 * WhatsApp uses its filled mark, as in the floating chat button.
 */

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
      <path d="M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.68-1.72A12.94 12.94 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3zm0 23.7c-2.03 0-4.02-.55-5.76-1.58l-.41-.25-3.97 1.02 1.06-3.87-.27-.42A10.66 10.66 0 0 1 5.3 16c0-5.9 4.8-10.7 10.7-10.7S26.7 10.1 26.7 16s-4.8 10.7-10.7 10.7zm5.86-8c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.22-.37.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.68s1.15 3.11 1.31 3.32c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37z" />
    </svg>
  )
}

export const SOCIAL_ACCOUNTS = [
  { key: 'instagram', label: 'Instagram', href: SOCIAL.instagram, Icon: InstagramIcon },
  { key: 'facebook', label: 'Facebook', href: SOCIAL.facebook, Icon: FacebookIcon },
  { key: 'whatsapp', label: 'WhatsApp', href: SOCIAL.whatsapp, Icon: WhatsAppIcon },
] as const

interface SocialLinksProps {
  className?: string
  /** Show the network name next to each icon (used on the contact page) */
  withLabels?: boolean
}

/** Instagram, Facebook and WhatsApp links; each opens in a new tab. */
export default function SocialLinks({ className = '', withLabels = false }: SocialLinksProps) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} role="list">
      {SOCIAL_ACCOUNTS.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={withLabels ? undefined : `${label} (opens in a new tab)`}
            title={label}
            className={`flex h-11 items-center justify-center gap-2 rounded-lg border border-cosmic-border text-silver transition-colors hover:border-gold-light hover:text-gold ${
              withLabels ? 'px-4 text-sm font-semibold' : 'w-11'
            }`}
          >
            <Icon />
            {withLabels && (
              <>
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
