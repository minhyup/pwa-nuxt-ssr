import Vue from "vue";
import GlobalComponent from "@/components/global-component";
import Button from "@/components/general/Button";
Vue.component(Button.name, Button);
Vue.component(GlobalComponent.name, GlobalComponent);

// Vue.component(
//   "minhyup",
//   props: {
//     minhyup: {
//       type: Object,
//       required: false,
//     },
//   },
//   template: `
//     <input
//       :value="minhyup.text"
//       @input="$emit('input', $event.target.value)"
//     >
//   `
// );

// Vue.component("TodoItem", {
//   template: `
//     <div>
//       <h1>hello</h1>
//     </div>
//   `,
// });
