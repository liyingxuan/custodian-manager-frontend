import _ from "lodash";
import url from "url";

export default function generateKey(pathParams, queryParams) {
  if (_.isPlainObject(pathParams)) {
    queryParams = pathParams;
    pathParams = [];
  }
  if (!_.isArray(pathParams)) {
    pathParams = [];
  }
  if (!_.isPlainObject(queryParams)) {
    queryParams = {};
  }
  return pathParams.join("/") + url.format({ query: queryParams });
}
