import request from "@/utils/request";
import url from "url";

export function getCustomers(queryParams) {
  return request({
    url: url.format({
      pathname: "/customers",
      query: queryParams,
    }),
    method: "get",
  });
}

export function customerJoin(payload) {
  return request({
    url: "/customers",
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

export function submitCustomerJoinInfo(data) {
  return request({
    url: "/customers/basic-info",
    method: "post",
    data: data,
    secure: true,
  });
}

export function uploadCustomerJoinFileFinish() {
  return request({
    url: "/customers/upload-finish",
    method: "post",
  });
}

export function activateCustomer(token) {
  return request({
    url: "/customers/activate",
    method: "put",
    headers: { Authorization: token },
  });
}

export function getCustomerKycInfo(customerId) {
  return request({
    url: `/customers/${customerId}/kyc-info`,
    method: "get",
  });
}

export function getCustomerKycFile(queryParams) {
  return request({
    url: url.format({
      pathname: `/customers/download`,
      query: queryParams,
    }),
    method: "get",
    responseType: "blob",
  });
}

export function getCustomerAllKycFiles(customerId) {
  return request({
    url: `/customers/${customerId}/download-all`,
    method: "get",
    responseType: "blob",
  });
}

export function firstReviewCustomer(data) {
  return request({
    url: "/customers/first-review",
    method: "put",
    data: data,
  });
}

export function rcoReviewCustomer(data) {
  return request({
    url: "/customers/rco-review",
    method: "put",
    data: data,
  });
}
