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
  <el-menu
    mode="vertical"
    :router="true"
    :default-active="$route.path"
    :collapse="isCollapse"
    background-color="#F5F5F5"
    text-color="#5F6A76"
    active-text-color="Black"
  >
    <sidebar-item :routes="routes"></sidebar-item>
  </el-menu>
</template>
<script>
import { constantRouterMap } from "@/router";
import SidebarItem from "./SideBarItem";

export default {
  components: { SidebarItem },
  computed: {
    isCollapse() {
      return false;
    },
    routes() {
      return constantRouterMap;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
