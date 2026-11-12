import { Check } from 'lucide-react'
import { STATIC_PRODUCTS } from '@/lib/shop-data'
import type { AvailableService } from '@/lib/validations'
import { useLanguage } from '@/components/LanguageProvider'

interface ServiceSelectorProps {
  selected: AvailableService | ''
  onSelect: (service: AvailableService) => void
}

export default function ServiceSelector({ selected, onSelect }: ServiceSelectorProps) {
  const { t } = useLanguage()
  return (
    <fieldset className="border-none p-0 m-0">
      <legend className="sr-only">{t.common.selectService}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STATIC_PRODUCTS.map((product) => {
          const isSelected = selected === product.name

          return (
            <button
              key={product.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(product.name as AvailableService)}
              className={`
                relative text-left rounded-2xl border p-4 transition-all duration-200
                focus-visible:outline-2 focus-visible:outline-gold-bright focus-visible:outline-offset-2
                ${isSelected
                  ? 'border-gold-light bg-gold/10'
                  : 'border-cosmic-border bg-card-gradient hover:border-violet/40 hover:bg-violet/5'
                }
              `}
            >
              {/* Selected indicator */}
              {isSelected && (
                <span
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Check className="w-3 h-3 text-cosmic-black" strokeWidth={3} />
                </span>
              )}

              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-light" aria-hidden="true" />

                <div className="flex flex-col gap-1 min-w-0 flex-1 pr-6">
                  <span className={`font-serif font-semibold text-sm leading-snug ${isSelected ? 'text-gold-bright' : 'text-cream'}`}>
                    {product.name}
                  </span>
                  <span className="text-muted text-xs leading-relaxed line-clamp-2">
                    {product.description}
                  </span>
                  <span className={`font-serif font-bold text-sm mt-1 ${isSelected ? 'text-gradient-gold' : 'text-gold-bright'}`}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
