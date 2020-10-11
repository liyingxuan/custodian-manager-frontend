import Vue from "vue";
import { Message } from "element-ui";

function handleError(error) {
  const vueInstance = window.vueInstance;
  if (error && vueInstance) {
    let message;
    // 处理API调用错误，转换错误码
    if (message == null && error.__apiError) {
      const code = error.code;
      if (code) {
        if (vueInstance.$te(`errors.Api.${code}`)) {
          message = vueInstance.$t(`errors.Api.${code}`);
        } else {
          console.warn(`Unhandled api error code: ${code}`, error);
        }
      }
    }
    // 处理Ledger错误，转换错误码
    if (message == null && error.__ledgerError) {
      const code = error.errorCode;
      if (code) {
        if (vueInstance.$te(`errors.Ledger.${code}`)) {
          message = vueInstance.$t(`errors.Ledger.${code}`);
        } else {
          console.warn(`Unhandled ledger error code: ${code}`, error);
        }
      }
    }
    // 处理标记了__showMessage的错误
    if (message == null && error.__showMessage) {
      message = error.msg || error.message;
    }
    if (message) {
      Message({ message, type: "error" });
    }
    console.error(error);
  }
}

window.addEventListener("unhandledrejection", event => handleError(event.reason));
Vue.config.errorHandler = error => handleError(error);
