import * as reconciliationApi from "@/api/reconciliation";

export default {
  actions: {
    async getReconciliationFile({ commit }, queryParams) {
      return await reconciliationApi.getReconciliationFile(queryParams);
    },
  },
};
