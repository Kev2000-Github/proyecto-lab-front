import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { Button, Paper, TableContainer, TablePagination, Box } from "@mui/material";
import './style.scss'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    marginRight: "1rem !important",
  },
});

const ROWS_PER_PAGE = [5, 10, 15]
const ROW_HEIGHT = 89
const HEADER_HEIGHT = 57
const TABLE_MAX_HEIGHT = ROW_HEIGHT * ROWS_PER_PAGE[0] + HEADER_HEIGHT

const TableComponent = ({ 
    data, 
    columns, 
    actions,
    page = 0,
    totalCount = 0,
    rowsPerPage = 5,
    handleRowsPerPage,
    handlePage
  }) => {
  const emptyRows = Math.max(0, rowsPerPage - data.length);
  const classes = useStyles();
  return (
    <Paper>
      <TableContainer sx={{ maxHeight: TABLE_MAX_HEIGHT }} >
        <Table 
          stickyHeader 
          className={classes.table} 
          aria-label="simple table"
        >
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
                    <Box sx={{width: column.width ?? 70}} className="noWrap">
                      {column.format ? column.format(row[column.id]) : row[column.id]}
                    </Box>
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
            {emptyRows > 0 && data.length < ROWS_PER_PAGE[0] && (
                <TableRow style={{ height: ROW_HEIGHT * Math.max(0, ROWS_PER_PAGE[0] - data.length) }}>
                  <TableCell colSpan={6} />
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          component="div"
          rowsPerPageOptions={[...ROWS_PER_PAGE]}
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePage}
          onRowsPerPageChange={handleRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
