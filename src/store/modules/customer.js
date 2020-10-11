import Vue from "vue";
import _ from "lodash";
import generateKey from "@/utils/generateKey";
import * as customerApi from "@/api/customer";

export default {
  state: {
    customersDict: {},
    customersTotalDict: {},
    customerKycInfoDict: {},
  },
  getters: {
    selectCustomers: state => queryParams => {
      return state.customersDict[generateKey(queryParams)];
    },
    selectCustomersTotal: state => queryParams => {
      return state.customersTotalDict[generateKey(_.omit(queryParams, ["page_index"]))];
    },
    selectCustomerKycInfo: state => customerId => {
      return state.customerKycInfoDict[generateKey([customerId])];
    },
  },
  mutations: {
    setCustomers(state, payload) {
      Vue.set(state.customersDict, payload.key, payload.value);
    },
    setCustomersTotal(state, payload) {
      Vue.set(state.customersTotalDict, payload.key, payload.value);
    },
    setCustomerKycInfo(state, payload) {
      Vue.set(state.customerKycInfoDict, payload.key, payload.value);
    },
  },
  actions: {
    async getCustomers({ commit }, queryParams) {
      const result = await customerApi.getCustomers(queryParams);
      commit("setCustomers", {
        key: generateKey(queryParams),
        value: result.result.records,
      });
      commit("setCustomersTotal", {
        key: generateKey(_.omit(queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async customerJoin(context, payload) {
      await customerApi.customerJoin(payload);
    },
    async submitCustomerJoinInfo(context, data) {
      await customerApi.submitCustomerJoinInfo(data);
    },
    async uploadCustomerJoinFileFinish() {
      await customerApi.uploadCustomerJoinFileFinish();
    },
    async activateCustomer(context, token) {
      await customerApi.activateCustomer(token);
    },
    async getCustomerKycInfo({ commit }, customerId) {
      const result = await customerApi.getCustomerKycInfo(customerId);
      commit("setCustomerKycInfo", {
        key: generateKey([customerId]),
        value: result.result,
      });
    },
    async getCustomerKycFile(context, queryParams) {
      return await customerApi.getCustomerKycFile(queryParams);
    },
    async getCustomerAllKycFiles(context, customerId) {
      return await customerApi.getCustomerAllKycFiles(customerId);
    },
    async firstReviewCustomer(context, data) {
      await customerApi.firstReviewCustomer(data);
    },
    async rcoReviewCustomer(context, data) {
      await customerApi.rcoReviewCustomer(data);
    },
  },
};
