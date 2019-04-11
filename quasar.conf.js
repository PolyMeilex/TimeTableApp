module.exports = function (ctx) {
  return {
    boot: [
      'addressbar-color.js'
    ],

    css: [
      'app.css'
    ],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    framework: {
      lang: 'pl',
      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QCard',
        'QCardSection',
        'QTabs',
        'QTab',
        'QTabPanels',
        'QTabPanel',
        'QSelect',
        'QRadio'
      ],

      directives: [
        'Ripple',
        'TouchRepeat'
      ],

      plugins: [
        // 'Notify',
        'AddressbarColor'
      ]
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
      }
    },

    devServer: {
      // https: false,
      port: 8080,
      open: true
    },

    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'Plan Lekcji',
        short_name: 'Plan',
        
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#191919',
        theme_color: '#242323',
        icons: [
          {
            'src': 'statics/icons/android-icon-36x36.png',
            'sizes': '36x36',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-48x48.png',
            'sizes': '48x48',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-72x72.png',
            'sizes': '72x72',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-96x96.png',
            'sizes': '96x96',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-144x144.png',
            'sizes': '144x144',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'tk.poly.ekolib'
    },

    electron: {}
  }
}
