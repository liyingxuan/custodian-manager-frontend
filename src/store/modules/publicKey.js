import Vue from "vue";
import _ from "lodash";
import generateKey from "@/utils/generateKey";
import * as publicKeyApi from "@/api/publicKey";

export default {
  state: {
    publicKeysDict: {},
    publicKeysTotalDict: {},
    publicKeysUnusedStat: null,
  },
  getters: {
    selectPublicKeys: state => queryParams => {
      return state.publicKeysDict[generateKey(queryParams)];
    },
    selectPublicKeysTotal: state => queryParams => {
      return state.publicKeysTotalDict[generateKey(_.omit(queryParams, ["page_index"]))];
    },
    publicKeysUnusedStat: state => state.publicKeysUnusedStat,
  },
  mutations: {
    setPublicKeys(state, payload) {
      Vue.set(state.publicKeysDict, payload.key, payload.value);
    },
    setPublicKeysTotal(state, payload) {
      Vue.set(state.publicKeysTotalDict, payload.key, payload.value);
    },
    setPublicKeysUnusedStat(state, payload) {
      state.publicKeysUnusedStat = payload;
    },
  },
  actions: {
    async getPublicKeys({ commit }, queryParams) {
      const result = await publicKeyApi.getPublicKeys(queryParams);
      commit("setPublicKeys", {
        key: generateKey(queryParams),
        value: result.result.records,
      });
      commit("setPublicKeysTotal", {
        key: generateKey(_.omit(queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async getPublicKeyPaths(context, queryParams) {
      return (await publicKeyApi.getPublicKeyPaths(queryParams)).result;
    },
    async getPublicKeysUnusedStat({ commit }) {
      const result = await publicKeyApi.getPublicKeysUnusedStat();
      commit("setPublicKeysUnusedStat", result.result);
    },
    async addPublicKeys(context, data) {
      await publicKeyApi.addPublicKeys(data);
    },
  },
};
