import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://coalmoscow.com',
  devToolbar: {
    enabled: false
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'zh', 'hi', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    }
  }
});
