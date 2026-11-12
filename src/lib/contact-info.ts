/**
 * Business contact details and social accounts, shared by the footer and the
 * contact page so they can never disagree.
 */
export const CONTACT = {
  email: 'info@saibabaastro.store',
  phoneDisplay: '+91 99720 49339',
  phoneHref: 'tel:+919972049339',
  address: 'Chintamani Taluk, Chikkaballapura District, Karnataka - 563161',
} as const

/**
 * Social profiles. The WhatsApp link needs the country code (91) for wa.me
 * to open the right chat; it is the same number as CONTACT.phoneDisplay.
 */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/saibababorewellpoints',
  facebook: 'https://www.facebook.com/share/1WzysMgBZq/',
  whatsapp: 'https://wa.me/919972049339',
} as const
