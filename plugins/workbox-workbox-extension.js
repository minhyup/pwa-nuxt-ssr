console.log("workbox-workbox-request!!", self);
const { precacheAndRoute } = this.workbox.precaching;

console.log("self precacheAndRoute:::", self.__precacheManifest);
console.log("self self.__WB_MANIFEST:::", self.__WB_MANIFEST);
//precacheAndRoute(self.__WB_MANIFEST);
//precacheAndRoute([{ url: "icon2.png", revision: "383676" }]);
