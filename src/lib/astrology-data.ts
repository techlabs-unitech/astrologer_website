import type { Language } from '@/translations/translations'

/**
 * Reference data for the "Explore Astrology" section and the /astrology guide.
 *
 * Classical Vedic (Parashari) facts: 12 rashis with their lords and elements,
 * 27 nakshatras with their Vimshottari dasha lords, and the 9 navagrahas.
 * Names are given in English (transliteration + Western equivalent), Kannada
 * and Telugu so they follow the site-wide language switch.
 */

export type Localized = Record<Language, string>

export type GrahaId =
  | 'surya'
  | 'chandra'
  | 'mangala'
  | 'budha'
  | 'guru'
  | 'shukra'
  | 'shani'
  | 'rahu'
  | 'ketu'

export type Element = 'fire' | 'earth' | 'air' | 'water'

export interface Graha {
  id: GrahaId
  symbol: string
  name: Localized
  /** Weekday ruled by the graha; Rahu and Ketu have none */
  day: Localized | null
  /** Rahu and Ketu are chaya (shadow) grahas */
  shadow: boolean
}

export interface Rashi {
  id: string
  symbol: string
  name: Localized
  lord: GrahaId
  element: Element
}

export interface Nakshatra {
  id: string
  name: Localized
  lord: GrahaId
}

// Unicode "text presentation" selector so mobile browsers render the
// astrological glyphs as typography instead of colour emoji.
const TEXT = '︎'

export const GRAHAS: Graha[] = [
  { id: 'surya',   symbol: '☉' + TEXT, shadow: false, name: { en: 'Surya (Sun)',        kn: 'ಸೂರ್ಯ', te: 'సూర్యుడు' }, day: { en: 'Sunday',    kn: 'ಭಾನುವಾರ', te: 'ఆదివారం' } },
  { id: 'chandra', symbol: '☽' + TEXT, shadow: false, name: { en: 'Chandra (Moon)',     kn: 'ಚಂದ್ರ', te: 'చంద్రుడు' }, day: { en: 'Monday',    kn: 'ಸೋಮವಾರ', te: 'సోమవారం' } },
  { id: 'mangala', symbol: '♂' + TEXT, shadow: false, name: { en: 'Mangala (Mars)',     kn: 'ಮಂಗಳ (ಕುಜ)', te: 'కుజుడు (మంగళుడు)' }, day: { en: 'Tuesday',   kn: 'ಮಂಗಳವಾರ', te: 'మంగళవారం' } },
  { id: 'budha',   symbol: '☿' + TEXT, shadow: false, name: { en: 'Budha (Mercury)',    kn: 'ಬುಧ', te: 'బుధుడు' }, day: { en: 'Wednesday', kn: 'ಬುಧವಾರ', te: 'బుధవారం' } },
  { id: 'guru',    symbol: '♃' + TEXT, shadow: false, name: { en: 'Guru (Jupiter)',     kn: 'ಗುರು', te: 'గురుడు' }, day: { en: 'Thursday',  kn: 'ಗುರುವಾರ', te: 'గురువారం' } },
  { id: 'shukra',  symbol: '♀' + TEXT, shadow: false, name: { en: 'Shukra (Venus)',     kn: 'ಶುಕ್ರ', te: 'శుక్రుడు' }, day: { en: 'Friday',    kn: 'ಶುಕ್ರವಾರ', te: 'శుక్రవారం' } },
  { id: 'shani',   symbol: '♄' + TEXT, shadow: false, name: { en: 'Shani (Saturn)',     kn: 'ಶನಿ', te: 'శని' }, day: { en: 'Saturday',  kn: 'ಶನಿವಾರ', te: 'శనివారం' } },
  { id: 'rahu',    symbol: '☊' + TEXT, shadow: true,  name: { en: 'Rahu (North Node)',  kn: 'ರಾಹು', te: 'రాహువు' }, day: null },
  { id: 'ketu',    symbol: '☋' + TEXT, shadow: true,  name: { en: 'Ketu (South Node)',  kn: 'ಕೇತು', te: 'కేతువు' }, day: null },
]

export const RASHIS: Rashi[] = [
  { id: 'mesha',      symbol: '♈' + TEXT, lord: 'mangala', element: 'fire',  name: { en: 'Mesha (Aries)',        kn: 'ಮೇಷ', te: 'మేషం' } },
  { id: 'vrishabha',  symbol: '♉' + TEXT, lord: 'shukra',  element: 'earth', name: { en: 'Vrishabha (Taurus)',   kn: 'ವೃಷಭ', te: 'వృషభం' } },
  { id: 'mithuna',    symbol: '♊' + TEXT, lord: 'budha',   element: 'air',   name: { en: 'Mithuna (Gemini)',     kn: 'ಮಿಥುನ', te: 'మిథునం' } },
  { id: 'karka',      symbol: '♋' + TEXT, lord: 'chandra', element: 'water', name: { en: 'Karka (Cancer)',       kn: 'ಕರ್ಕಾಟಕ', te: 'కర్కాటకం' } },
  { id: 'simha',      symbol: '♌' + TEXT, lord: 'surya',   element: 'fire',  name: { en: 'Simha (Leo)',          kn: 'ಸಿಂಹ', te: 'సింహం' } },
  { id: 'kanya',      symbol: '♍' + TEXT, lord: 'budha',   element: 'earth', name: { en: 'Kanya (Virgo)',        kn: 'ಕನ್ಯಾ', te: 'కన్య' } },
  { id: 'tula',       symbol: '♎' + TEXT, lord: 'shukra',  element: 'air',   name: { en: 'Tula (Libra)',         kn: 'ತುಲಾ', te: 'తుల' } },
  { id: 'vrishchika', symbol: '♏' + TEXT, lord: 'mangala', element: 'water', name: { en: 'Vrishchika (Scorpio)', kn: 'ವೃಶ್ಚಿಕ', te: 'వృశ్చికం' } },
  { id: 'dhanu',      symbol: '♐' + TEXT, lord: 'guru',    element: 'fire',  name: { en: 'Dhanu (Sagittarius)',  kn: 'ಧನು', te: 'ధనుస్సు' } },
  { id: 'makara',     symbol: '♑' + TEXT, lord: 'shani',   element: 'earth', name: { en: 'Makara (Capricorn)',   kn: 'ಮಕರ', te: 'మకరం' } },
  { id: 'kumbha',     symbol: '♒' + TEXT, lord: 'shani',   element: 'air',   name: { en: 'Kumbha (Aquarius)',    kn: 'ಕುಂಭ', te: 'కుంభం' } },
  { id: 'meena',      symbol: '♓' + TEXT, lord: 'guru',    element: 'water', name: { en: 'Meena (Pisces)',       kn: 'ಮೀನ', te: 'మీనం' } },
]

// Vimshottari dasha order — repeats three times across the 27 nakshatras.
const DASHA_ORDER: GrahaId[] = ['ketu', 'shukra', 'surya', 'chandra', 'mangala', 'rahu', 'guru', 'shani', 'budha']

const NAKSHATRA_NAMES: Array<[string, Localized]> = [
  ['ashwini',           { en: 'Ashwini',           kn: 'ಅಶ್ವಿನಿ', te: 'అశ్విని' }],
  ['bharani',           { en: 'Bharani',           kn: 'ಭರಣಿ', te: 'భరణి' }],
  ['krittika',          { en: 'Krittika',          kn: 'ಕೃತ್ತಿಕಾ', te: 'కృత్తిక' }],
  ['rohini',            { en: 'Rohini',            kn: 'ರೋಹಿಣಿ', te: 'రోహిణి' }],
  ['mrigashira',        { en: 'Mrigashira',        kn: 'ಮೃಗಶಿರಾ', te: 'మృగశిర' }],
  ['ardra',             { en: 'Ardra',             kn: 'ಆರ್ದ್ರಾ', te: 'ఆర్ద్ర' }],
  ['punarvasu',         { en: 'Punarvasu',         kn: 'ಪುನರ್ವಸು', te: 'పునర్వసు' }],
  ['pushya',            { en: 'Pushya',            kn: 'ಪುಷ್ಯ', te: 'పుష్యమి' }],
  ['ashlesha',          { en: 'Ashlesha',          kn: 'ಆಶ್ಲೇಷಾ', te: 'ఆశ్లేష' }],
  ['magha',             { en: 'Magha',             kn: 'ಮಘಾ', te: 'మఖ' }],
  ['purva-phalguni',    { en: 'Purva Phalguni',    kn: 'ಪೂರ್ವ ಫಲ್ಗುಣಿ', te: 'పుబ్బ (పూర్వ ఫల్గుణి)' }],
  ['uttara-phalguni',   { en: 'Uttara Phalguni',   kn: 'ಉತ್ತರ ಫಲ್ಗುಣಿ', te: 'ఉత్తర (ఉత్తర ఫల్గుణి)' }],
  ['hasta',             { en: 'Hasta',             kn: 'ಹಸ್ತ', te: 'హస్త' }],
  ['chitra',            { en: 'Chitra',            kn: 'ಚಿತ್ರಾ', te: 'చిత్త' }],
  ['swati',             { en: 'Swati',             kn: 'ಸ್ವಾತಿ', te: 'స్వాతి' }],
  ['vishakha',          { en: 'Vishakha',          kn: 'ವಿಶಾಖಾ', te: 'విశాఖ' }],
  ['anuradha',          { en: 'Anuradha',          kn: 'ಅನುರಾಧಾ', te: 'అనూరాధ' }],
  ['jyeshtha',          { en: 'Jyeshtha',          kn: 'ಜ್ಯೇಷ್ಠಾ', te: 'జ్యేష్ఠ' }],
  ['mula',              { en: 'Mula',              kn: 'ಮೂಲಾ', te: 'మూల' }],
  ['purva-ashadha',     { en: 'Purva Ashadha',     kn: 'ಪೂರ್ವಾಷಾಢಾ', te: 'పూర్వాషాఢ' }],
  ['uttara-ashadha',    { en: 'Uttara Ashadha',    kn: 'ಉತ್ತರಾಷಾಢಾ', te: 'ఉత్తరాషాఢ' }],
  ['shravana',          { en: 'Shravana',          kn: 'ಶ್ರವಣ', te: 'శ్రవణం' }],
  ['dhanishta',         { en: 'Dhanishta',         kn: 'ಧನಿಷ್ಠಾ', te: 'ధనిష్ఠ' }],
  ['shatabhisha',       { en: 'Shatabhisha',       kn: 'ಶತಭಿಷಾ', te: 'శతభిషం' }],
  ['purva-bhadrapada',  { en: 'Purva Bhadrapada',  kn: 'ಪೂರ್ವಾಭಾದ್ರಾ', te: 'పూర్వాభాద్ర' }],
  ['uttara-bhadrapada', { en: 'Uttara Bhadrapada', kn: 'ಉತ್ತರಾಭಾದ್ರಾ', te: 'ఉత్తరాభాద్ర' }],
  ['revati',            { en: 'Revati',            kn: 'ರೇವತಿ', te: 'రేవతి' }],
]

export const NAKSHATRAS: Nakshatra[] = NAKSHATRA_NAMES.map(([id, name], index) => ({
  id,
  name,
  lord: DASHA_ORDER[index % DASHA_ORDER.length],
}))

export function getGraha(id: GrahaId): Graha {
  const graha = GRAHAS.find((g) => g.id === id)
  if (!graha) throw new Error(`Unknown graha: ${id}`)
  return graha
}

/** Rashis owned by a graha (Rahu and Ketu own none in the classical scheme). */
export function getRashisRuledBy(id: GrahaId): Rashi[] {
  return RASHIS.filter((r) => r.lord === id)
}

/** Section anchors on the /astrology page, shared with the homepage carousel. */
export const ASTROLOGY_SECTIONS = {
  zodiac: 'zodiac-signs',
  nakshatras: 'nakshatras',
  grahas: 'grahagalu',
} as const
