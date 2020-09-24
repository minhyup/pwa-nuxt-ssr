// const fs = require("fs");

// fs.readdirSync("/").forEach((file) => {
//   console.log("file!!", file);
// });

// console.log("workbox-cache-request!!", self);
// const { precacheAndRoute } = this.workbox.precaching;
// console.log(precacheAndRoute);
// console.log("self cache:::", self.__precacheManifest);
// console.log("self self.__WB_MANIFEST:::", self.__WB_MANIFEST);
// precacheAndRoute(self.__WB_MANIFEST || []);
// //precacheAndRoute([{ url: "icon2.png", revision: "383676" }]);

//import { PrecacheController } from "workbox-precaching";
const { PrecacheController } = this.workbox.precaching;
console.log("precache start");
const precacheController = new PrecacheController();
const curl = precacheController.getCachedURLs();
console.log(curl);
precacheController.addToCacheList([
  { url: "_nuxt/asset-manifest.json", revision: null },
]);
const curl2 = precacheController.getCachedURLs();
console.log(curl2);

// precacheController.addToCacheList([
//   {
//     url: "/index.html",
//     revision: "abcd",
//   },
//   {
//     url: "/about.html",
//     revision: "1234",
//   },
// ]);

const test = async () => {
  const response = await precacheController.matchPrecache(
    "_nuxt/asset-manifest.json"
  );
  console.log("resonse install !!!", response);
};

//test();

self.addEventListener("install", async (event) => {
  console.log("precache controller install!!!!!!!!!!!!!!!!!!!!!!!!", event);
  // const response = await precacheController.matchPrecache(
  //   "_nuxt/asset-manifest.json"
  // );
  // console.log("resonse install22 !!!", response);
  event.waitUntil(precacheController.install());
  //event.waitUntil(caches.match(''))
});

self.addEventListener("activate", async (event) => {
  console.log("precache controller activate!!!!!!!!!!!!!!!!!!!!!!!!", event);
  event.waitUntil(precacheController.activate());
  const response = await precacheController.matchPrecache(
    "_nuxt/asset-manifest.json"
  );
  console.log("resonse!!!", response);

  precacheController.addToCacheList([{ url: "dog.png", revision: null }]);
});

self.addEventListener("fetch", (event) => {
  console.log("precache controller fetch!!!!!!!!!!!!!!!!!!!!!!!!", event);
  // const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
  // event.respondWith(caches.match(cacheKey).then(...));
});
