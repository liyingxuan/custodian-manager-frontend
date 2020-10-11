import Vue from "vue";
import _ from "lodash";
import generateKey from "@/utils/generateKey";
import * as authenticationApi from "@/api/authentication";
import { removeToken } from "@/utils/auth";

export default {
  state: {
    myInfo: null,
    permissions: null,
  },
  getters: {
    myInfo: state => state.myInfo,
    permissions: state => state.permissions,
  },
  mutations: {
    setMyInfo(state, payload) {
      state.myInfo = payload;
    },
    setPermissions(state, payload) {
      state.permissions = payload;
    },
  },
  actions: {
    resetAuthentication({ commit }) {
      commit("setMyInfo", null);
      commit("setPermissions", null);
    },
    async managerLogin({ commit }, payload) {
      const result = await authenticationApi.managerLogin(payload);
      commit("setMyInfo", result.result);
      return result.result;
    },
    async customerLogin({ commit }, payload) {
      const result = await authenticationApi.customerLogin(payload);
      commit("setMyInfo", result.result);
      return result.result;
    },
    async gaLogin(context, ga) {
      await authenticationApi.gaLogin(ga);
    },
    async logout({ commit, dispatch }) {
      removeToken();
      dispatch("resetAuthentication");
    },
    async getMyInfo({ commit }) {
      const result = await authenticationApi.getMyInfo();
      commit("setMyInfo", result.result);
      return result.result;
    },
    async getPermissions({ commit }) {
      const result = await authenticationApi.getPermissions();
      commit("setPermissions", result.result);
    },
    async forgotPassword(context, payload) {
      await authenticationApi.forgotPassword(payload);
    },
    async setPassword(context, payload) {
      await authenticationApi.setPassword(payload);
    },
    async changePassword(context, data) {
      await authenticationApi.changePassword(data);
    },
    async getCaptchaCode() {
      return (await authenticationApi.getCaptchaCode()).result;
    },
    async verifyCaptchaCode(context, data) {
      await authenticationApi.verifyCaptchaCode(data);
    },
    async getGaSecret() {
      return (await authenticationApi.getGaSecret()).result;
    },
    async verifyGaCode(context, ga) {
      return (await authenticationApi.verifyGaCode(ga)).result;
    },
    async bindGa(context, ga) {
      await authenticationApi.bindGa(ga);
    },
    async rebindGa(context, payload) {
      await authenticationApi.rebindGa(payload);
    },
    async sendEmailCode() {
      await authenticationApi.sendEmailCode();
    },
  },
};
