import Vue from "vue";
import _ from "lodash";
import generateKey from "@/utils/generateKey";
import * as notificationApi from "@/api/notification";

export default {
  state: {
    announcementsDict: {},
    announcementDetailDict: {},
    announcementsTotalDict: {},
    notificationsDict: {},
    notificationDetailDict: {},
    notificationsTotalDict: {},
    notificationsUnreadTotal: null,
  },
  getters: {
    selectAnnouncements: state => queryParams => {
      return state.announcementsDict[generateKey(queryParams)];
    },
    selectAnnouncementDetail: state => id => {
      return state.announcementDetailDict[generateKey([id])];
    },
    selectAnnouncementsTotal: state => queryParams => {
      return state.announcementsTotalDict[generateKey(_.omit(queryParams, ["page_index"]))];
    },
    selectNotifications: state => queryParams => {
      return state.notificationsDict[generateKey(queryParams)];
    },
    selectNotificationDetail: state => id => {
      return state.notificationDetailDict[generateKey([id])];
    },
    selectNotificationsTotal: state => queryParams => {
      return state.notificationsTotalDict[generateKey(_.omit(queryParams, ["page_index"]))];
    },
    notificationsUnreadTotal: state => state.notificationsUnreadTotal,
  },
  mutations: {
    setAnnouncements(state, payload) {
      Vue.set(state.announcementsDict, payload.key, payload.value);
    },
    setAnnouncementDetail(state, payload) {
      Vue.set(state.announcementDetailDict, payload.key, payload.value);
    },
    setAnnouncementsTotal(state, payload) {
      Vue.set(state.announcementsTotalDict, payload.key, payload.value);
    },
    setNotifications(state, payload) {
      Vue.set(state.notificationsDict, payload.key, payload.value);
    },
    setNotificationDetail(state, payload) {
      Vue.set(state.notificationDetailDict, payload.key, payload.value);
    },
    setNotificationsTotal(state, payload) {
      Vue.set(state.notificationsTotalDict, payload.key, payload.value);
    },
    setNotificationsUnreadTotal(state, payload) {
      state.notificationsUnreadTotal = payload;
    },
  },
  actions: {
    async getAnnouncements({ commit }, queryParams) {
      const result = await notificationApi.getAnnouncements(queryParams);
      commit("setAnnouncements", {
        key: generateKey(queryParams),
        value: result.result.records,
      });
      commit("setAnnouncementsTotal", {
        key: generateKey(_.omit(queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async getAnnouncementDetail({ commit }, id) {
      const result = await notificationApi.getAnnouncementDetail(id);
      commit("setAnnouncementDetail", { key: generateKey([id]), value: result.result });
    },
    async addAnnouncement(context, data) {
      await notificationApi.addAnnouncement(data);
    },
    async modifyAnnouncement(context, data) {
      await notificationApi.modifyAnnouncement(data);
    },
    async removeAnnouncement(context, id) {
      await notificationApi.removeAnnouncement(id);
    },
    async getNotifications({ commit }, queryParams) {
      const result = await notificationApi.getNotifications(queryParams);
      commit("setNotifications", {
        key: generateKey(queryParams),
        value: result.result.records,
      });
      commit("setNotificationsTotal", {
        key: generateKey(_.omit(queryParams, ["page_index"])),
        value: result.result.total,
      });
      commit("setNotificationsUnreadTotal", result.result.unread_total);
    },
    async getNotificationDetail({ commit }, id) {
      const result = await notificationApi.getNotificationDetail(id);
      commit("setNotificationDetail", { key: generateKey([id]), value: result.result });
    },
    async setNotificationRead(context, id) {
      await notificationApi.setNotificationRead(id);
    },
  },
};
