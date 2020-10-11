import Vue from "vue";
import _ from "lodash";
import generateKey from "@/utils/generateKey";
import * as accountApi from "@/api/account";

export default {
  state: {
    accountsDict: {},
    accountsTotalDict: {},
    approverCandidates: null,
    approver: null,
    co_signerCandidates: null,
    platformAccounts: null,
    platformApproverCandidates: null,
    platformApprovers: null,
    platformCo_signerCandidates: null,
    platformCo_signers: null,
  },
  getters: {
    selectAccounts: state => queryParams => {
      return state.accountsDict[generateKey(queryParams)];
    },
    selectAccountsTotal: state => queryParams => {
      return state.accountsTotalDict[generateKey(_.omit(queryParams, ["page_index"]))];
    },
    approverCandidates: state => state.approverCandidates,
    approver: state => state.approver,
    co_signerCandidates: state => state.co_signerCandidates,
    selectCustomerAccounts: state => ({ customerId, queryParams }) => {
      return state.accountsDict[generateKey([customerId], queryParams)];
    },
    selectCustomerAccountsTotal: state => ({ customerId, queryParams }) => {
      return state.accountsTotalDict[
        generateKey([customerId], _.omit(queryParams, ["page_index"]))
      ];
    },
    platformAccounts: state => state.platformAccounts,
    platformApproverCandidates: state => state.platformApproverCandidates,
    platformApprovers: state => state.platformApprovers,
    platformCo_signerCandidates: state => state.platformCo_signerCandidates,
    platformCo_signers: state => state.platformCo_signers,
  },
  mutations: {
    setAccounts(state, payload) {
      Vue.set(state.accountsDict, payload.key, payload.value);
    },
    setAccountsTotal(state, payload) {
      Vue.set(state.accountsTotalDict, payload.key, payload.value);
    },
    setApproverCandidates(state, payload) {
      state.approverCandidates = payload;
    },
    setApprover(state, payload) {
      state.approver = payload;
    },
    setCo_signerCandidates(state, payload) {
      state.co_signerCandidates = payload;
    },
    setPlatformAccounts(state, payload) {
      state.platformAccounts = payload;
    },
    setPlatformApproverCandidates(state, payload) {
      state.platformApproverCandidates = payload;
    },
    setPlatformApprovers(state, payload) {
      state.platformApprovers = payload;
    },
    setPlatformCo_signerCandidates(state, payload) {
      state.platformCo_signerCandidates = payload;
    },
    setPlatformCo_signers(state, payload) {
      state.platformCo_signers = payload;
    },
  },
  actions: {
    async getAccounts({ commit }, queryParams) {
      const result = await accountApi.getAccounts(queryParams);
      commit("setAccounts", {
        key: generateKey(queryParams),
        value: result.result.records,
      });
      commit("setAccountsTotal", {
        key: generateKey(_.omit(queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async getCustomerAccounts({ commit }, payload) {
      const result = await accountApi.getCustomerAccounts(payload);
      commit("setAccounts", {
        key: generateKey([payload.customerId], payload.queryParams),
        value: result.result.records,
      });
      commit("setAccountsTotal", {
        key: generateKey([payload.customerId], _.omit(payload.queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async addAccount(context, data) {
      await accountApi.addAccount(data);
    },
    async resendAccountActivationEmail(context, data) {
      await accountApi.resendAccountActivationEmail(data);
    },
    async approveAccount(context, payload) {
      await accountApi.approveAccount(payload);
    },
    async freezeAccount(context, data) {
      await accountApi.freezeAccount(data);
    },
    async getApproverCandidates({ commit }) {
      const result = await accountApi.getApproverCandidates();
      commit("setApproverCandidates", result.result);
      return result.result;
    },
    async getApprover({ commit }) {
      const result = await accountApi.getApprover();
      commit("setApprover", result.result);
      return result.result;
    },
    async setApprover(context, payload) {
      await accountApi.setApprover(payload);
    },
    async getCo_signerCandidates({ commit }) {
      const result = await accountApi.getCo_signerCandidates();
      commit("setCo_signerCandidates", result.result);
      return result.result;
    },
    async getPlatformAccounts({ commit }) {
      const result = await accountApi.getPlatformAccounts();
      commit("setPlatformAccounts", result.result);
      return result.result;
    },
    async getPlatformApproverCandidates({ commit }) {
      const result = await accountApi.getPlatformApproverCandidates();
      commit("setPlatformApproverCandidates", result.result);
      return result.result;
    },
    async getPlatformApprovers({ commit }) {
      const result = await accountApi.getPlatformApprovers();
      commit("setPlatformApprovers", result.result);
      return result.result;
    },
    async setPlatformApprovers(context, data) {
      await accountApi.setPlatformApprovers(data);
    },
    async getPlatformCo_signerCandidates({ commit }) {
      const result = await accountApi.getPlatformCo_signerCandidates();
      commit("setPlatformCo_signerCandidates", result.result);
      return result.result;
    },
    async getPlatformCo_signers({ commit }) {
      const result = await accountApi.getPlatformCo_signers();
      commit("setPlatformCo_signers", result.result);
      return result.result;
    },
    async setPlatformCo_signers(context, data) {
      await accountApi.setPlatformCo_signers(data);
    },
  },
};
