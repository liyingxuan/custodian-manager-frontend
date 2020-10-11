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

import axios from "axios";
import { blobToBinaryString } from "blob-util";
import { getToken, setToken } from "@/utils/auth";
import store from "@/store";
import router from "@/router";
import { createKey, encrypt, decrypt } from "./secure";

const SECURE_CONTENT_TYPE = "application/vnd.custodian.api.v1+json";

const key = createKey(window.serverConfig.PUBLIC_KEY);

// 创建axios实例
const service = axios.create({
  baseURL: window.serverConfig.BASE_URL, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: { "Content-Type": "application/json" },
});

// request拦截器
service.interceptors.request.use(
  async config => {
    const token = getToken();
    if (token) {
      config.headers.common["Authorization"] = getToken();
    }

    // 判断是否需要加密通信
    if (config.secure) {
      config.headers["Secure-Key"] = key.encryptedKey;
      config.headers["Content-Type"] = SECURE_CONTENT_TYPE;
      config.headers["Accept"] = SECURE_CONTENT_TYPE;

      // 加密body中的data
      if (config.method === "post" || config.method === "put") {
        if (config.data) {
          config.data = { data: encrypt(key, JSON.stringify(config.data)) };
        } else {
          config.data = {};
        }
      }
    }
    return config;
  },
  async error => {
    throw error;
  },
);

// respone拦截器
service.interceptors.response.use(
  async response => {
    // 保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
    if (response.headers.authorization) {
      setToken(response.headers.authorization);
    }

    // 解析文件名
    const contentDisposition = response.headers["content-disposition"];
    if (contentDisposition) {
      const fileName = contentDisposition.split(";")[1].split("filename=")[1];
      response.data.__fileName = fileName;
    }

    // 解密body中result
    const contentType = response.headers["content-type"];
    if (contentType && contentType.includes(SECURE_CONTENT_TYPE)) {
      const data = response.data;
      if (data.result) {
        data.result = JSON.parse(decrypt(key, data.result));
      }
    }

    return response.data;
  },
  async error => {
    const response = error.response;
    if (response) {
      // 将blob转为json以进行错误处理
      if (response.config.responseType === "blob") {
        response.data = JSON.parse(await blobToBinaryString(response.data));
      }

      // 解密body中result
      const contentType = response.headers["content-type"];
      if (contentType && contentType.includes(SECURE_CONTENT_TYPE)) {
        const data = response.data;
        if (data.result) {
          data.result = JSON.parse(decrypt(key, data.result));
        }
      }

      // 标记错误类型，允许直接显示message
      error = response.data;
      error.__apiError = true;
      error.__showMessage = true;

      // 处理token超时或无效
      const code = error.code;
      switch (error.code) {
        case 62013: // token expiration or format exception
        case 62019: // logged in elsewhere
          await store.dispatch("logout");
          router.push({ name: "login" });
          break;
      }
    }
    // 允许直接显示message
    error.__showMessage = true;
    throw error;
  },
);
export default service;
