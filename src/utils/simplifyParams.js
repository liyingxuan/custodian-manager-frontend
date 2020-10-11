import _ from "lodash";

export default function simplifyParams(params) {
  return _.omitBy(params, _.isUndefined);
}
