import request from "@/utils/request";
import url from "url";

export function getAddresses(queryParams) {
  return request({
    url: url.format({
      pathname: "/addresses",
      query: queryParams,
    }),
    method: "get",
  });
}

export function getCustomerAddresses({ customerId, queryParams }) {
  return request({
    url: url.format({
      pathname: `/customers/${customerId}/addresses`,
      query: queryParams,
    }),
    method: "get",
  });
}

export function getAddressDetail({ address, queryParams }) {
  return request({
    url: url.format({
      pathname: `/addresses/${address}`,
      query: queryParams,
    }),
    method: "get",
  });
}

export function getAddressApprovalFlow(address) {
  return request({
    url: `/addresses/${address}/approvers`,
    method: "get",
  });
}

export function getAddressCo_signFlow(address) {
  return request({
    url: `/addresses/${address}/co-signers`,
    method: "get",
  });
}

export function createAddress({ data, ga }) {
  return request({
    url: "/addresses",
    method: "post",
    data: data,
    headers: { "GA-Code": ga },
  });
}

export function getAddressLedgerPath({ tx_id, ga }) {
  return request({
    url: `/addresses/${tx_id}/ledger-path`,
    method: "get",
    headers: { "GA-Code": ga },
  });
}

export function addAddressPublicKey({ tx_id, data }) {
  return request({
    url: `/addresses/${tx_id}/public-keys`,
    method: "post",
    data: data,
  });
}

export function rejectCreateAddress({ data, ga }) {
  return request({
    url: "/addresses/sign-reject",
    method: "post",
    data: data,
    headers: { "GA-Code": ga },
  });
}
