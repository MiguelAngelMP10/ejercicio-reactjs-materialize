import { useContext, useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  useGridSlotComponentProps,
} from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import SistemaContext from "../../../../../../context/sistema";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function ListPagos() {
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({});
  const [cambio, setCambio] = useState(false);

  const { pagosDeposito, getPagosDeposito, updatePagoDeposito } =
    useContext(SistemaContext);

  const handleClose = async () => {
    setOpen(false);
    setCambio(false);
    await updatePagoDeposito(row.id, "Cancelado").then().catch(null);
    setCambio(true);
    setOpen(false);
  };

  useEffect(() => {
    getPagosDeposito().then().catch(null);
  }, [cambio]);

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
    {
      field: "Cancelar ",
      headerName: "Cancelar  Pago",
      width: 180,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setRow(params.row);

              setOpen(true);
            }}
          >
            Cancelar pago
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={pagosDeposito}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 50]}
        components={{
          Toolbar: GridToolbar,
          Pagination: CustomPagination,
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cancelar  el deposito"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta seguro de cancelar el deposito;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancelar pago
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
