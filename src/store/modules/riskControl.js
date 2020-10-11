import * as riskControlApi from "@/api/riskControl";

export default {
  state: {
    riskControl: null,
  },
  getters: {
    riskControl: state => state.riskControl,
  },
  mutations: {
    setRiskControls(state, payload) {
      state.riskControls = payload;
    },
  },
  actions: {
    async getRiskControls({ commit }) {
      const result = await riskControlApi.getRiskControls();
      commit("setRiskControls", result.result);
      return result.result;
    },
    async setRiskControls(context, data) {
      await riskControlApi.setRiskControls(data);
    },
  },
};
