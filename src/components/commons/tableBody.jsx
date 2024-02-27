import React from "react";
import _ from "lodash";

const TableBody = ({data, columns}) => {
  const renderCell = (item, column) => {
    if(column.content) return column.content(item);

    return _.get(item, column.path);
  }

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  }

  return (
    <tbody>
      {data.map((data) => {
        return (
          <tr key={data._id}>
            {columns.map((col) => (
              <td key={createKey(data, col)}>{renderCell(data, col)}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
