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
  <div class="login-container Grid">
    <div class="Grid Grid-cell Grid--justifyEnd">
      <svg-icon class="rectangle" iconClass="login-rectangle"/>
    </div>
    <div class="Grid-cell">
      <div class="login-form">
        <router-view></router-view>

        <div class="help-div">
          <p>{{ $t("login.contactUsTit") + $t("login.contactUsTxt") }}</p>
          <p>{{ $t("login.emailTit") + $t("login.emailTxt") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style rel="stylesheet/scss" lang="scss">
@import "../../styles/mixin.scss";
@import "../../styles/variables.scss";

.Grid {
  display: flex;
}
.Grid-cell {
  flex: 1;
}
.Grid--justifyCenter {
  justify-content: center;
}
.Grid--justifyEnd {
  justify-content: flex-end;
}

.login-container {
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
  .grid-logo-fix > svg {
    margin-top: 10px;
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
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: white;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 38px;
    color: $custodian_manager_blue;
    font-family: OpenSans-Light, "PingFang SC", "微软雅黑", sans-serif;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: 300;
  }
  .el-login-btn {
    background-color: white;
    width: 157px;
    text-align: center;
    margin: 0 auto;
  }
  .el-button {
    width: 157px;
    height: 36px;
    line-height: 10px;
    background: rgba(0, 120, 250, 1);
    border-radius: 18px;
    margin: 32px 0;
    font-size: 18px;
  }
  .login-form {
    .el-form {
      background-color: white;
      width: 584px;
      height: 484px;
      padding: 32px 116px;
    }
    .help-div {
      width: 584px;
      text-align: center;
      margin-top: 18px;
      p {
        font-size: 14px;
        font-family: OpenSans, "PingFang SC", "微软雅黑", sans-serif;
        color: rgba(95, 106, 118, 1);
      }
    }
    .ga-el-input {
      width: 11%;
      margin: 16px 2% 102px;
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
}
</style>
