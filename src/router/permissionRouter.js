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

import router from ".";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken, removeToken } from "@/utils/auth";
import jwtDecode from "jwt-decode";

NProgress.configure({ showSpinner: false });

const UNLOGIN_ALLOW_LIST = [/^\/login.*/, /^\/join.*/, /^\/password.*/, "/404"];
const LOGIN_SKIP_LIST = [/^\/login.*/, /^\/join.*/, /^\/password.*/];

function matchList(path, list) {
  return list.some(item => {
    return item instanceof RegExp ? item.test(path) : item === path;
  });
}

function jumpTo(target, origin, next) {
  if (target.name !== origin.name) {
    return next(target);
  }
  return next();
}

let runningHooksCount = 0;

router.beforeEach(async (to, from, next) => {
  try {
    // 第一个hook启动时，开启progress
    if (to.name !== from.name) {
      if (runningHooksCount === 0) {
        NProgress.start();
      }
      runningHooksCount++;
    }

    // 获取token，计算是否登陆完成
    const token = getToken();
    let loginCompleted = false;
    if (token) {
      const tokenPayload = jwtDecode(getToken());
      loginCompleted = Boolean(tokenPayload.login_id);
    }

    // 有token时，获取用户状态
    if (token && !store.getters.myInfo) {
      await store.dispatch("getMyInfo");
    }

    // 根据当前状态跳转到指定页面
    if (!loginCompleted) {
      // 登陆未完成，目标不在未登陆允许列表，跳转到登陆页
      if (!matchList(to.path, UNLOGIN_ALLOW_LIST)) {
        return jumpTo({ name: "login", query: { redirect: to.path } }, to, next);
      }

      // 根据myInfo状态跳转到指定页面
      if (store.getters.myInfo) {
        // 非normal状态，跳转到相关页面
        if (store.getters.myInfo.acct_status !== "normal") {
          let routeName = "";
          switch (store.getters.myInfo.acct_status) {
            case "pending-for-activation":
              routeName = "email-activation";
              break;
            case "pending-for-verification":
              routeName = "submit-info";
              break;
            case "pending-for-upload-documents":
              routeName = "upload-info";
              break;
            case "pending-for-initial-review":
            case "pending-for-final-review":
            case "pending-for-review":
              routeName = "wait-review";
              break;
            default: {
              const error = new Error(
                `Invalid account status: ${store.getters.myInfo.acct_status}.`,
              );
              error.__showMessage = true;
              throw error;
            }
          }
          return jumpTo({ name: routeName }, to, next);
        }

        // 未绑定ga，跳转到设置ga页
        if (!store.getters.myInfo.ga) {
          return jumpTo({ name: "set-ga" }, to, next);
        }
      }
    } else {
      // 登陆已完成，跳过登陆相关页面
      if (matchList(to.path, LOGIN_SKIP_LIST)) {
        return jumpTo({ name: "dashboard" }, to, next);
      }

      // 获取用户权限
      if (!store.getters.permissions) {
        await store.dispatch("getPermissions");
      }

      // TODO 检查是否具有查看页面的权限
      if (!store.getters.permissions) {
        const hasPermission = true;
        if (!hasPermission) {
          return jumpTo({ name: "401", replace: true, query: { noGoBack: true } }, to, next);
        }
      }
    }
    return next();

    // 路由出错，跳转到登陆页
  } catch (error) {
    await store.dispatch("logout");
    router.push({ name: "login" });
    throw error;

    // 最后一个hook结束时，关闭progress
  } finally {
    if (to.name !== from.name) {
      runningHooksCount--;
      if (runningHooksCount === 0 && from.name !== to.name) {
        NProgress.done();
      }
    }
  }
});
