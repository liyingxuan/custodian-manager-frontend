import request from "@/utils/request";
import url from "url";

export function getPublicKeys(queryParams) {
  return request({
    url: url.format({
      pathname: "/public-keys",
      query: queryParams,
    }),
    method: "get",
  });
}

export function getPublicKeysUnusedStat() {
  return request({
    url: "/public-keys/unused",
    method: "get",
  });
}

export function getPublicKeyPaths(queryParams) {
  return request({
    url: url.format({
      pathname: "/public-keys/path",
      query: queryParams,
    }),
    method: "get",
  });
}

export function addPublicKeys(data) {
  return request({
    url: "/public-keys",
    method: "post",
    data: data,
  });
}
