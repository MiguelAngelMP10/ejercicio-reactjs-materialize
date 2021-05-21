import { useState, useContext, useEffect } from "react";
import { DataGrid, GridToolbar, useGridSlotComponentProps } from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";

import { makeStyles } from "@material-ui/core/styles";
import SistemaContext from "../../../../../../context/sistema";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <Pagination
      className={{ display: "flex" }}
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function Realizados() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "concepto", headerName: "concepto", width: 270 },
    {
      field: "importe",
      headerName: "Importe",
      type: "number",
      width: 120,
    },
    {
      field: "interes",
      headerName: "Interés",
      type: "number",
      width: 130,
    },
    {
      field: "saldos",
      headerName: "Saldos",
      type: "number",
      width: 130,
    },
    {
      field: "estatus",
      headerName: "Estatus",
      type: "number",
      width: 130,
    },
  ];

  const classes = useStyles();

  const { pagosPagados, getPagosPagodos } = useContext(SistemaContext);

  useEffect(() => {
    getPagosPagodos().then().catch(null);
  }, []);


  return (
    <div style={{ height: 340, width: "100%" }}>
      <DataGrid
        rows={pagosPagados}
        columns={columns}
        pageSize={10}
        components={{
          Toolbar: GridToolbar,
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
}
