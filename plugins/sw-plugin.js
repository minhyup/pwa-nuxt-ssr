console.log(window);
console.log(navigator);
if ("serviceWorker" in navigator) {
  console.log("서비스워커 오키 plugin");
  // navigator.serviceWorker.getRegistrations().then((registrations) => {
  //   for (const worker of registrations) {
  //     console.log('Service worker:', worker)
  //   }
  // });
} else {
  console.log("서비스워커 미지원 plugin");
}

// alert("beforeinstallprompt 이벤트 등록 전!");
// self.addEventListener("beforeinstallprompt", e => {
//   alert("beforeinstallprompt 최초진입!!!!");
//   e.preventDefault();
//   deferredPrompt = e;
//   console.log("deferredPrompt", deferredPrompt);
//   alert("beforeinstallprompt!!!!");
// });

if (process.client) {
  console.log("sw-plugin 입니다.");
  const cacheName = `my-minhyup-app-custom-runtime-v2`;
  caches.keys().then(keyList => {
    return Promise.all(
      keyList.map(key => {
        console.log(key);
        console.log(cacheName);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      })
    );
  });
}
