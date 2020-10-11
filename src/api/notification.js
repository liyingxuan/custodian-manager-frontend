import request from "@/utils/request";
import url from "url";

export function getAnnouncements(queryParams) {
  return request({
    url: url.format({
      pathname: "/messages",
      query: queryParams,
    }),
    method: "get",
  });
}

export function getAnnouncementDetail(id) {
  return request({
    url: `/messages/${id}`,
    method: "get",
  });
}

export function addAnnouncement(data) {
  return request({
    url: "/messages",
    method: "post",
    data: data,
  });
}

export function modifyAnnouncement(data) {
  return request({
    url: "/messages",
    method: "put",
    data: data,
  });
}

export function removeAnnouncement(id) {
  return request({
    url: `/messages/${id}`,
    method: "delete",
  });
}

export function getNotifications(queryParams) {
  return request({
    url: url.format({
      pathname: "/messages/system",
      query: queryParams,
    }),
    method: "get",
  });
}

export function getNotificationDetail(id) {
  return request({
    url: `/messages/system/${id}`,
    method: "get",
  });
}

export function setNotificationRead(id) {
  return request({
    url: `/messages/system/${id}`,
    method: "put",
  });
}
