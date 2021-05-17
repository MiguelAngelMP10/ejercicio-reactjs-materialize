import { useState, useContext, useEffect } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pasarela from "../Pasarela";
import Transferencia from "../Transferencia";
import Efectivo from "../Efectivo";
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
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function MisPagos() {
  const [open, setOpen] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");
  const { pagos, getPagos, updatePago } = useContext(SistemaContext);

  const [pagado, setPagado] = useState(false);

  const [row, setRow] = useState([]);

  useEffect(() => {
    getPagos().then().catch(null);
  }, [pagado]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePay = async () => {
    setOpen(false);
    let monto = document.querySelector("#standard-adornment-monto").value;
    await updatePago(row.id, "Pagado").then().catch(null);

    setPagado(true);
    alert("Pagado con el metodo " + metodoPago + " el monto $" + monto);
    setPagado(false);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "concepto", headerName: "Concepto", width: 250 },
    {
      field: "fechaVencimiento",
      headerName: "Fecha de vencimiento",
      width: 200,
    },
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
      field: "pagar",
      headerName: "pagar",
      width: 130,
      renderCell: (params) => (
        <strong>
          {params.row.estatus !== "Pagado" ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setOpen(true);
                setRow(params.row);
              }}
            >
              Pagar
            </Button>
          ) : (
            "Pagado"
          )}
        </strong>
      ),
    },
  ];

  const handleChange = (event) => {
    setMetodoPago(event.target.value);
  };

  const classes = useStyles();

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={pagos}
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
          Pagar concepto
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <TextField
              disabled
              id="filled-disabled"
              label="id"
              defaultValue={row.id}
              variant="filled"
              fullWidth={true}
            />
            <TextField
              disabled
              id="filled-disabled"
              label="Concepto"
              defaultValue={row.concepto}
              variant="filled"
              fullWidth={true}
            />

            <TextField
              disabled
              id="id"
              label="importe"
              defaultValue={row.importe}
              variant="filled"
              fullWidth={true}
            />
            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel id="demo-simple-select-label">
                Opcion de pago
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={metodoPago}
                onChange={handleChange}
              >
                <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                <MenuItem value={"Trasferencia"}>Trasferencia</MenuItem>
                <MenuItem value={"PasarelaPago"}>Pasarela de pago</MenuItem>
              </Select>
              {handleMetodos(metodoPago)}
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handlePay} color="primary">
            Pagar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function handleMetodos(metodoPago) {
  switch (metodoPago) {
    case "Efectivo":
      return <Efectivo></Efectivo>;
    case "Trasferencia":
      return <Transferencia></Transferencia>;
    case "PasarelaPago":
      return <Pasarela></Pasarela>;
    default:
  }
}
