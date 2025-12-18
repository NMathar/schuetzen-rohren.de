// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  ssr: false,
  nitro: {
    preset: 'static'
  },
  
  modules: ['vuetify-nuxt-module', '@nuxtjs/google-fonts', 'nuxt-swiper', 'nuxt-graphql-client'],
  
  googleFonts: {
    families: {
      'Playfair+Display': [400, 500, 600, 700],
      'Open+Sans': [300, 400, 500, 600]
    },
    display: 'swap'
  },

  runtimeConfig: {
    public: {
      GQL_HOST: 'https://backend.schuetzen-rohren.de/actions/graphql/api'
    }
  },

  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'shootingClubTheme',
        themes: {
          shootingClubTheme: {
            dark: false,
            colors: {
              primary: '#4A6741',    // Sage Green
              secondary: '#8B7355',   // Wood Brown
              tertiary: '#6B8E23',    // Olive Drab
              accent: '#D4AF37',      // Metallic Gold
              background: '#F8F8F0',  // Light Sage
              surface: '#FFFFFF',
              error: '#B00020',
              success: '#556B2F',     // Dark Olive Green
              warning: '#B8860B',     // Dark Goldenrod
              info: '#2F4F4F'         // Dark Slate Gray
            }
          }
        }
      }
    }
  },
  
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/css/main.scss'
  ],
  
  app: {
    head: {
      title: 'Schützenverein Tradition',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // { hid: 'description', name: 'description', content: 'Traditioneller Schützenverein mit Geschichte und Leidenschaft.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})