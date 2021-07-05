import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// bootstrap
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../src/assets/css/bootstrapCustom.scss";
// global style
import "../src/assets/css/global.scss";
// font-awesome
import "../node_modules/font-awesome/scss/font-awesome.scss";
// img lazyload
import imgLazyLoad from "vue3-lazy";
const app = createApp(App);
// use img lazyload
app.use(imgLazyLoad, {});
// use router
app.use(router);
// mount app
app.mount("#app");
