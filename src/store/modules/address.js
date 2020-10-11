import Vue from "vue";
import _ from "lodash";
import generateKey from "@/utils/generateKey";
import * as addressApi from "@/api/address";

export default {
  state: {
    addressesDict: {},
    addressesTotalDict: {},
    addressDetailDict: {},
    addressApprovalFlowDict: {},
    addressCo_signFlowDict: {},
  },
  getters: {
    selectAddresses: state => queryParams => {
      return state.addressesDict[generateKey(queryParams)];
    },
    selectAddressesTotal: state => queryParams => {
      return state.addressesTotalDict[generateKey(_.omit(queryParams, ["page_index"]))];
    },
    selectCustomerAddresses: state => ({ customerId, queryParams }) => {
      return state.addressesDict[generateKey([customerId], queryParams)];
    },
    selectCustomerAddressesTotal: state => ({ customerId, queryParams }) => {
      return state.addressesTotalDict[
        generateKey([customerId], _.omit(queryParams, ["page_index"]))
      ];
    },
    selectAddressDetail: state => payload => {
      return state.addressDetailDict[generateKey([payload.address], payload.queryParams)];
    },
    selectAddressApprovalFlow: state => address => {
      return state.addressApprovalFlowDict[generateKey([address])];
    },
    selectAddressCo_signFlow: state => address => {
      return state.addressCo_signFlowDict[generateKey([address])];
    },
  },
  mutations: {
    setAddresses(state, payload) {
      Vue.set(state.addressesDict, payload.key, payload.value);
    },
    setAddressesTotal(state, payload) {
      Vue.set(state.addressesTotalDict, payload.key, payload.value);
    },
    setAddressDetail(state, payload) {
      Vue.set(state.addressDetailDict, payload.key, payload.value);
    },
    setAddressApprovalFlow(state, payload) {
      Vue.set(state.addressApprovalFlowDict, payload.key, payload.value);
    },
    setAddressCo_signFlow(state, payload) {
      Vue.set(state.addressCo_signFlowDict, payload.key, payload.value);
    },
  },
  actions: {
    async getAddresses({ commit }, queryParams) {
      const result = await addressApi.getAddresses(queryParams);
      commit("setAddresses", {
        key: generateKey(queryParams),
        value: result.result.records,
      });
      commit("setAddressesTotal", {
        key: generateKey(_.omit(queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async getCustomerAddresses({ commit }, payload) {
      const result = await addressApi.getCustomerAddresses(payload);
      commit("setAddresses", {
        key: generateKey([payload.customerId], payload.queryParams),
        value: result.result.records,
      });
      commit("setAddressesTotal", {
        key: generateKey([payload.customerId], _.omit(payload.queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async getAddressDetail({ commit }, payload) {
      const result = await addressApi.getAddressDetail(payload);
      commit("setAddressDetail", {
        key: generateKey([payload.address], payload.queryParams),
        value: result.result,
      });
    },
    async getAddressApprovalFlow({ commit }, address) {
      const result = await addressApi.getAddressApprovalFlow(address);
      commit("setAddressApprovalFlow", { key: generateKey([address]), value: result.result });
    },
    async getAddressCo_signFlow({ commit }, address) {
      const result = await addressApi.getAddressCo_signFlow(address);
      commit("setAddressCo_signFlow", { key: generateKey([address]), value: result.result });
    },
    async createAddress(context, payload) {
      await addressApi.createAddress(payload);
    },
    async getAddressLedgerPath(context, payload) {
      return (await addressApi.getAddressLedgerPath(payload)).result.path;
    },
    async addAddressPublicKey(context, payload) {
      await addressApi.addAddressPublicKey(payload);
    },
    async rejectCreateAddress(context, payload) {
      await addressApi.rejectCreateAddress(payload);
    },
  },
};
