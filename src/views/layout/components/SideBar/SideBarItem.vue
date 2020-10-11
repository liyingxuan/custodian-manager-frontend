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
  <div class="menu-wrapper">
    <template v-for="item in filterRoutes">
      <el-menu-item
        v-if="!item.children || item.children.length == 0"
        :class="depth === 0 ? 'no-dropdown' : ''"
        :index="appendPath(path, item.path)"
        :key="appendPath(path, item.path)"
      >
        <span>{{ item.meta && item.meta.title }}</span>
      </el-menu-item>
      <el-menu-item
        v-else-if="item.children.length == 1"
        :class="depth === 0 ? 'no-dropdown' : ''"
        :index="appendPath(path, item.path, item.children[0].path)"
        :key="appendPath(path, item.path, item.children[0].path)"
      >
        <span>{{ item.children[0].meta && item.children[0].meta.title }}</span>
      </el-menu-item>
      <el-submenu v-else :index="appendPath(path, item.path)" :key="appendPath(path, item.path)">
        <template slot="title">
          <span>{{ item.meta && item.meta.title }}</span>
        </template>
        <sidebar-item
          :path="appendPath(path, item.path)"
          :routes="item.children"
          :depth="depth + 1"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    path: {
      type: String,
      default: "",
    },
    routes: {
      type: Array,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    appendPath(...paths) {
      return paths.reduce((v1, v2) => {
        let left = v1 || "";
        let right = v2 || "";
        if (left.charAt(left.length - 1) === "/") {
          left = left.slice(0, left.length - 1);
        }
        if (right.charAt(0) === "/") {
          right = right.slice(1, right.length);
        }
        return left + "/" + right;
      });
    },
    _filterRoutes(routes) {
      return routes
        .filter(route => !route.meta || !route.meta.hidden)
        .map(route => {
          return {
            ...route,
            children: route.children && this._filterRoutes(route.children),
          };
        });
    },
  },
  computed: {
    filterRoutes() {
      return this._filterRoutes(this.routes);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../styles/variables.scss";
.menu-wrapper {
  width: $sideBarWidth;

  .el-submenu,
  .el-menu-item {
    span {
      margin: 0px -20px;
      padding-left: 12px;
      font-size: 12px;
    }
  }

  .el-menu-item {
    min-width: 180px !important;
    background-color: $subMenuBg !important;
    color: #5f6a76 !important;
    &:hover {
      color: cornflowerblue !important;
    }
  }

  .el-menu-item.is-active {
    span {
      border-left: solid 4px cornflowerblue !important;
      font-weight: bold;
    }
  }

  .el-menu-item.no-dropdown,
  /deep/ .el-submenu__title {
    border-top: solid 1px #d9e9ef !important;

    &:hover {
      background-color: $subMenuBg !important;
      color: cornflowerblue !important;
    }
  }
}
</style>
