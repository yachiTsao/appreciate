/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composablestry {

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/:catchAll(.*)',
    //   redirect: '/'
    // },
    {
      path: "/",
      name: "home",
      component: () => import("../pages/index.vue"),
    },
    {
      path: "/function/one",
      name: "function one",
      component: () => import("../pages/FunctionOne.vue"),
    },
    {
      path: "/function/two",
      name: "function/two",
      component: () => import("../pages/FunctionTwo.vue"),
    },
    {
      path: "/function/three",
      name: "function three",
      component: () => import("../pages/FunctionThree.vue"),
    },
    {
      path: "/function/four",
      name: "function four",
      component: () => import("../pages/FunctionFour.vue"),
    },
    {
      path: "/function/five",
      name: "function five",
      component: () => import("../pages/FunctionFive.vue"),
    }
  ]
})

router.beforeEach(async (to) => {
  // if (to.meta && to.meta.name) {
  //   if (to.meta.name === 'Atlas 2.0') {
  //     document.title = 'Atlas 2.0'
  //   } else {
  //     document.title = to.meta.name + ' | Atlas 2.0'
  //   }
  // }
})

export default router