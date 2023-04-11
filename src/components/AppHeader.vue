<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- RouterLink to 接受一个字符串或者是对象 -->
      <!-- 当是字符串的时候，vue期望它的值是一个路径 -->
      <!-- 使用对象的时候 期望是使用名字来替代路径 -->
      <!-- 使用名字的优势是在修改path时候不需要在多个vue文件当中修改 并且具有更好的可读性
      -->
      <!-- App Name -->
      <router-link
        :to="{ name: 'home' }"
        class="text-white font-bold uppercase text-2xl mr-4"
        exact-active-class="no-active"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link :to="{ name: 'about' }" class="px-2 text-white">
              About
            </router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link :to="{ name: 'manage' }" class="px-2 text-white"
                >Manage</router-link
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut"
                >Logout</a
              >
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale"
              >{{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore),
    //另一种解决方法，这样就可以直接通过this 访问modal 这个store
    // ...mapWritableState(useModalStore,["isOpen"])
    currentLocale() {
      return this.$i18n.locale === "zh" ? "Chinese" : "English";
    },
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    signOut() {
      this.userStore.signOut();
      //通过$router访问路由
      //push方法重定向页面

      //this.$route 表示当前的路由对象。每一个路由都有一个 route 对象，它是一个局部的对象，可以获取当前路由对应的 name , params, path , query 等属性。
      if (this.$route.meta.requiresAuth) {
        //this.$router 相当于一个全局的路由对象，包含路由相关的属性、对象 (如 history 对象) 和方法，在任何页面都可以通过 this.$router 调用其方法如 push() 、go() 、resolve() 等。
        this.$router.push({ name: "home" });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "zh" ? "en" : "zh";
    },
  },
};
</script>
