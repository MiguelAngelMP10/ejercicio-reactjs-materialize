import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import PrintIcon from "@material-ui/icons/Print";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "sucripcion", headerName: "Descripcion recibo", width: 300 },
  { field: "fechaInicio", headerName: "fecha Inicio", width: 150 },
  { field: "estatus", headerName: "Estatus", width: 130 },
  {
    field: "pagar",
    headerName: "Pagar",
    width: 150,
    renderCell: (params) => (
      <strong>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            //setOpen(true);
          }}
          startIcon={<PrintIcon />}
        >
          Imprimir
        </Button>
      </strong>
    ),
  },
];

const rows = [
  {
    id: 1,
    sucripcion: "Uniformes",
    fechaInicio: "19/09/2020",
    estatus: "Vigente",
    pagar: "",
    renovar: "",
    cancelar: "",
  },
  {
    id: 2,
    sucripcion: "Voletin de ofertas",
    fechaInicio: "19/09/2020",
    estatus: "Vigente",
    pagar: "",
    renovar: "",
    cancelar: "",
  },
  {
    id: 3,
    sucripcion: "Desayunador",
    fechaInicio: "19/09/2020",
    estatus: "Cancelado",
    pagar: "",
    renovar: "",
    cancelar: "",
  },
];

export default function MisRecibos() {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
