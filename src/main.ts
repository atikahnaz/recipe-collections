import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { createPinia } from "pinia";

// Create the Vue app
const pinia = createPinia();
const app = createApp(App);

// Use PrimeVue with Aura theme
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(pinia);
// Mount the app
app.mount("#app");
