import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://emptyinside1.github.io',
  base: '/ugol',
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
