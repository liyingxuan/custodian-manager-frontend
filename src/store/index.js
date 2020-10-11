import Vue from "vue";
import Vuex from "vuex";
import account from "./modules/account";
import address from "./modules/address";
import authentication from "./modules/authentication";
import customer from "./modules/customer";
import dashboard from "./modules/dashboard";
import hardware from "./modules/hardware";
import notification from "./modules/notification";
import publicKey from "./modules/publicKey";
import reconciliation from "./modules/reconciliation";
import riskControl from "./modules/riskControl";
import transaction from "./modules/transaction";
import workflow from "./modules/workflow";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    account,
    address,
    authentication,
    customer,
    dashboard,
    hardware,
    notification,
    publicKey,
    reconciliation,
    riskControl,
    transaction,
    workflow,
  },
});

export default store;
