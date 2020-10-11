import request from "@/utils/request";
import url from "url";

export function managerLogin(payload) {
  return request({
    url: "/customers/account/manager-login",
    method: "post",
    data: payload.data,
    headers: {
      "Geetest-Challenge": payload.geetest_challenge,
      "Geetest-Validate": payload.geetest_validate,
      "Geetest-Secode": payload.geetest_seccode,
    },
    secure: true,
  });
}

export function customerLogin(payload) {
  return request({
    url: "/customers/account/customer-login",
    method: "post",
    data: payload.data,
    headers: {
      "Geetest-Challenge": payload.geetest_challenge,
      "Geetest-Validate": payload.geetest_validate,
      "Geetest-Secode": payload.geetest_seccode,
    },
    secure: true,
  });
}

export function gaLogin(ga) {
  return request({
    url: "/customers/account/ga-login",
    method: "get",
    headers: { "GA-Code": ga },
  });
}

export function getMyInfo() {
  return request({
    url: "/customers/account/info",
    method: "get",
  });
}

export function getPermissions() {
  return request({
    url: "/customers/account/permissions",
    method: "get",
  });
}

export function forgotPassword(payload) {
  return request({
    url: "/customers/account/password/forget",
    method: "post",
    data: payload.data,
    headers: {
      "Geetest-Challenge": payload.geetest_challenge,
      "Geetest-Validate": payload.geetest_validate,
      "Geetest-Secode": payload.geetest_seccode,
    },
    secure: true,
  });
}

export function setPassword({ data, token }) {
  return request({
    url: "/customers/account/password",
    method: "post",
    data: data,
    headers: { Authorization: token },
    secure: true,
  });
}

export function changePassword(data) {
  return request({
    url: "/customers/account/reset-password",
    method: "put",
    data: data,
    secure: true,
  });
}

export function getCaptchaCode() {
  return request({
    url: "/customers/authentication/captcha-code",
    method: "get",
  });
}

export function verifyCaptchaCode(data) {
  return request({
    url: "/customers/authentication/captcha-code/verification",
    method: "post",
    data: data,
  });
}

export function getGaSecret() {
  return request({
    url: "/customers/authentication/ga/qrcode",
    method: "get",
  });
}

export function verifyGaCode(ga) {
  return request({
    url: "/customers/authentication/ga/verification",
    method: "get",
    headers: { "GA-Code": ga },
  });
}

export function bindGa(ga) {
  return request({
    url: "/customers/authentication/ga/binding",
    method: "get",
    headers: { "GA-Code": ga },
  });
}

export function rebindGa({ data, ga }) {
  return request({
    url: "/customers/authentication/ga/re-binding",
    method: "post",
    data: data,
    headers: { "GA-Code": ga },
  });
}

export function sendEmailCode() {
  return request({
    url: "/customers/authentication/email-verification-code",
    method: "get",
  });
}
