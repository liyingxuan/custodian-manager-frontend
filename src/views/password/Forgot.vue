<!--
  - /***************************************************************************************
  - * Copyright © 2014-2018 Ontology Foundation Ltd.
  - * All rights reserved.
  - *
  - * This software is supplied only under the terms of a license agreement,
  - * nondisclosure agreement or other written agreement with Ontology Foundation Ltd.
  - * Use, redistribution or other disclosure of any parts of this
  - * software is prohibited except in accordance with the terms of such written
  - * agreement with Ontology Foundation Ltd. This software is confidential
  - * and proprietary information of Ontology Foundation Ltd.
  - *
  - ****************************************************************************************/
  -
  -->

<template>
  <div class="forgot-pwd-container Grid">
    <div class="Grid Grid-cell Grid--justifyEnd">
      <svg-icon class="rectangle" iconClass="login-rectangle"/>
    </div>
    <div class="Grid-cell">
      <div class="forgot-pwd-form">
        <!--Login Email and Password-->
        <el-form
          v-if="!viewTips"
          autocomplete="on"
          :model="forgotPwdForm"
          :rules="forgotPwdRules"
          ref="forgotPwdForm"
          label-position="left"
          label-width="0px"
        >
          <h3 class="title">FORGOT PASSWORD</h3>

          <div class="input-tit">Email Address</div>
          <el-form-item prop="email">
            <el-input v-model="forgotPwdForm.email" autocomplete="on"/>
          </el-form-item>

          <div id="captchaBox"></div>

          <el-form-item class="el-forgot-pwd-btn">
            <el-button
              type="primary"
              :loading="loading"
              @click.native.prevent="handleForgotPwd"
            >Reset Password</el-button>
          </el-form-item>

          <div class="the-line"></div>

          <div class="sign-up-div">
            <router-link :to="{ name: 'login' }">Log in</router-link>
          </div>
        </el-form>

        <!--Check Email Tips-->
        <el-form
          v-else
          autocomplete="on"
          label-position="left"
          label-width="0px"
          class="authenticator-div"
        >
          <h3 class="title">PASSWORD RESET</h3>

          <div class="tips-txt">Please check your email for the password reset email.</div>

          <el-form-item class="el-forgot-pwd-btn">
            <el-button type="primary" :loading="loading" @click.native.prevent="toLogin">OK</el-button>
          </el-form-item>

          <div class="the-line"></div>

          <div class="sign-up-div">
            <router-link :to="{ name: 'login' }">Log in</router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { validateAccount } from "@/utils/rules";

export default {
  data() {
    return {
      forgotPwdForm: {
        email: "",
      },
      forgotPwdRules: {
        email: [{ required: true, trigger: "blur", validator: validateAccount }],
      },
      loading: false,
      viewTips: false,
    };
  },
  methods: {
    async handleForgotPwd() {
      await this.$refs.forgotPwdForm.validate();
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
        await this.$store.dispatch("forgotPassword", {
          data: { email: this.forgotPwdForm.email },
          geetest_challenge: geetestResult.geetest_challenge,
          geetest_validate: geetestResult.geetest_validate,
          geetest_seccode: geetestResult.geetest_seccode,
        });
        this.viewTips = true;
      } finally {
        this.loading = false;
      }
    },
    toLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../styles/mixin.scss";
@import "../../styles/variables.scss";

.Grid {
  display: flex;
}
.Grid-cell {
  flex: 1;
}
.Grid--justifyEnd {
  justify-content: flex-end;
}

.forgot-pwd-container {
  @include relative;
  background-color: $bg;
  .rectangle {
    width: 601px;
    height: 484px;
  }
  input {
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  }
  .el-input {
    border: 1px solid rgba(183, 200, 206, 0.5);
  }
  .el-input__inner {
    height: 40px;
    line-height: 40px;
  }
  .input-tit {
    color: $light_gray;
    font-size: 14px;
    margin-bottom: 8px;
  }
  .forgot-pwd {
    text-align: right;
  }
  .tips {
    font-size: 14px;
    color: white;
    margin-bottom: 10px;
  }
  .title {
    font-size: 38px;
    color: $custodian_manager_blue;
    font-family: OpenSans-Light, "PingFang SC", "微软雅黑", sans-serif;
    margin: 0 auto 100px auto;
    text-align: center;
    font-weight: 300;
    white-space: nowrap;
  }
  .tips-txt {
    font-size: 16px;
    font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
    line-height: 22px;
    margin-bottom: 20px;
  }
  .el-forgot-pwd-btn {
    background-color: white;
    width: 157px;
    text-align: center;
    margin: 50px auto 0;
  }
  .el-button {
    min-width: 157px;
    height: 36px;
    line-height: 10px;
    background: rgba(0, 120, 250, 1);
    border-radius: 18px;
    margin: 32px 0;
    font-size: 18px;
  }
  .forgot-pwd-form {
    .el-form {
      background-color: white;
      width: 584px;
      height: 484px;
      padding: 32px 116px;
    }
    .authenticator-div {
      .go-back-btn {
        margin-right: 15px;
        background-color: white;
        color: $custodian_blue;
        border: 1px solid rgba(0, 120, 250, 1);
      }
      .to-login-btn {
        margin-left: 15px;
      }
    }
  }
  .the-line {
    height: 1px;
    background-color: $disable_gray;
  }
  .sign-up-div {
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    color: $light_gray;
    a {
      color: $custodian_blue;
    }
  }
}
</style>
