import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    marginRight: "1rem !important",
  },
});

const TableComponent = ({ data, columns, actions }) => {
  const classes = useStyles();
  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id}>{column.label}</TableCell>
          ))}
          {actions && <TableCell>Acciones</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {column.format ? column.format(row[column.id]) : row[column.id]}
              </TableCell>
            ))}
            {actions && (
              <TableCell>
                {actions.map((action) => (
                  <Button
                    color={action.color}
                    variant="contained"
                    className={classes.button}
                    key={action.label}
                    onClick={() => action.onClick(row)}
                  >
                    {action.label}
                  </Button>
                ))}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
