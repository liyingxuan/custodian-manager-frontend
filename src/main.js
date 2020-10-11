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

import "babel-polyfill";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/utils/handleError";
import Vue from "vue";
import "@/styles/element-variables.scss"; // element-ui css
import Element from "element-ui";
import "vuescroll/dist/vuescroll.css";
import vuescroll from "vuescroll/dist/vuescroll-native";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faBell,
  faListUl,
  faPlus,
  faChevronLeft,
  faQuestionCircle,
} from "@fortawesome/pro-regular-svg-icons";
import {
  faUser,
  faPlus as faPlus_l,
  faCopy,
  faDownload,
  faCloudDownload,
} from "@fortawesome/pro-light-svg-icons";
import { faPlusCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import SvgIcon from "@/components/SvgIcon";
import SecurityCode from "@/components/SecurityCode";
import Breadcrumb from "@/components/Breadcrumb";
import VueQr from "vue-qr";
import CopyBtn from "@/components/CopyBtn";
import CustodianDialog from "@/components/CustodianDialog";
import InputDialog from "@/components/InputDialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProgressDialog from "@/components/ProgressDialog";
import sanitizeHTML from "sanitize-html";
import * as formatters from "@/utils/formatters";
import store from "@/store";
import router from "@/router";
import "@/router/permissionRouter";
import i18n from "@/lang";
import "@/styles/index.scss"; // global css
import App from "@/App";

if (process.env.NODE_ENV !== "production") {
  localStorage.debug = "*,-sockjs-client:*";
}

//全局的组件
Vue.use(Element, {
  size: "medium", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});

Vue.use(vuescroll);

//https://github.com/FortAwesome/vue-fontawesome
dom.watch();
library.add(
  faListUl,
  faBell,
  faPlusCircle,
  faPlus,
  faPlus_l,
  faUser,
  faCopy,
  faChevronLeft,
  faDownload,
  faCloudDownload,
  faQuestionCircle,
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.component("svg-icon", SvgIcon);
Vue.component("security-code", SecurityCode);
Vue.component("breadcrumb", Breadcrumb);
Vue.component("vue-qr", VueQr);
Vue.component("copy-btn", CopyBtn);
Vue.component("custodian-dialog", CustodianDialog);
Vue.component("input-dialog", InputDialog);
Vue.component("confirm-dialog", ConfirmDialog);
Vue.component("progress-dialog", ProgressDialog);

const requireSvg = require.context("./assets/svg", false, /\.svg$/);
requireSvg.keys().map(requireSvg);

//全局工具函数
Vue.prototype.$sanitize = sanitizeHTML;
Object.assign(Vue.prototype, formatters);

window.vueInstance = new Vue({
  el: "#app",
  router,
  store,
  i18n,
  template: "<App/>",
  components: { App },
});
