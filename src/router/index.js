import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/HomeView.vue";
import ProductDetail from "@/components/ProductDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
