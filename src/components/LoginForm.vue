<template>
  <div>
    <div
      class="text-white text-center font-bold p-4 mb-4"
      v-if="log_show_alert"
      :class="log_alert_variant"
    >
      {{ log_alert_msg }}
    </div>
    <!-- Login Form -->
    <vee-form :validation-schema="loginSchema" @submit="login">
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
          name="email"
        />
        <ErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <!-- bails告诉veevaliduate 不要使用快速退出策略（即检测到错误就爆出，而不是继续检查） -->
        <vee-field name="password" :bails="false" #default="{ field, errors }">
          <input
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
            :="field"
          />
          <div
            name="password"
            class="text-red-600"
            v-for="error in errors"
            :key="error"
          >
            {{ error }}
          </div>
        </vee-field>
      </div>
      <button
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
        :disabled="log_in_submission"
      >
        Submit
      </button>
    </vee-form>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import userUserStore from "@/stores/user";

export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:9|max:100",
      },
      //表单提交的时候禁用表单，防止过多的请求
      log_in_submission: false,
      //切换提示的可见性
      log_show_alert: false,
      //改变颜色
      log_alert_variant: "bg-blue-500",
      //信息
      log_alert_msg: "Please wait! We are logging you in.",
    };
  },
  methods: {
    ...mapActions(userUserStore, ["authenticate"]),

    async login(values) {
      console.log(values);
      this.log_in_submission = true;
      this.log_show_alert = true;
      this.log_alert_variant = "bg-blue-500";
      this.log_alert_msg = "Please wait! We are logging you in";
      try {
        await this.authenticate(values);
      } catch (error) {
        this.log_in_submission = false;
        this.log_alert_variant = "bg-red-500";
        this.log_alert_msg = "Invalid login details.";
        return;
      }

      this.log_alert_variant = "bg-green-500";
      this.log_alert_msg = "Success! You are now logging in.";

      window.location.reload();
    },
  },
};
</script>
