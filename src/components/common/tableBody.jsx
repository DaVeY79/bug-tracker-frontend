import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const TableBodyData = props => {
  const { rows, columns, page, rowsPerPage, order, orderBy } = props;

  function renderCell(column, value, row) {
    if (column.content) return column.content(row);

    return column.format && typeof value === "number"
      ? column.format(value)
      : value;
  }

  return (
    <TableBody>
      {stableSort(rows, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(row => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {columns.map(column => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {renderCell(column, value, row)}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableBodyData;
