import Vue from "vue";
import App from "./components/App.vue";

Vue.component("navbar", require("./components/Header.vue").default);
Vue.component("footer-site", require("./components/Footer.vue").default);
Vue.component("content-principal", require("./components/Content.vue").default);

new Vue({
  render: h => h(App)
}).$mount("#app");
