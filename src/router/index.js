import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import LogoutPage from '../views/LogoutPage.vue';

Vue.use(VueRouter);

const checkAuthentication = (to, from, next) => {
  if (!Vue.prototype.$session.get('loginStatus')) {
    next('/login');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      layout: 'OutsideLayout',
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutPage,
    meta: {
      layout: 'OutsideLayout',
    },
  },
  {
    path: '/',
    name: 'NacPage',
    component: () => import(/* webpackChunkName: "NacPage" */ '../views/NacPage.vue'),
    meta: {
      layout: 'InsideLayout',
    },
    beforeEnter: checkAuthentication,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
