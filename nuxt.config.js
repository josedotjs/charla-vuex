import colors from 'vuetify/es5/util/colors'
import es from 'vuetify/es5/locale/es'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - vue-tips',
    title: 'vue-tips',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/api.js',
    },
    {
      src: '~/plugins/mask.js',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/proxy',
  ],

  env: {
    // test: process.env.AAA,
    message: process.env.TEST_MESSAGE,
  },

  publicRuntimeConfig: {
    API_PRODUCTS: '/api',
    API_DOCUMENTS: '/apidocuments',
    API_MONGOOSE: '/models/api',
  },

  privateRuntimeConfig: {},
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    baseURL: '/',
  },
  // proxy: {
  //   '/api': {
  //     target: process.env.NUXT_ENV_BASE_URL_PRODUCTS,
  //   },
  //   '/apidocuments': {
  //     target: 'http://localhost:3002',
  //   },
  // },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: { es },
      current: 'es',
    },
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
          success: colors.green.accent3,
        },
      },
    },
  },

  // Server middleware
  serverMiddleware: [
    {
      path: '/models',
      handler: '~/server-middleware/api.js',
    },
  ],
  toast: {
    position: 'top-right',
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Ocurrió un error al intentar recuperar los datos',
        options: {
          type: 'error',
          duration: 2000,
        },
      },
      {
        name: 'saved',
        message: 'El registro se ha guardado correctamente',
        options: {
          type: 'success',
          duration: 2000,
        },
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
