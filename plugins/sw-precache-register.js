console.log("static sw-testt!!", self);
const { precacheAndRoute } = this.workbox.precaching;
console.log(self.__WB_MANIFEST);
console.log(self.__precacheManifest);
precacheAndRoute(self.__WB_MANIFEST || []);
