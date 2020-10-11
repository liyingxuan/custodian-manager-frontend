/*
 * **************************************************************************************
 *  Copyright © 2014-2018 Ontology Foundation Ltd.
 *  All rights reserved.
 *
 *  This software is supplied only under the terms of a license agreement,
 *  nondisclosure agreement or other written agreement with Ontology Foundation Ltd.
 *  Use, redistribution or other disclosure of any parts of this
 *  software is prohibited except in accordance with the terms of such written
 *  agreement with Ontology Foundation Ltd. This software is confidential
 *  and proprietary information of Ontology Foundation Ltd.
 *
 * **************************************************************************************
 *
 */

import Vue from "vue";
import Router from "vue-router";
import Layout from "../views/layout/Layout";
import LayoutNotLogin from "../views/layout/LayoutNotLogin";

const _import = file => () => import("@/views/" + file + ".vue");
Vue.use(Router);

export const constantRouterMap = [
  {
    path: "/login",
    component: LayoutNotLogin,
    meta: { title: "Login", hidden: true },
    children: [
      {
        path: "",
        component: _import("login/index"),
        children: [
          {
            path: "",
            name: "login",
            component: _import("login/LoginForm"),
            meta: { title: "Login" },
          },
          {
            path: "ga-verify",
            name: "ga-verify",
            component: _import("login/GaVerify"),
            meta: { title: "GA Verify" },
          },
          {
            path: "wait-review",
            name: "wait-review",
            component: _import("login/WaitReview"),
            meta: { title: "Wait Review" },
          },
        ],
      },
      {
        path: "set-ga",
        name: "set-ga",
        component: _import("login/SetGA"),
        meta: { title: "Set GA" },
      },
    ],
  },

  {
    path: "/password",
    redirect: "/password/forgot",
    component: LayoutNotLogin,
    meta: { title: "Password", hidden: true },
    children: [
      {
        path: "forgot",
        name: "forgot-password",
        component: _import("password/Forgot"),
        meta: { title: "Forgot Password" },
      },
      {
        path: "set/:token",
        name: "set-password",
        component: _import("password/Set"),
        meta: { title: "Set Password" },
      },
    ],
  },

  {
    path: "/dashboard",
    redirect: "/dashboard/",
    component: Layout,
    meta: { title: "Overview" },
    children: [
      {
        path: "",
        name: "dashboard",
        component: _import("dashboard/index"),
        meta: { title: "Overview", noBreadcrumb: true },
      },
      {
        path: "notifications",
        name: "notifications",
        component: _import("dashboard/Notifications"),
        meta: { title: "Notifications", hidden: true },
      },
      {
        path: "notification-detail/:id",
        name: "notification-detail",
        component: _import("dashboard/NotificationDetail"),
        meta: { title: "Notification Detail", hidden: true },
      },
    ],
  },

  {
    path: "/users",
    name: "users",
    redirect: "/users/registered",
    component: Layout,
    meta: { title: "User Management" },
    children: [
      {
        path: "registered",
        name: "registered",
        component: _import("users/RegisteredUser"),
        meta: { title: "Registered User" },
      },
      {
        path: "intent-users",
        name: "intent-users",
        component: _import("users/IntentUsers"),
        meta: { title: "Intent Users" },
      },
      {
        path: "intent-user/:id",
        redirect: "/users/intent-users",
        component: _import("users/IntentUser"),
        meta: { title: "Intent Users", hidden: true },
        children: [
          {
            path: "",
            name: "intent-user",
            component: _import("users/IntentUserDetailView"),
            meta: { title: "View" },
          },
          {
            path: "first-review",
            name: "first-review",
            component: _import("users/IntentUserDetailFirstReview"),
            meta: { title: "First Review" },
          },
          {
            path: "rco-review",
            name: "rco-review",
            component: _import("users/IntentUserDetailRcoReview"),
            meta: { title: "RCO Review" },
          },
        ],
      },

      {
        path: "registered-detail/:id",
        name: "registered-detail",
        component: _import("users/RegisteredUserDetail"),
        meta: { title: "Registered Detail", hidden: true },
      },
      {
        path: "address-information/:address/:coin_type",
        name: "address-information",
        component: _import("address/Detail"),
        meta: { title: "Address Information", hidden: true },
      },
    ],
  },

  {
    path: "/workflow",
    redirect: "/workflow/",
    component: Layout,
    meta: { title: "Workflow" },
    children: [
      {
        path: "",
        name: "workflow",
        component: _import("workflow/List"),
        meta: { title: "Workflow", noBreadcrumb: true },
      },
      {
        path: "account-review/:tx_id/action",
        name: "account-review-action",
        component: _import("workflow/AccountReview"),
        meta: { title: "Account Review", hidden: true },
      },
      {
        path: "account-review/:tx_id",
        name: "account-review-detail",
        component: _import("workflow/AccountReview"),
        meta: { title: "Account Review", hidden: true },
      },
      {
        path: "create-address/:tx_id/action",
        name: "create-address-action",
        component: _import("workflow/CreateAddress"),
        meta: { title: "Create Address", hidden: true },
      },
      {
        path: "create-address/:tx_id",
        name: "create-address-detail",
        component: _import("workflow/CreateAddress"),
        meta: { title: "Create Address", hidden: true },
      },
      {
        path: "withdraw-review/:tx_id/action",
        name: "withdraw-review-action",
        component: _import("workflow/WithdrawReview"),
        meta: { title: "Withdraw Review", hidden: true },
      },
      {
        path: "withdraw-review/:tx_id",
        name: "withdraw-review-detail",
        component: _import("workflow/WithdrawReview"),
        meta: { title: "Withdraw Review", hidden: true },
      },
      {
        path: "withdraw-operation/:tx_id/action",
        name: "withdraw-operation-action",
        component: _import("workflow/WithdrawOperation"),
        meta: { title: "Withdraw Operation", hidden: true },
      },
      {
        path: "withdraw-operation/:tx_id",
        name: "withdraw-operation-detail",
        component: _import("workflow/WithdrawOperation"),
        meta: { title: "Withdraw Operation", hidden: true },
      },
    ],
  },

  {
    path: "/address",
    redirect: "/address/",
    component: Layout,
    meta: { title: "Address Management" },
    children: [
      {
        path: "",
        name: "address",
        component: _import("address/List"),
        meta: { title: "Address Management", noBreadcrumb: true },
      },
      {
        path: ":address/:coin_type",
        name: "address-detail",
        component: _import("address/Detail"),
        meta: { title: "Address Detail", hidden: true },
      },
    ],
  },

  {
    path: "/transaction",
    redirect: "/transaction/",
    component: Layout,
    meta: { title: "Transaction Record" },
    children: [
      {
        path: "",
        name: "transaction",
        component: _import("transaction/List"),
        meta: { title: "Transaction Record", noBreadcrumb: true },
      },
      {
        path: ":tx_id",
        name: "transaction-detail",
        component: _import("transaction/Detail"),
        meta: { title: "Transaction Detail", hidden: true },
      },
    ],
  },

  {
    path: "/hardware",
    redirect: "/hardware/",
    component: Layout,
    meta: { title: "Hardware Management" },
    children: [
      {
        path: "",
        name: "hardware",
        component: _import("hardware/List"),
        meta: { title: "Hardware Management", noBreadcrumb: true },
      },
      {
        path: "add",
        name: "add-hardware",
        component: _import("hardware/Detail"),
        meta: { title: "Add A Hardware", hidden: true },
      },
      {
        path: ":number",
        name: "hardware-detail",
        component: _import("hardware/Detail"),
        meta: { title: "Modify Hardware", hidden: true },
      },
    ],
  },

  {
    path: "/public-key",
    redirect: "/public-key/",
    component: Layout,
    meta: { title: "Public Key Management" },
    children: [
      {
        path: "",
        name: "public-key",
        component: _import("public-key/List"),
        meta: { title: "Public Key Management", noBreadcrumb: true },
      },
      {
        path: "add",
        name: "add-public-key",
        component: _import("public-key/Add"),
        meta: { title: "Add Public Keys", hidden: true },
      },
    ],
  },

  {
    path: "/risk-control-setting",
    redirect: "/risk-control-setting/",
    component: Layout,
    meta: { title: "Risk Control Setting" },
    children: [
      {
        path: "",
        name: "risk-control-setting",
        component: _import("risk-control/List"),
        meta: { title: "Risk Control Setting", noBreadcrumb: true },
      },
    ],
  },

  {
    path: "/reconciliation",
    redirect: "/reconciliation/",
    component: Layout,
    meta: { title: "Reconciliation" },
    children: [
      {
        path: "",
        name: "reconciliation",
        component: _import("reconciliation/index"),
        meta: { title: "Reconciliation", noBreadcrumb: true },
      },
    ],
  },

  {
    path: "/announcement",
    redirect: "/announcement/",
    component: Layout,
    meta: { title: "Announcements" },
    children: [
      {
        path: "",
        name: "announcement",
        component: _import("announcement/List"),
        meta: { title: "Announcements", noBreadcrumb: true },
      },
      {
        path: "add",
        name: "add-announcement",
        component: _import("announcement/Detail"),
        meta: { title: "Add Announcement", hidden: true },
      },
      {
        path: "modify/:id",
        name: "modify-announcement",
        component: _import("announcement/Detail"),
        meta: { title: "Modify Announcement", hidden: true },
      },
      {
        path: "view/:id",
        name: "view-announcement",
        component: _import("announcement/ViewDetail"),
        meta: { title: "View Announcement", hidden: true },
      },
    ],
  },

  {
    path: "/setting",
    redirect: "/setting/",
    component: Layout,
    meta: { title: "System Setting" },
    children: [
      {
        path: "",
        name: "setting",
        component: _import("setting/Dashboard"),
        meta: { title: "Setting Dashboard" },
      },
      {
        path: "co-signer",
        name: "co-signer",
        component: _import("setting/Co-signer"),
        meta: { title: "Co-signer Setting" },
      },
      {
        path: "google-authenticator",
        name: "google-authenticator",
        component: _import("setting/GoogleAuthenticator"),
        meta: { title: "Google Authenticator" },
      },
    ],
  },

  { path: "/404", component: _import("404"), meta: { hidden: true } },

  { path: "/", redirect: "/dashboard", meta: { hidden: true } },

  { path: "*", redirect: "/404", meta: { hidden: true } },
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: (to, from, savedPosition) => {
    return to.name === from.name ? savedPosition : { y: 0 };
  },
  routes: constantRouterMap,
});
