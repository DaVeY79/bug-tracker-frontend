import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    // height: "10px !important"
    paddingTop: 4,
    paddingBottom: 4
  }
}))(TableCell);

// const StyledTableRow = withStyles(theme => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.background.default,
//       borderTopRightRadius: 10
//     }
//   }
// }))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  row: {
    borderTopRightRadius: 10,
    overflowX: "scroll"
  }
});

const TableHeader = props => {
  const classes = useStyles();

  const { columns, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.header}>
      <TableRow>
        {columns.map(column => (
          <StyledTableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
              // hideSortIcon={false}
              // IconComponent={<ExpandLessIcon />}
            >
              {column.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
