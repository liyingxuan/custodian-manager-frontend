import request from "@/utils/request";
import url from "url";

export function getWorkflows(queryParams) {
  return request({
    url: url.format({
      pathname: "/workflows",
      query: queryParams,
    }),
    method: "get",
  });
}

export function getWorkflowDetail(tx_id) {
  return request({
    url: `/workflows/${tx_id}`,
    method: "get",
  });
}
