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
  DialogTitle,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SistemaContext from "../../../../../../context/sistema";
import { set } from "date-fns";

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

export default function Pagos() {
  const [open, setOpen] = useState(false);
  const [checkedA, setCheckedA] = useState(false);
  const [row, setRow] = useState({});
  const [cambio, setCambio] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
      field: "aprobarPago",
      headerName: "Aprobar Pago",
      width: 180,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setRow(params.row);
              setCheckedA(params.row.estatus === "Aprobado" ? true : false);
              setOpen(true);
            }}
          >
            Aprobar pago
          </Button>
        </strong>
      ),
    },
  ];

  const classes = useStyles();

  const handleChangeCheckBox = (event) => {
    setCheckedA(event.target.checked);
  };

  const { pagosDeposito, getPagosDeposito, updatePagoDeposito } =
    useContext(SistemaContext);

  const updatePagoDepositoLocal = async () => {
    setOpen(false);
    setCambio(false);
    await updatePagoDeposito(row.id, checkedA ? "Aprobado" : "No Aprobado")
      .then()
      .catch(null);
    setCambio(true);
  };

  useEffect(() => {
    getPagosDeposito().then().catch(null);
  }, [cambio]);

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
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Concepto por pagar {row.concepto}
        </DialogTitle>
        <DialogContent dividers>
          <FormControlLabel
            control={
              <Switch
                checked={checkedA}
                onChange={handleChangeCheckBox}
                name="checkedA"
                color="primary"
              />
            }
            label="Aprobar pago"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={updatePagoDepositoLocal} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
