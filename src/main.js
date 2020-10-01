import Vue from "vue";
import App from "./App";

import * as filters from "./utils/filters";

Object.keys(filters).forEach((key) => {
  // console.log(filters[key]);
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
