console.log("workbox-routing-request!!");
console.log(this.workbox);
console.log(this.workbox.strategies);
console.log(this.workbox.backgroundSync.BackgroundSyncPlugin);
const { BackgroundSyncPlugin } = this.workbox.backgroundSync;
const { NetworkFirst } = this.workbox.strategies;
const { NetworkOnly } = this.workbox.strategies;
console.log(BackgroundSyncPlugin);

// const { precacheAndRoute } = this.workbox.precaching;

// console.log("self 여기는 라우팅:::", self.__precacheManifest);
// console.log("self self.__WB_MANIFEST:::", self.__WB_MANIFEST);
// precacheAndRoute(self.__WB_MANIFEST);

// What is Workbox Background Sync?
// When you send data to a web server, sometimes the requests will fail. It may be because the user has lost connectivity, or it may be because the server is down; in either case you often want to try sending the requests again later.

// The new BackgroundSync API is an ideal solution to this problem. When a service worker detects that a network request has failed, it can register to receive a sync event, which gets delivered when the browser thinks connectivity has returned. Note that the sync event can be delivered even if the user has left the application, making it much more effective than the traditional method of retrying failed requests.

// Workbox Background Sync is designed to make it easier to use the BackgroundSync API and integrate its usage with other Workbox modules. It also implements a fallback strategy for browsers that don't yet implement BackgroundSync.

// Browsers that support the BackgroundSync API will automatically replay failed requests on your behalf at an interval managed by the browser, likely using exponential backoff between replay attempts. In browsers that don't natively support the BackgroundSync API, Workbox Background Sync will automatically attempt a replay whenever your service worker starts up.

const bgSyncPlugin = new BackgroundSyncPlugin("myQueueName", {
  //const bgSyncPlugin = workbox.backgroundSync("myQueueName", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

workbox.routing.registerRoute(
  ({ url, request, event }) => {
    console.log("match callback?", url, request, event);
    return true;
  },
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  // new NetworkOnly({
  //   plugins: [bgSyncPlugin],
  // }),
  // ({ url, request, event, params }) => {
  //   console.log("handle callback?", url, request, event, params);
  //   return new NetworkOnly({
  //     plugins: [bgSyncPlugin],
  //   });
  // },
  // new NetworkFirst({
  //   plugins: [bgSyncPlugin],
  // }),
  "POST"
);

// workbox.routing.registerRoute(
//   ({ url, request, event }) => {
//     console.log("match callback?", url, request, event);
//   },
//   (a, b, c) => {
//     console.log("handle callback?", a, b, c);
//   },
//   "POST"
// );
