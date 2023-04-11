import { createRouter, createWebHistory } from "vue-router";
import useUserStores from "@/stores/user";

const Home = () => import("@/views/Home.vue");
const About = () => import("@/views/AboutView.vue");
const Manage = () => import("@/views/Manage.vue");
const Song = () => import("@/views/Song.vue");

const routes = [
  {
    name: "home",
    //represents the part of the URL after the domain
    path: "/", //example.com/eg
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "manage",
    //使用别名可以避免重定向
    // alias: "/manage",
    path: "/manage-music",
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log("Manage Route Guard");
      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
  {
    //将用户输出跳转的任何不存在的path重定向到home
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  // the import meta object contains informations on the current module
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

//全局守卫
router.beforeEach((to, from, next) => {
  /*to is an object contains informations about where the user
  is navigating to 
  from is an object contains informations about where the user
  is navigating from
  if next hasn't be called router will not render the component
  */
  // console.log(to.meta);

  //跳转的路由检查是否需要身份验证
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStores();
  //检验进入manage界面的权限
  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
