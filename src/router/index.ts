/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composablestry {

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/:catchAll(.*)',
    //   redirect: '/'
    // },
    {
      path: "/",
      name: "landing page",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/list",
      name: "list",
      component: () => import("../pages/List.vue"),
    },
    {
      path: "/overview",
      name: "overview",
      component: () => import("../pages/Overview.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../pages/Contact.vue"),
    }
  ],
});

router.beforeEach(async (to) => {
  // if (to.meta && to.meta.name) {
  //   if (to.meta.name === 'Atlas 2.0') {
  //     document.title = 'Atlas 2.0'
  //   } else {
  //     document.title = to.meta.name + ' | Atlas 2.0'
  //   }
  // }
});

export default router;
