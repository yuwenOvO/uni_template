import { createSSRApp } from "vue";
import App from "./App.vue";

import "virtual:uno.css";

import store from "./store";
import {
  prototypeInterceptor,
  requestInterceptor,
  routeInterceptor,
} from "./interceptors";
import i18n from "./locale/index";

export function createApp() {
  const app = createSSRApp(App);

  app.use(store);
  app.use(i18n);
  app.use(prototypeInterceptor);
  app.use(requestInterceptor);
  app.use(routeInterceptor);
  return {
    app,
  };
}
