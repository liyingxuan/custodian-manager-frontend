import Vue from "vue";
import generateKey from "@/utils/generateKey";
import * as dashboardApi from "@/api/dashboard";

export default {
  state: {
    assetsDetailDict: {},
    assetsDepositWithdrawStat: null,
    managementOverview: null,
  },
  getters: {
    selectAssetsDetail: state => queryParams => {
      return state.assetsDetailDict[generateKey(queryParams)];
    },
    selectCustomerAssetsDetail: state => ({ customerId, queryParams }) => {
      return state.assetsDetailDict[generateKey([customerId], queryParams)];
    },
    assetsDepositWithdrawStat: state => state.assetsDepositWithdrawStat,
    managementOverview: state => state.managementOverview,
  },
  mutations: {
    setAssetsDetail(state, payload) {
      Vue.set(state.assetsDetailDict, payload.key, payload.value);
    },
    setAssetsDepositWithdrawStat(state, payload) {
      state.assetsDepositWithdrawStat = payload;
    },
    setManagementOverview(state, payload) {
      state.managementOverview = payload;
    },
  },
  actions: {
    async getAssetsDetail({ commit }, queryParams) {
      const result = await dashboardApi.getAssetsDetail(queryParams);
      commit("setAssetsDetail", {
        key: generateKey(queryParams),
        value: result.result,
      });
    },
    async getCustomerAssetsDetail({ commit }, payload) {
      const result = await dashboardApi.getCustomerAssetsDetail(payload);
      commit("setAssetsDetail", {
        key: generateKey([payload.customerId], payload.queryParams),
        value: result.result,
      });
    },
    async getAssetsDepositWithdrawStat({ commit }) {
      const result = await dashboardApi.getAssetsDepositWithdrawStat();
      commit("setAssetsDepositWithdrawStat", result.result);
    },
    async getManagementOverview({ commit }) {
      const result = await dashboardApi.getManagementOverview();
      commit("setManagementOverview", result.result);
    },
  },
};
