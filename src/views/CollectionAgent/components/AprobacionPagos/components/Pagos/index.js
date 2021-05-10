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
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
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
    estatus: "NO pagado",
  },
  {
    id: 2,
    usuario: "Miguel Angel Muñoz Pozos",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "No pagado",
  },
  {
    id: 3,
    usuario: "Angel Muñoz Pozos",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "NO pagado",
  },
  {
    id: 4,
    usuario: "Miguel Angel Muñoz Pozos",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "No pagado",
  },
  {
    id: 5,
    usuario: "Miguel Angel Muñoz Pozos",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "No pagado",
  },
  {
    id: 6,
    usuario: "Miguel Angel ",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "No pagado",
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
    estatus: "No pagado",
  },
  {
    id: 9,
    usuario: "Pedro Cruz",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "NO pagado",
  },
  {
    id: 10,
    usuario: "Miguel Angel Marquez",
    importe: "$250.00",
    interes: "$0.0",
    saldos: "$0.0",
    estatus: "No pagado",
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

export default function Pagos() {
  const [open, setOpen] = React.useState(false);
  const [metodoPago, setMetodoPago] = React.useState("");
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handlePay = () => {
    setOpen(false);
    alert("Pagado con " + state.checkedA);
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
              setOpen(true);
            }}
          >
            Aprobar pago
          </Button>
        </strong>
      ),
    },
  ];

  const handleChange = (event) => {
    setMetodoPago(event.target.value);
  };

  const classes = useStyles();

  const handleChangeCheckBox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
          Pago de : "Miguel Angel Muñoz Pozos",
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.formControl} fullWidth={true}>
              {handleMetodos(metodoPago)}
            </FormControl>
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={state.checkedA}
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
          <Button autoFocus onClick={handlePay} color="primary">
            Guardar
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