import request from "@/utils/request";
import url from "url";

export function getAssetsDetail(queryParams) {
  return request({
    url: url.format({
      pathname: "/dashboard/assets/detail",
      query: queryParams,
    }),
    method: "get",
  });
}

export function getCustomerAssetsDetail({ customerId, queryParams }) {
  return request({
    url: url.format({
      pathname: `/customers/${customerId}/dashboard/assets/detail`,
      query: queryParams,
    }),
    method: "get",
  });
}

export function getAssetsDepositWithdrawStat() {
  return request({
    url: "/dashboard/assets/deposit-withdrawal-stat",
    method: "get",
  });
}

export function getManagementOverview() {
  return request({
    url: "/dashboard/management-overview",
    method: "get",
  });
}
