import request from "@/utils/request";
import url from "url";

export function getAccounts(queryParams) {
  return request({
    url: url.format({
      pathname: "/customers/accounts",
      query: queryParams,
    }),
    method: "get",
  });
}

export function getCustomerAccounts({ customerId, queryParams }) {
  return request({
    url: url.format({
      pathname: `/customers/${customerId}/accounts`,
      query: queryParams,
    }),
    method: "get",
  });
}

export function addAccount(data) {
  return request({
    url: "/customers/account",
    method: "post",
    data: data,
  });
}

export function resendAccountActivationEmail(data) {
  return request({
    url: "/customers/activation-email",
    method: "post",
    data: data,
  });
}

export function approveAccount({ data, ga }) {
  return request({
    url: "/customers/account/approver",
    method: "put",
    data: data,
    headers: { "GA-Code": ga },
  });
}

export function freezeAccount(data) {
  return request({
    url: "/customers/account",
    method: "put",
    data: data,
  });
}

export function getApproverCandidates() {
  return request({
    url: "/customers/accounts/approver-candidates",
    method: "get",
  });
}

export function getApprover() {
  return request({
    url: "/customers/accounts/approver",
    method: "get",
  });
}

export function setApprover({ data, ga }) {
  return request({
    url: "/customers/accounts/approver",
    method: "put",
    data: data,
    headers: { "GA-Code": ga },
  });
}

export function getCo_signerCandidates() {
  return request({
    url: "/customers/accounts/co-signer-candidates",
    method: "get",
  });
}

export function getPlatformAccounts() {
  return request({
    url: "/customers/platform-accounts",
    method: "get",
  });
}

export function getPlatformApproverCandidates() {
  return request({
    url: "/customers/accounts/platform-approver-candidates",
    method: "get",
  });
}

export function getPlatformApprovers() {
  return request({
    url: "/customers/accounts/platform-approvers",
    method: "get",
  });
}

export function setPlatformApprovers(data) {
  return request({
    url: "/customers/accounts/platform-approvers",
    method: "post",
    data: data,
  });
}

export function getPlatformCo_signerCandidates() {
  return request({
    url: "/customers/accounts/platform-co-signer-candidates",
    method: "get",
  });
}

export function getPlatformCo_signers() {
  return request({
    url: "/customers/accounts/platform-co-signers",
    method: "get",
  });
}

export function setPlatformCo_signers(data) {
  return request({
    url: "/customers/accounts/platform-co-signers",
    method: "post",
    data: data,
  });
}
