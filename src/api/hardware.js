import request from "@/utils/request";
import url from "url";

export function getHardwares(queryParams) {
  return request({
    url: url.format({
      pathname: "/hardwares",
      query: queryParams,
    }),
    method: "get",
  });
}

export function getMyHardwares() {
  return request({
    url: "/hardwares/myself",
    method: "get",
  });
}

export function getHardwareDetail(number) {
  return request({
    url: `/hardwares/${number}`,
    method: "get",
  });
}

export function addHardware(data) {
  return request({
    url: "/hardwares",
    method: "post",
    data: data,
  });
}

export function modifyHardware(data) {
  return request({
    url: "/hardwares",
    method: "put",
    data: data,
  });
}

export function removeHardware(data) {
  return request({
    url: "/hardwares",
    method: "delete",
    data: data,
  });
}
