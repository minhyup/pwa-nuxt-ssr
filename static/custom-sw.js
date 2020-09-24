console.log("custom!!! js!!! static", "serviceWorker" in navigator);
console.log("custom!!", self);
const { precacheAndRoute } = this.workbox.precaching;
console.log("self custom:::", self.__precacheManifest);
console.log("self self.custom:::", self.__WB_MANIFEST);
precacheAndRoute(self.__WB_MANIFEST);
