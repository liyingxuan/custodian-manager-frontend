<template>
  <el-form
    autocomplete="on"
    :model="loginForm"
    :rules="loginRules"
    ref="loginForm"
    label-position="left"
    label-width="0px"
  >
    <h3 class="title">{{ $t("login.title") }}</h3>

    <div class="input-tit">Email Address</div>
    <el-form-item prop="email">
      <el-input v-model="loginForm.email" autocomplete="on"/>
    </el-form-item>

    <div class="input-tit">Password</div>
    <el-form-item prop="password">
      <el-input
        type="password"
        @keyup.enter.native="handleLogin"
        v-model="loginForm.password"
        autocomplete="on"
      ></el-input>
    </el-form-item>

    <div id="captchaBox"></div>

    <div class="input-tit forgot-pwd">
      <router-link :to="{ name: 'forgot-password' }">Forgot Password</router-link>
    </div>

    <el-form-item class="el-login-btn">
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="handleLogin"
      >{{ $t("login.logIn") }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validateAccount } from "@/utils/rules";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      loginRules: {
        email: [{ required: true, trigger: "blur", validator: validateAccount }],
        password: [{ required: true, trigger: "blur", message: "Please input password" }],
      },
      loading: false,
    };
  },
  computed: {
    myInfo() {
      return this.$store.getters.myInfo || {};
    },
  },
  methods: {
    async handleLogin() {
      if (this.loading) {
        return;
      }
      await this.$refs.loginForm.validate();
      try {
        this.loading = true;
        const result = await this.$store.dispatch("getCaptchaCode");
        const geetestParams = {
          gt: result.gt,
          challenge: result.challenge,
          offline: !result.success,
          new_captcha: true,
          product: "popup",
          width: "352px",
          lang: "en",
        };
        const geetestResult = await new Promise((resolve, reject) => {
          window.initGeetest(geetestParams, captchaObj => {
            captchaObj
              .appendTo("#captchaBox")
              .onSuccess(() => {
                resolve(captchaObj.getValidate());
                captchaObj.destroy();
              })
              .onError(error => {
                reject(error);
                captchaObj.destroy();
              });
          });
        });
        await this.$store.dispatch("managerLogin", {
          data: this.loginForm,
          geetest_challenge: geetestResult.geetest_challenge,
          geetest_validate: geetestResult.geetest_validate,
          geetest_seccode: geetestResult.geetest_seccode,
        });
        this.$router.push({ name: "ga-verify", query: { redirect: this.$route.query.redirect } });
      } catch (error) {
        if (error && error.__apiError) {
          switch (error.code) {
            case 62002: // incorrect password
              this.$message.error(
                `Account password is wrong ( try ${error.result.failed_login} of 5 ) `,
              );
              return;
          }
        }
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
