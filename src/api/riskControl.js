import request from "@/utils/request";

export function getRiskControls() {
  return request({
    url: "/risk-controls",
    method: "get",
  });
}

export function setRiskControls(data) {
  return request({
    url: "/risk-controls",
    method: "put",
    data: data,
  });
}
