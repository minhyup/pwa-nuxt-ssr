const path = require("path");
//import { InjectManifest, GenerateSW } from "workbox-webpack-plugin";

import WorkboxPlugin from "workbox-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";

console.log("cwd!!", process.cwd());

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "spa", // universal, spa
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static", // server, static
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
        // src: "https://ds.hanwhalife.io/pet.js",
        src: "/pet2.js",
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
    {
      src: "@/plugins/plugin-test.js",
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
    "@nuxtjs/proxy",
  ],

  /*
   ** Proxy
   ** See https://nuxtjs.org/faq/http-proxy/
   */
  // proxy: {
  //   "/api": {
  //     target: "http://localhost:5000",
  //     pathRewrite: {
  //       "^/api": "/",
  //     },
  //   },
  // },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "http://localhost:3000/api",
    //browserBaseURL: "/api",
    //proxy: true,
  },
  // axios: {
  //   baseURL: "http://localhost:3000",
  //   browserBaseURL: "/api",
  //   proxy: true,
  // },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    //plugins: [new GenerateSW({ swSrc: "./static/sw.js", swDest: "sw.js" })],
    plugins: [
      new ManifestPlugin({
        fileName: "asset-manifest.json",
      }),
      //new WorkboxPlugin.GenerateSW()
      // new WorkboxPlugin.InjectManifest({
      //   //swSrc: "./static/sw.js",
      //   swSrc: path.join(process.cwd(), "/static/sw.js"),
      //   swDest: path.join(process.cwd(), "/dist/sw.js"),
      //   exclude: [],
      //   // exclude: [
      //   //   /\.map$/,
      //   //   /manifest$/,
      //   //   /\.htaccess$/,
      //   //   /service-worker\.js$/,
      //   //   /sw\.js$/,
      //   // ],
      // }),
    ],
    // plugins: [
    //   // Other plugins...
    //   new GenerateSW(),
    // ],
  },
  pwa: {
    manifest: {
      name: "My minhyup",
      short_name: "MinHyupNuxtPwa",
      start_url: "/?utm_source=homescreen",
      display: "standalone",
    },
    workbox: {
      workboxURL: "/workbox/workbox-sw.js",
      //? 서비스워커 스크립트에 import 되는 추가 스크립트
      //importScripts: ["custom-sw.js"],
      importScripts: ["sw-test.js"],
      //? 페이지가 로드되면 자동 등록 여부
      autoRegister: true,
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
      // https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.3/workbox/workbox-core.prod.js
      config: {
        modulePathPrefix: "/workbox/",
      },
      //? 서비스워커 waiting 단계에서 스킵 여부
      skipWaiting: true,
      ///workboxExtensions: ["@/plugins/workbox-workbox-extension.js"],
      //workboxExtensions: ["@/plugins/sw-precache-register.js"],

      //! Precache - 서비스워커가 인스톨되고 있을 때 캐시스토리지에 파일 세트를 저장할 수 있는 기능
      //preCaching: ["icon.png", "dog.jpg"],
      //preCaching: ["_nuxt/asset-manifest.json"],
      cachingExtensions: ["@/plugins/workbox-precache-extension.js"],
      //? older preCache를 지울지 여부
      //cleanupOutdatedCaches: true,

      //! Runtime Caching
      //? runtimeCaching- 캐싱하기 위한 전략,  다른 origin에 요청들을 캐싱하는데 유용하다.
      //? https://developers.google.com/web/tools/workbox/modules/workbox-strategies
      runtimeCaching: [
        // {
        //   urlPattern: "/_nuxt/*",
        //   handler: "CacheFirst", // 네트워크 요청이 성공이면 캐시에 담아두고 네트워크 요청이 실패하면 캐시된 응답값을 사용한다.
        //   method: "GET",
        // },
        {
          urlPattern: "/*",
          handler: "NetworkFirst", // 네트워크 요청이 성공이면 캐시에 담아두고 네트워크 요청이 실패하면 캐시된 응답값을 사용한다.
          method: "GET",
        },
      ],
      // routingExtensions: ["@/plugins/workbox-routing-extension.js"],
      //offlineAssets: ["_nuxt/*"],
      // //? /_nuxt/*에 캐시 first로 요청한다.
      cacheAssets: true,
      // //? 에셋 URL 패턴을 적는거고 디폴트는: /_nuxt/
      // assetsURLPattern: "/_nuxt/",
    },
  },
};
