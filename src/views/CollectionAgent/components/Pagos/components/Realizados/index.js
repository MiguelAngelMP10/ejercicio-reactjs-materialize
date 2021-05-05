import * as React from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const rows = [
  {
    id: 1,
    usuario: "Miguel Angel Muñoz Pozos",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "pagado",
  },
  {
    id: 2,
    usuario: "Miguel Angel Muñoz Pozos",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "pagado",
  },
  {
    id: 3,
    usuario: "Angel Muñoz Pozos",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "pagado",
  },
  {
    id: 4,
    usuario: "Miguel Angel Muñoz Pozos",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "pagado",
  },
  {
    id: 5,
    usuario: "Miguel Angel Muñoz Pozos",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "pagado",
  },
  {
    id: 6,
    usuario: "Miguel Angel ",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "pagado",
  },
  {
    id: 7,
    usuario: "Jorge",
  },
  {
    id: 8,
    usuario: "Ara",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "pagado",
  },
  {
    id: 9,
    usuario: "Pedro Cruz",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "pagado",
  },
  {
    id: 10,
    usuario: "Miguel Angel Marquez",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "pagado",
  },
];

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
  const [open, setOpen] = React.useState(false);
  const [metodoPago, setMetodoPago] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handlePay = () => {
    setOpen(false);
    alert("Pagado con " + metodoPago);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "usuario", headerName: "Usuario", width: 270 },
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

  const handleChange = (event) => {
    setMetodoPago(event.target.value);
  };

  const classes = useStyles();

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
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
          usuario: "Miguel Angel Muñoz Pozos",
        </DialogTitle>
        <DialogContent dividers>
          <div>
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
      return;
    case "Trasferencia":
      return "";
    case "PasarelaPago":
      return "";
    default:
  }
}
