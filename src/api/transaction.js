import request from "@/utils/request";
import url from "url";

export function getTransactions(queryParams) {
  return request({
    url: url.format({
      pathname: "/transactions",
      query: queryParams,
    }),
    method: "get",
  });
}

export function getCustomerTransactions({ customerId, queryParams }) {
  return request({
    url: url.format({
      pathname: `/customers/${customerId}/transactions`,
      query: queryParams,
    }),
    method: "get",
  });
}

export function getTransactionDetail(tx_id) {
  return request({
    url: `/transactions/${tx_id}`,
    method: "get",
  });
}

export function getTransactionApprovalFlow(tx_id) {
  return request({
    url: `/transactions/${tx_id}/approvers`,
    method: "get",
  });
}

export function getTransactionCo_signFlow(tx_id) {
  return request({
    url: `/transactions/${tx_id}/co-signers`,
    method: "get",
  });
}

export function getTransactionFee(queryParams) {
  return request({
    url: url.format({
      pathname: "/transactions/fee",
      query: queryParams,
    }),
    method: "get",
  });
}

export function withdraw({ data, ga, emailCode }) {
  return request({
    url: "/transactions/withdraw",
    method: "post",
    data: data,
    headers: { "GA-Code": ga, "Email-Verify-Code": emailCode },
    secure: true,
  });
}

export function approveTransaction({ tx_id, data, ga }) {
  return request({
    url: `/transactions/${tx_id}/approve`,
    method: "put",
    data: data,
    headers: { "GA-Code": ga },
  });
}

export function getTransactionParams(tx_id) {
  return request({
    url: `/transactions/params/${tx_id}`,
    method: "get",
    secure: true,
  });
}

export function signTransaction({ tx_id, data, ga, emailCode }) {
  return request({
    url: `/transactions/${tx_id}/sign`,
    method: "put",
    data: data,
    headers: { "GA-Code": ga, "Email-Verify-Code": emailCode },
    secure: true,
  });
}

export function getCoinPrice() {
  return request({
    url: `/transactions/coin-price`,
    method: "get",
  });
}
