import request from "@/utils/request";
import url from "url";

export function getReconciliationFile(queryParams) {
  return request({
    url: url.format({
      pathname: "/reconciliation",
      query: queryParams,
    }),
    method: "get",
    responseType: "blob",
  });
}
