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
  <div class="app-wrapper">
    <div class="header">
      <nav-bar-not-login></nav-bar-not-login>
    </div>
    <div class="middle-area">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

    <div class="footer">
      <f></f>
    </div>
  </div>
</template>

<script>
import { NavBarNotLogin, Footer as F } from "@/views/layout/components";

export default {
  name: "layout",
  components: {
    NavBarNotLogin,
    F,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/mixin.scss";
@import "../../styles/variables.scss";

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // footer will at bottom
}

.footer,
.header {
  flex: none; //auto (1 1 auto) 和 none (0 0 auto)
}

.middle-area {
  display: flex;
  flex: 1 0 auto; /* flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。*/
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media only screen and (min-width: 768px) {
  /* default iPad screens */
  .middle-area {
    flex-direction: row;
  }
  .main-container {
    flex: 1;
    padding: 0 28px;
    margin: 0;
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
}

@media screen and (min-width: 1280px) {
  .middle-area {
    flex-direction: row;
  }

  // 主体区域
  .main-container {
    flex: 1;
    margin: 0;
    justify-content: center;
    padding: 0 28px;
    display: flex;
    flex-direction: row;
    min-height: 100%;
    transition: margin-left 0.28s;

    .breadcrumb {
      margin-left: 28px;
    }
  }
}
</style>
