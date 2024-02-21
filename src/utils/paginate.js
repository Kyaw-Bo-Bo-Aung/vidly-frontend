import _ from "lodash";

export function paginate(data, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  return _(data).slice(startIndex).take(pageSize).value();
}
