import moment from "moment";

const inManager = process.env.PROJECT_NAME === "manager";

export function $formatEnumType(type, value) {
  if (!value) {
    return "";
  }
  if (this.$te(`enums.${type}.${value}`)) {
    return this.$t(`enums.${type}.${value}`);
  } else {
    console.warn(`Enums path not found: ${`enums.${type}.${value}`}`);
    return "";
  }
}

export function $formatDatetime(value) {
  if (!value) {
    return "";
  }
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
}

export function $formatDatetimeNav(value) {
  if (!value) {
    return "";
  }
  return moment(value).format("MMMM Do YYYY, h:mm a");
}

export function $formatApprovalFlow(flowData, options) {
  const tasks = [];
  if (flowData.initiator && !options.hideInitiator) {
    tasks.push({
      title: `Initiator: ${flowData.initiator.email}`,
      done: true,
    });
  }
  if (flowData.approver_list) {
    tasks.push(
      ...flowData.approver_list.map((item, index) => ({
        title: `Approver ${index + 1}: ${item.is_manager && !inManager ? "Platform" : item.email}`,
        done: item.status === "done",
      })),
    );
  }
  const firstUndoneTask = tasks.findIndex(task => !task.done);
  return {
    list: tasks.map(task => task.title),
    active: firstUndoneTask === -1 ? tasks.length - 1 : firstUndoneTask - 1,
  };
}

export function $formatCo_signFlow(flowData, options) {
  const tasks = [];
  if (flowData.initiator && !options.hideInitiator) {
    tasks.push({
      title: `Initiator: ${flowData.initiator.email}`,
      done: true,
    });
  }
  if (flowData.co_signer_list) {
    tasks.push(
      ...flowData.co_signer_list.map((item, index) => ({
        title: `Co-signer ${index + 1}: ${item.is_manager && !inManager ? "Platform" : item.email}`,
        done: item.status === "done",
      })),
    );
  }
  const firstUndoneTask = tasks.findIndex(task => !task.done);
  return {
    list: tasks.map(task => task.title),
    active: firstUndoneTask === -1 ? tasks.length - 1 : firstUndoneTask - 1,
  };
}
