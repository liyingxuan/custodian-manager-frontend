import Vue from "vue";
import _ from "lodash";
import generateKey from "@/utils/generateKey";
import * as transactionApi from "@/api/transaction";

export default {
  state: {
    transactionsDict: {},
    transactionsTotalDict: {},
    transactionDetailDict: {},
    transactionApprovalFlowDict: {},
    transactionCo_signFlowDict: {},
    transactionFeeDict: {},
    coinPrice: null,
  },
  getters: {
    selectTransactions: state => queryParams => {
      return state.transactionsDict[generateKey(queryParams)];
    },
    selectTransactionsTotal: state => queryParams => {
      return state.transactionsTotalDict[generateKey(_.omit(queryParams, ["page_index"]))];
    },
    selectCustomerTransactions: state => ({ customerId, queryParams }) => {
      return state.transactionsDict[generateKey([customerId], queryParams)];
    },
    selectCustomerTransactionsTotal: state => ({ customerId, queryParams }) => {
      return state.transactionsTotalDict[
        generateKey([customerId], _.omit(queryParams, ["page_index"]))
      ];
    },
    selectTransactionDetail: state => tx_id => {
      return state.transactionDetailDict[generateKey([tx_id])];
    },
    selectTransactionApprovalFlow: state => tx_id => {
      return state.transactionApprovalFlowDict[generateKey([tx_id])];
    },
    selectTransactionCo_signFlow: state => tx_id => {
      return state.transactionCo_signFlowDict[generateKey([tx_id])];
    },
    selectTransactionFee: state => queryParams => {
      return state.transactionFeeDict[generateKey(queryParams)];
    },
    coinPrice: state => state.coinPrice,
  },
  mutations: {
    setTransactions(state, payload) {
      Vue.set(state.transactionsDict, payload.key, payload.value);
    },
    setTransactionsTotal(state, payload) {
      Vue.set(state.transactionsTotalDict, payload.key, payload.value);
    },
    setTransactionDetail(state, payload) {
      Vue.set(state.transactionDetailDict, payload.key, payload.value);
    },
    setTransactionApprovalFlow(state, payload) {
      Vue.set(state.transactionApprovalFlowDict, payload.key, payload.value);
    },
    setTransactionCo_signFlow(state, payload) {
      Vue.set(state.transactionCo_signFlowDict, payload.key, payload.value);
    },
    setTransactionFee(state, payload) {
      Vue.set(state.transactionFeeDict, payload.key, payload.value);
    },
    setCoinPrice(state, payload) {
      state.coinPrice = payload;
    },
  },
  actions: {
    async getTransactions({ commit }, queryParams) {
      const result = await transactionApi.getTransactions(queryParams);
      commit("setTransactions", { key: generateKey(queryParams), value: result.result.records });
      commit("setTransactionsTotal", {
        key: generateKey(_.omit(queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async getCustomerTransactions({ commit }, payload) {
      const result = await transactionApi.getCustomerTransactions(payload);
      commit("setTransactions", {
        key: generateKey([payload.customerId], payload.queryParams),
        value: result.result.records,
      });
      commit("setTransactionsTotal", {
        key: generateKey([payload.customerId], _.omit(payload.queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async getTransactionDetail({ commit }, tx_id) {
      const result = await transactionApi.getTransactionDetail(tx_id);
      commit("setTransactionDetail", { key: generateKey([tx_id]), value: result.result });
    },
    async getTransactionApprovalFlow({ commit }, tx_id) {
      const result = await transactionApi.getTransactionApprovalFlow(tx_id);
      commit("setTransactionApprovalFlow", { key: generateKey([tx_id]), value: result.result });
    },
    async getTransactionCo_signFlow({ commit }, tx_id) {
      const result = await transactionApi.getTransactionCo_signFlow(tx_id);
      commit("setTransactionCo_signFlow", { key: generateKey([tx_id]), value: result.result });
    },
    async withdraw(context, payload) {
      await transactionApi.withdraw(payload);
    },
    async getTransactionFee({ commit }, queryParams) {
      const result = await transactionApi.getTransactionFee(queryParams);
      commit("setTransactionFee", { key: generateKey(queryParams), value: result.result });
    },
    async approveTransaction(context, payload) {
      await transactionApi.approveTransaction(payload);
    },
    async getTransactionParams(context, payload) {
      return (await transactionApi.getTransactionParams(payload)).result;
    },
    async signTransaction(context, payload) {
      await transactionApi.signTransaction(payload);
    },
    async getCoinPrice({ commit }) {
      const result = await transactionApi.getCoinPrice();
      commit("setCoinPrice", result.result);
    },
  },
};
