import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
// import store from "";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import axios from "axios";
import vuejsStorage from "vuejs-storage";

// import vueSessionStorage from "vue-sessionstorage";

axios.defaults.baseURL = "https://demo-auth.merahputihacademy.com/api/v1";
axios.defaults.headers = {
  destination: "Banksoal",
  Accept: "application/json",
};
let app = createApp(App);

app.config.globalProperties.globalVar = "Hallo World";

app.use(router).use(vuejsStorage).mount("#app");

// app.config.globalProperties.$myGlobalVariable = "hallo dunia";
