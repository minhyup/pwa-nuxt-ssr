<template>
  <div class="container">
    <div>
      <Logo />
      <img src="/icon2.png" />
      <global-component>
        <h1>칠드런입니다!</h1>
      </global-component>
      <!-- <TodoItem /> -->
      <lpp-button size="large" @click="test"> API 테스트</lpp-button>
      <lpp-button size="large" @click="test2"> API2 테스트</lpp-button>
      <lpp-button size="large" @click="test3"> API3(POST) 테스트</lpp-button>
      <lpp-button size="large" @click="test4"> API4(POST) 테스트</lpp-button>
      <hr />

      <div style="width: 500px; background-color: red;">
        <lpp-button size="large" shape="round" block>버튼 테스트</lpp-button>
      </div>

      <lpp-button type="filled">버튼</lpp-button>
      <lpp-button>
        <p class="subject">반려견 입양하기</p>
      </lpp-button>
      <button>
        <p class="subject">반려견 입양하기</p>
      </button>
      <lpp-button
        type="filled"
        size="large"
        consist="textIcon"
        icon="arrowWhite"
        style="width:500px; height:500px;"
        disabled
        >버튼</lpp-button
      >
      <Button><p class="subject">반려견 입양하기</p></Button>
      <hr />
      <h1 class="title">
        NUXT로 PWA, SSR 테스트중.
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
        <nuxt-link to="/about">About page</nuxt-link>
        <nuxt-link to="/login">login page</nuxt-link>
        <nuxt-link to="/test">test page</nuxt-link>
        <nuxt-link to="/minhyup">minhyup page</nuxt-link>
        <a href @click.prevent="linkPage">프로그래밍 방식 링크</a>
        <!-- <a href="/test2">test2</a> -->

        <span> by min hyup!! </span>
        <span> by min hyup!! </span>
        <img src="@/assets/test.PNG" />
        <img src="/react1.jpg" />
      </div>

      <button class="add-button">Add to home screen</button>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `head = ${this.title}`
    };
  },
  methods: {
    linkPage() {
      this.$router.push(`/test3`);
    },
    async test() {
      const { data } = await this.$axios.get("/listData");
      console.log(data);
      //alert('누르셨습니까????');
    },
    async test2() {
      const { data } = await this.$axios.get("/listData2");
      console.log(data);
      //alert('누르셨습니까????');
    },
    async test3(){
      const { data } = await this.$axios.post('http://localhost:5000/listData2');
      console.log(data);
      //alert('누르셨습니까????');
    },
    async test4(){
      const { data } = await this.$axios.post('http://localhost:5000/listData');
      console.log(data);
      //alert('누르셨습니까????');
    }
  },
  // asyncData () {
  //   return new Promise((resolve) => {
  //     setTimeout(function () {
  //       resolve({ name: 'world' })
  //     }, 5000)
  //   })
  // },
  async asyncData({ app, $axios }) {
    console.log("async Data::::");
    app.myInjectedFunction2("async Data~~~~~~! log");

    //const {data} = await $axios.get('/headData');
    //const {data} = await $axios.get('/headData');
    //console.log(data);
    return {
      //title: data.title
      title: "aaa"
    };
  },
  async mounted() {
    console.log("mounted!!");
    this.$injectFunction("mount zzzzz");

    let deferredPrompt;
    const addBtn = document.querySelector(".add-button");
    addBtn.style.display = "none";

    self.addEventListener("beforeinstallprompt", e => {
      // e.preventDefault();
      // deferredPrompt = e;
      // alert("prompt 전");
      // console.log(deferredPrompt);
      // //DOMException: Failed to execute 'prompt' on 'BeforeInstallPromptEvent': The prompt() method must be called with a user gesture
      // deferredPrompt.prompt();
      // deferredPrompt.userChoice.then(choiceResult => {
      //   if (choiceResult.outcome === "accepted") {
      //     console.log("User accepted the A2HS prompt");
      //   } else {
      //     console.log("User dismissed the A2HS prompt");
      //   }
      //   deferredPrompt = null;
      // });
      // Prevent Chrome <= 67 from automatically showing the prompt
      // Prevent the mini-infobar from appearing on mobile
      // 이상해...
      e.preventDefault();
      console.log("beforeinstallprompt 이벤트 발생!!!!");
      //deferredPrompt = e;
      window.promptEvent = e;
      addBtn.style.display = "block";
      console.log("deferredPrompt", deferredPrompt);
      addBtn.addEventListener("click", e => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = "none";
        // Show the modal add to home screen dialog
        console.log("내가추가한 프롬트 !");
        //const retV = deferredPrompt.prompt();
        window.promptEvent.prompt();
        //console.log(retV);
        // Wait for the user to respond to the prompt
        //deferredPrompt.userChoice.then(choiceResult => {
        window.promptEvent.userChoice.then(choiceResult => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          //deferredPrompt = null;
          window.promptEvent = null;
        });
      });
    });

    //Detect when the PWA was successfully installed
    window.addEventListener("appinstalled", evt => {
      // Log install to analytics
      console.log("success event", evt);
      console.log("INSTALL: Success");
    });

    //Track how the PWA was launched
    window.addEventListener("DOMContentLoaded", () => {
      let displayMode = "browser tab";
      if (navigator.standalone) {
        displayMode = "standalone-ios";
      }
      if (window.matchMedia("(display-mode: standalone)").matches) {
        displayMode = "standalone";
      }
      // Log launch display mode to analytics
      console.log("DISPLAY_MODE_LAUNCH:", displayMode);
    });

    //Track when the display mode changes
    window.addEventListener("DOMContentLoaded", () => {
      window.matchMedia("(display-mode: standalone)").addListener(evt => {
        let displayMode = "browser tab";
        if (evt.matches) {
          displayMode = "standalone";
        }
        // Log display mode change to analytics
        console.log("DISPLAY_MODE_CHANGED", displayMode);
      });
    });

    console.log("aaaaaaaaaa", window.$workbox);
    const workbox = await window.$workbox;
    console.log("workbox:::", workbox);
    if (workbox) {
      console.log("workbox is valid");
      workbox.addEventListener("installed", event => {
        // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
        console.log("event::", event);
        alert("installed!!");

        if (event.isUpdate) {
          // whatever logic you want to use to notify the user that they need to refresh the page.
          console.log("event.isUpdate!!");
          alert("앱이 업데이트 되었습니다.");
        }
      });

      // message
      // installed
      // waiting
      // controlling
      // activated
      // redundant
      // externalinstalled
      // externalwaiting
      // externalactivated
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.add-button {
  position: absolute;
  top: 1px;
  left: 1px;
  font-size: 32px;
  color: red;
}
</style>
