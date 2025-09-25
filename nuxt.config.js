import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: ['~/plugins/axios.js'],
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv', '@nuxtjs/toast'],

  axios: {
    baseURL: process.env.BACK_URL || 'http://localhost:8000',
  },

  toast: {
    positionClass: "toast-top-right",
    progressBar: true,
    duration: 3000,
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  server: {
    host: '0.0.0.0', // Escuchar en todas las interfaces IPv4
    port: 3000       // Puerto que configuraste en Nginx
  },

  build: {
    extend(config, ctx) {}
  }
}
