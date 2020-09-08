export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal", // universal, spa
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server", // server, static
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://ds.hanwhalife.io/pet.js",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: "@/plugins/sw-plugin.js",
      ssr: false,
    },
    {
      src: "@/plugins/user-element.js",
      ssr: false,
    },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  pwa: {
    manifest: {
      name: "My minhyup",
      short_name: "MinHyupNuxtPwa",
      start_url: "/?utm_source=homescreen",
      display: "standalone",
      // prefer_related_applications: true,
      // related_applications: [
      //   {
      //     platform: "play",
      //     id: "com.google.samples.apps.iosched"
      //   }
      // ]
      // background_color: "#000"
    },
    workbox: {
      // https://pwa.nuxtjs.org/workbox
      // https://github.com/nuxt-community/pwa-module/blob/dev/lib/workbox/defaults.js
      //! General
      //? 워크박스의 버전
      workboxVersion: require("workbox-cdn/package.json").version,
      //? 워크박스 CDN URL이고 디폴트 값은 JSDelivr이다.
      // workboxURL: undefined,
      //? 서비스워커 스크립트에 import 되는 추가 스크립트
      importScripts: ["custom-sw.js"],

      //? 페이지가 로드되면 자동 등록 여부
      autoRegister: true,
      // dev: undefined,
      //? 워크박스 모듈 활성화 여부. 워크박스는 기본적으로 프로덕션 모드에서 활성화 되어 있다. build -> start 권장
      // enabled: (boolean)
      //? cachenames를 설정한다. (https://developers.google.com/web/tools/workbox/guides/configure-workbox#configure_cache_names)
      cacheNames: {
        //? prefix-runtime-suffix 순서
        prefix: "my-minhyup-app",
        suffix: "v2",
        precache: "custom-precache",
        runtime: "custom-runtime",
      },

      //! Config
      //? 워크박스 모듈을 사용하기전, 워크박스에 통과되기 위한 옵션
      // config: {},
      //? activate 되자마자 존재하는 클라이언트를 컨트롤 시작 여부
      // clientsClaim: true,
      //? 서비스워커 waiting 단계에서 스킵 여부
      skipWaiting: true,
      //? 워크박스를 통해 오프라인 GA 활성화
      // offlineAnalytics: false,
      //?
      // workboxExtensions: [],

      //! Precache - 서비스워커가 인스톨되고 있을 때 캐시스토리지에 파일 세트를 저장할 수 있는 기능
      //? 서비스 워커가 등록되고 있을 때, 캐시할 파일세트
      preCaching: ["icon.png", "dog.jpg"],
      // cacheOptions: {
      //   cacheId: "123",
      //   directoryIndex: "/",
      //   revision: "123",
      // },
      // cachingExtensions: [],
      //? older preCache를 지울지 여부
      cleanupOutdatedCaches: true,

      //! Offline
      //? 모든 라우트를 캐시할지 여부
      // offline: true,
      //? 라우트 캐싱을 위한 전략
      // offlineStrategy: 'NetworkFirst',
      //? 모든 오프라인 리퀘스트 라우팅을 활성화한다.(string 타입)
      // offlinePage: null,
      //? 프리캐시할 에셋들의 리스트
      // offlineAssets: [],

      //! Runtime Caching
      //? runtimeCaching- 캐싱하기 위한 전략,  다른 origin에 요청들을 캐싱하는데 유용하다.
      //? https://developers.google.com/web/tools/workbox/modules/workbox-strategies
      runtimeCaching: [
        {
          // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
          urlPattern: "https://picsum.photos/536/354/.*",
          // Defaults to `NetworkFirst` if omitted
          handler: "NetworkFirst",
          // Defaults to `GET` if omitted
          method: "GET",
        },
        // TODO: Test Case 1
        {
          urlPattern: "/*",
          handler: "NetworkFirst", // 네트워크 요청이 성공이면 캐시에 담아두고 네트워크 요청이 실패하면 캐시된 응답값을 사용한다.
          method: "GET",
        },
        // TODO: Test Case 2
        // {
        //   urlPattern: "/*",
        //   strategyOptions: {
        //     cacheName: "minhyup_v2",
        //     cacheExpiration: {
        //       maxEntries: 10,
        //       maxAgeSeconds: 300
        //     }
        //   }
        // }
        // TODO:Adding custom runtimeCaching itmes(For CDN)
        // {
        //   // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
        //   urlPattern: 'https://my-cdn.com/.*',
        //   // Defaults to `NetworkFirst` if omitted
        //   // handler: 'NetworkFirst',
        //   // Defaults to `GET` if omitted
        //   // method: 'GET'
        // }
        // TODO: Adding custom cache
        // {
        //   urlPattern: "https://my-cdn.com/posts/.*",
        //   strategyOptions: {
        //     cacheName: "our-cache",
        //     cacheExpiration: {
        //       maxEntries: 10,
        //       maxAgeSeconds: 300
        //     }
        //   }
        // }
      ],
      // routingExtensions: [],
      //? /_nuxt/*에 캐시 first로 요청한다.
      cacheAssets: true,

      //? 에셋 URL 패턴을 적는거고 디폴트는: /_nuxt/
      assetsURLPattern: "/_nuxt/icons/",
      // pagesURLPattern: undefined,

      //! Service Worker
      //? 생성된 sw.js 를 커스터마이징하기 위해 사용할 수 있다.
      // swTemplate: undefined,
      //? 만약 다른 서비스 워커를 사용하길 원하면 사용할 수 있다.(string)
      // swUrl: undefined,
      // swScope: undefined,
      //? 만약 service worker의 이름을 바꾸길 원한다면 swURL과 함께 이 옵션을 사용해야한다.(string)
      // swDest: undefined,

      //! Router
      // routerBase: undefined,
      // publicPath: undefined
    },
  },
};
