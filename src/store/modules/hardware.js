import Vue from "vue";
import _ from "lodash";
import generateKey from "@/utils/generateKey";
import * as hardwareApi from "@/api/hardware";

export default {
  state: {
    hardwaresDict: {},
    hardwaresTotalDict: {},
    myHardwares: null,
    hardwareDetailDict: {},
  },
  getters: {
    selectHardwares: state => queryParams => {
      return state.hardwaresDict[generateKey(queryParams)];
    },
    selectHardwaresTotal: state => queryParams => {
      return state.hardwaresTotalDict[generateKey(_.omit(queryParams, ["page_index"]))];
    },
    myHardwares: state => state.myHardwares,
    selectHardwareDetail: state => number => {
      return state.hardwareDetailDict[generateKey([number])];
    },
  },
  mutations: {
    setHardwares(state, payload) {
      Vue.set(state.hardwaresDict, payload.key, payload.value);
    },
    setHardwaresTotal(state, payload) {
      Vue.set(state.hardwaresTotalDict, payload.key, payload.value);
    },
    setMyHardwares(state, payload) {
      state.myHardwares = payload;
    },
    setHardwareDetail(state, payload) {
      Vue.set(state.hardwareDetailDict, payload.key, payload.value);
    },
  },
  actions: {
    async getHardwares({ commit }, queryParams) {
      const result = await hardwareApi.getHardwares(queryParams);
      commit("setHardwares", {
        key: generateKey(queryParams),
        value: result.result.records,
      });
      commit("setHardwaresTotal", {
        key: generateKey(_.omit(queryParams, ["page_index"])),
        value: result.result.total,
      });
    },
    async getMyHardwares({ commit }) {
      const result = await hardwareApi.getMyHardwares();
      commit("setMyHardwares", result.result);
    },
    async getHardwareDetail({ commit }, number) {
      const result = await hardwareApi.getHardwareDetail(number);
      commit("setHardwareDetail", { key: generateKey([number]), value: result.result });
    },
    async addHardware(context, data) {
      await hardwareApi.addHardware(data);
    },
    async modifyHardware(context, data) {
      await hardwareApi.modifyHardware(data);
    },
    async removeHardware(context, data) {
      await hardwareApi.removeHardware(data);
    },
  },
};
