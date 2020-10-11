import Vue from "vue";
import _ from "lodash";
import generateKey from "@/utils/generateKey";
import * as workflowApi from "@/api/workflow";

export default {
  state: {
    workflowsDict: {},
    workflowsTotalDict: {},
    workflowDetailDict: {},
    workflowsTodoTotal: null,
  },
  getters: {
    selectWorkflows: state => queryParams => {
      return state.workflowsDict[generateKey(queryParams)];
    },
    selectWorkflowsTotal: state => queryParams => {
      return state.workflowsTotalDict[generateKey(_.omit(queryParams, ["page_index"]))];
    },
    selectWorkflowDetail: state => tx_id => {
      return state.workflowDetailDict[generateKey([tx_id])];
    },
    workflowsTodoTotal: state => state.workflowsTodoTotal,
  },
  mutations: {
    setWorkflows(state, payload) {
      Vue.set(state.workflowsDict, payload.key, payload.value);
    },
    setWorkflowsTotal(state, payload) {
      Vue.set(state.workflowsTotalDict, payload.key, payload.value);
    },
    setWorkflowDetail(state, payload) {
      Vue.set(state.workflowDetailDict, payload.key, payload.value);
    },
    setWorkflowsTodoTotal(state, payload) {
      state.workflowsTodoTotal = payload;
    },
  },
  actions: {
    async getWorkflows({ commit }, queryParams) {
      const result = await workflowApi.getWorkflows(queryParams);
      commit("setWorkflows", {
        key: generateKey(queryParams),
        value: result.result.records,
      });
      commit("setWorkflowsTotal", {
        key: generateKey(_.omit(queryParams, ["page_index"])),
        value: result.result.total,
      });
      commit("setWorkflowsTodoTotal", result.result.todo_total);
    },
    async getWorkflowDetail({ commit }, tx_id) {
      const result = await workflowApi.getWorkflowDetail(tx_id);
      commit("setWorkflowDetail", { key: generateKey([tx_id]), value: result.result });
    },
  },
};
