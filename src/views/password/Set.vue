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
  <div class="reset-pwd-container Grid">
    <div class="Grid Grid-cell Grid--justifyEnd">
      <svg-icon class="rectangle" iconClass="login-rectangle"/>
    </div>
    <div class="Grid-cell">
      <div class="new-pwd-form">
        <!--Login Email and Password-->
        <el-form
          autocomplete="on"
          :model="newPwdForm"
          :rules="newPwdRules"
          ref="newPwdForm"
          label-position="left"
          label-width="0px"
        >
          <h3 class="title">SET PASSWORD</h3>

          <div class="input-tit">New Password</div>
          <el-form-item prop="password">
            <el-input type="password" v-model="newPwdForm.password" autocomplete="on"></el-input>
          </el-form-item>

          <div class="input-tit">Confirm New Password</div>
          <el-form-item prop="confirmPwd">
            <el-input type="password" v-model="newPwdForm.confirmPwd" autocomplete="on"></el-input>
          </el-form-item>

          <el-form-item class="el-reset-pwd-btn">
            <el-button type="primary" :loading="loading" @click.native.prevent="handleResetPwd">Set</el-button>
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
import { validatePassword } from "@/utils/rules";
import { validatePassword as validatePwd } from "@/utils/validate";

export default {
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (!validatePwd(value)) {
        callback(new Error("The password is invalid"));
      } else {
        if (value !== this.newPwdForm.password) {
          callback(new Error("Two passwords are inconsistent"));
        } else {
          callback();
        }
      }
    };

    return {
      newPwdForm: {
        password: "",
        confirmPwd: "",
      },
      newPwdRules: {
        password: [{ required: true, trigger: "blur", validator: validatePassword }],
        confirmPwd: [{ required: true, trigger: "blur", validator: validateConfirmPassword }],
      },
      loading: false,
    };
  },
  methods: {
    async handleResetPwd() {
      await this.$refs.newPwdForm.validate();
      try {
        this.loading = true;
        await this.$store.dispatch("setPassword", {
          data: this.newPwdForm,
          token: this.$route.params.token,
        });
        this.$message.success("Success");
        this.$router.push({ name: "login" });
      } finally {
        this.loading = false;
      }
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

.reset-pwd-container {
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
    margin: 0 auto 30px auto;
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
  .el-reset-pwd-btn {
    background-color: white;
    width: 157px;
    text-align: center;
    margin: 0 auto;
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
  .new-pwd-form {
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
