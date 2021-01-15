import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import OrderPage from '@/pages/OrderPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id/:colorId?' },
  { name: 'cart', component: CartPage, path: '/cart/' },
  { name: 'order', component: OrderPage, path: '/order/' },
  { name: 'notFoundpage', component: NotFoundPage, path: '*' },
];

const router = new VueRouter({
  routes,
});

export default router;
