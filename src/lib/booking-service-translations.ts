/**
 * Kannada and Telugu names and descriptions for the bookable consultation
 * services (STATIC_PRODUCTS in ./shop-data.ts), keyed by slug.
 *
 * Bookings still store the English service name (AVAILABLE_SERVICES in
 * ./validations.ts), so the admin panel and the database are unchanged; only
 * what the visitor sees is translated.
 *
 * Drafted for review by a native speaker.
 */
import type { Language } from '@/translations/translations'
import { STATIC_PRODUCTS, type StaticProduct } from './shop-data'

type Copy = { name: string; description: string }

const SERVICE_TRANSLATIONS: Record<string, { kn: Copy; te: Copy }> = {
  'detailed-birth-chart': {
    kn: {
      name: 'ವಿವರವಾದ ಜನ್ಮ ಕುಂಡಲಿ ವರದಿ',
      description:
        'ನಿಮ್ಮ ಜನ್ಮ ಕುಂಡಲಿಯ ಸಮಗ್ರ ಲಿಖಿತ ವಿಶ್ಲೇಷಣೆ — 12 ಭಾವಗಳು, ಗ್ರಹಗಳ ಸ್ಥಾನಗಳು, ಯೋಗಗಳು ಮತ್ತು 12 ತಿಂಗಳ ದಶಾ ಮುನ್ನೋಟ. ಸುಸಂಘಟಿತ PDF ವರದಿಯಾಗಿ ನೀಡಲಾಗುತ್ತದೆ.',
    },
    te: {
      name: 'వివరమైన జన్మ కుండలి నివేదిక',
      description:
        'మీ జన్మ కుండలి యొక్క సమగ్ర లిఖిత విశ్లేషణ — 12 భావాలు, గ్రహ స్థానాలు, యోగాలు మరియు 12 నెలల దశా అంచనా. క్రమబద్ధమైన PDF నివేదికగా అందజేయబడుతుంది.',
    },
  },
  'love-relationship-reading': {
    kn: {
      name: 'ಪ್ರೀತಿ ಮತ್ತು ಸಂಬಂಧ ವಿಶ್ಲೇಷಣೆ',
      description:
        'ನಿಮ್ಮ ಸಂಬಂಧಗಳ ಮಾದರಿಗಳು, ಶುಕ್ರನ ಸ್ಥಾನ ಮತ್ತು 7ನೇ ಭಾವದ ವಿಶ್ಲೇಷಣೆಯ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿದ ಆಳವಾದ ಕುಂಡಲಿ ಓದುವಿಕೆ, ಪ್ರೀತಿ ಮತ್ತು ದಾಂಪತ್ಯದ ನಿರ್ಧಾರಗಳಿಗೆ ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ.',
    },
    te: {
      name: 'ప్రేమ మరియు సంబంధాల విశ్లేషణ',
      description:
        'మీ సంబంధాల తీరు, శుక్రుని స్థానం మరియు 7వ భావ విశ్లేషణపై దృష్టి సారించే లోతైన కుండలి పఠనం, ప్రేమ మరియు భాగస్వామ్య నిర్ణయాలకు ఆచరణాత్మక మార్గదర్శకత్వంతో.',
    },
  },
  'career-astrology-consultation': {
    kn: {
      name: 'ವೃತ್ತಿ ಜ್ಯೋತಿಷ್ಯ ಸಮಾಲೋಚನೆ',
      description:
        'ನಿಮ್ಮ ಸಹಜ ವೃತ್ತಿ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಮತ್ತು ವೃತ್ತಿ ಬದಲಾವಣೆಗಳಿಗೆ ಸೂಕ್ತ ಸಮಯವನ್ನು ಗುರುತಿಸಲು ನಿಮ್ಮ 10ನೇ ಭಾವ, 2ನೇ ಭಾವ ಮತ್ತು ಗ್ರಹ ದಶೆಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ನೇರ ಸಮಾಲೋಚನೆ.',
    },
    te: {
      name: 'వృత్తి జ్యోతిష్య సంప్రదింపు',
      description:
        'మీ సహజ వృత్తి సామర్థ్యాలను మరియు కెరీర్ మార్పులకు సరైన సమయాన్ని గుర్తించేందుకు మీ 10వ భావం, 2వ భావం మరియు గ్రహ దశలను పరిశీలించే ప్రత్యక్ష సంప్రదింపు.',
    },
  },
  'marriage-compatibility-report': {
    kn: {
      name: 'ವಿವಾಹ ಹೊಂದಾಣಿಕೆ ವರದಿ',
      description:
        'ಸಾಂಪ್ರದಾಯಿಕ ಅಷ್ಟಕೂಟ ಗುಣ ಮಿಲನದ ಜೊತೆಗೆ ಸಂಪೂರ್ಣ ಕುಂಡಲಿ ಹೋಲಿಕೆ — ಭಾವನಾತ್ಮಕ ಹೊಂದಾಣಿಕೆ, ಕರ್ಮ ಬಂಧಗಳು ಮತ್ತು ದೀರ್ಘಕಾಲೀನ ದಾಂಪತ್ಯ ಸಾಧ್ಯತೆಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಲಿಖಿತ ವರದಿ ಸೇರಿದೆ.',
    },
    te: {
      name: 'వివాహ పొంతన నివేదిక',
      description:
        'సంప్రదాయ అష్టకూట గుణ మేళనంతో పాటు పూర్తి కుండలి పోలిక — భావోద్వేగ అనుకూలత, కర్మ బంధాలు మరియు దీర్ఘకాలిక దాంపత్య అవకాశాలను కవర్ చేస్తుంది. లిఖిత నివేదిక కూడా ఉంటుంది.',
    },
  },
  'one-on-one-consultation': {
    kn: {
      name: 'ವೈಯಕ್ತಿಕ ಜ್ಯೋತಿಷ್ಯ ಸಮಾಲೋಚನೆ',
      description:
        'ನಿಮ್ಮ ಕುಂಡಲಿ ಮತ್ತು ಜೀವನದ ಯಾವುದೇ ವಿಷಯದ ಕುರಿತು 60 ನಿಮಿಷಗಳ ನೇರ ಸಮಾಲೋಚನೆ (ವೀಡಿಯೊ ಅಥವಾ ಫೋನ್). ನಿಮ್ಮ ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ. ರೆಕಾರ್ಡಿಂಗ್ ಮತ್ತು ಸಂಕ್ಷಿಪ್ತ ಲಿಖಿತ ಸಾರಾಂಶ ಸೇರಿದೆ.',
    },
    te: {
      name: 'వ్యక్తిగత జ్యోతిష్య సంప్రదింపు',
      description:
        'మీ కుండలి మరియు జీవితంలోని ఏ అంశంపైనైనా 60 నిమిషాల ప్రత్యక్ష సంప్రదింపు (వీడియో లేదా ఫోన్). మీ ముఖ్యమైన ప్రశ్నలు అడగండి. రికార్డింగ్ మరియు సంక్షిప్త లిఖిత సారాంశం ఉంటాయి.',
    },
  },
  'annual-horoscope-report': {
    kn: {
      name: 'ವಾರ್ಷಿಕ ಜಾತಕ ಫಲ ವರದಿ',
      description:
        'ಮುಂದಿನ ವರ್ಷದ ತಿಂಗಳುವಾರು ಲಿಖಿತ ಭವಿಷ್ಯ — ವೃತ್ತಿ, ಸಂಬಂಧಗಳು, ಆರೋಗ್ಯ ಮತ್ತು ಪ್ರಮುಖ ಗೋಚಾರಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ನಿಮ್ಮ ಜನ್ಮ ಕುಂಡಲಿ ಮತ್ತು ಪ್ರಸ್ತುತ ದಶೆಗಳನ್ನು ಆಧರಿಸಿದೆ.',
    },
    te: {
      name: 'వార్షిక జాతక ఫల నివేదిక',
      description:
        'రాబోయే సంవత్సరానికి నెలవారీ లిఖిత ఫలితాలు — వృత్తి, సంబంధాలు, ఆరోగ్యం మరియు ముఖ్యమైన గోచారాలను కవర్ చేస్తుంది. మీ జన్మ కుండలి మరియు ప్రస్తుత దశలపై ఆధారపడి ఉంటుంది.',
    },
  },
}

/** A service's name and description in the visitor's language (English fallback). */
export function localizeService(product: StaticProduct, language: Language): Copy {
  if (language === 'en') return { name: product.name, description: product.description }
  const copy = SERVICE_TRANSLATIONS[product.slug]?.[language]
  return {
    name: copy?.name || product.name,
    description: copy?.description || product.description,
  }
}

/** Localized display name for a stored (English) service name. */
export function localizeServiceName(englishName: string, language: Language): string {
  const product = STATIC_PRODUCTS.find((p) => p.name === englishName)
  return product ? localizeService(product, language).name : englishName
}
