'use client'

import { Eye, Zap, Shield, Award } from 'lucide-react'
import Card from '@/components/ui/Card'
import { useLanguage } from '@/components/LanguageProvider'

/** Four DISTINCT benefit cards (previously one title/description was repeated 4×). */
export default function ShopBenefits() {
  const { t } = useLanguage()
  const items = [
    { icon: Eye,    title: t.common.benefit1Title, desc: t.common.benefit1Desc },
    { icon: Zap,    title: t.common.benefit2Title, desc: t.common.benefit2Desc },
    { icon: Shield, title: t.common.benefit3Title, desc: t.common.benefit3Desc },
    { icon: Award,  title: t.common.benefit4Title, desc: t.common.benefit4Desc },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map(({ icon: Icon, title, desc }) => (
        <Card key={title} accent className="p-6 flex flex-col gap-4 text-center items-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet/20 to-gold/10 border border-violet/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-gold-bright" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-cream font-semibold">{title}</h3>
          <p className="text-muted text-sm leading-relaxed">{desc}</p>
        </Card>
      ))}
    </div>
  )
}
