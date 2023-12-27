import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from '~i18n/loacles/en/translation.json';

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    debug: true,
    fallbackLng: 'en',
    lng: 'en',
    resources: {
      en: {
        translation,
      },
    },
  });

export default i18n;
