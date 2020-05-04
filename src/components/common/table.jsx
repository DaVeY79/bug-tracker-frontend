import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440,
    // marginTop: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    // overflowY: "hidden",
    "&::-webkit-scrollbar": {
      appearance: "none",
      width: 0,
      height: 0
    }
  }
});

export default function NewTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          aria-label="report table"
        >
          <TableHeader
            columns={props.columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody
            rows={props.rows}
            columns={props.columns}
            page={page}
            rowsPerPage={rowsPerPage}
            order={order}
            orderBy={orderBy}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 2, 4, 6]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
