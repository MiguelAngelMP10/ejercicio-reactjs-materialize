import { useState, useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import CancelIcon from "@material-ui/icons/Cancel";
import SistemaContext from "../../../../../../context/sistema";
import Efectivo from "../Efectivo";
import Transferencia from "../Transferencia";
import Pasarela from "../Pasarela";
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

export default function MisSuscripciones() {
  const { getSuscripciones, suscripciones, updateSucripciones } =
    useContext(SistemaContext);
  const [row, setRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [metodoPago, setMetodoPago] = useState("");

  const [pagado, setPagado] = useState(false);
  const [suscrito, setSuscrito] = useState(false);
  const [renovado, setRenovado] = useState(false);
  const classes = useStyles();

  const handlePay = async () => {
    setOpen(false);
    await updateSucripciones(row.id, "Pagado").then().catch(null);
    setPagado(true);
    alert("Se pago su suscripcion con el metodo " + metodoPago);
    setPagado(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getSuscripciones().then().catch(null);
  }, [pagado, suscrito, renovado]);

  const handleChange = (event) => {
    setMetodoPago(event.target.value);
  };

  const [cancelar, setCancelar] = useState(false);

  const handleCloseCancel = () => {
    setCancelar(false);
  };

  const handleCancelSubscription = async () => {
    setCancelar(false);
    setSuscrito(true);
    await updateSucripciones(row.id, "Cancelado").then().catch(null);
    setSuscrito(false);
  };

  //renovar

  const [modalRenovar, setModalRenovar] = useState(false);

  const handleCloseModalRonovar= () => {
    setModalRenovar(false);
  };

  const   handleRenovarSubscription = async () => {
    setModalRenovar(false);
    setRenovado(true);
    await updateSucripciones(row.id, "Pagado").then().catch(null);
    setRenovado(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "suscripcion", headerName: "Nombre suscripcion", width: 300 },
    { field: "fechaInicio", headerName: "fecha Inicio", width: 150 },
    { field: "estatus", headerName: "Estatus", width: 130 },
    {
      field: "pagar",
      headerName: "Pagar",
      width: 130,
      renderCell: (params) => (
        <strong>
          {params.row.estatus === "No pagado" ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setRow(params.row);
                setOpen(true);
              }}
              startIcon={<PaymentIcon />}
            >
              Pagar
            </Button>
          ) : (
            ""
          )}
        </strong>
      ),
    },
    {
      field: "renovar",
      headerName: "Renovar",
      width: 155,
      renderCell: (params) => (
        <strong>
          {params.row.estatus === "Cancelado" ? (
            <Button
              variant="outlined"
              color="default"
              onClick={() => {
                setRow(params.row);
                setModalRenovar(true);
              }}
              startIcon={<PaymentIcon />}
            >
              Renovar
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={() => {
                setRow(params.row);
                setCancelar(true);
              }}
            >
              cancelar
            </Button>
          )}
        </strong>
      ),
    },
  ];

  //cancelar

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={suscripciones} columns={columns} pageSize={10} />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Pagar suscripcion
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
              label="suscripcion"
              defaultValue={row.suscripcion}
              variant="filled"
              fullWidth={true}
            />

            <TextField
              disabled
              id="fechaInicio"
              label="Fecha Inicio"
              defaultValue={row.fechaInicio}
              variant="filled"
              fullWidth={true}
            />

            <TextField
              disabled
              id="Estatus"
              label="Estatus"
              defaultValue={row.estatus}
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
      
      <Dialog
        open={cancelar}
        keepMounted
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"¿Esta seguro de cancelar la suscripcion?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Se dejara de cobrar el valor de la subcripción
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="secondary">
            No
          </Button>
          <Button onClick={handleCancelSubscription} color="primary">
            Si
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={modalRenovar}
        keepMounted
        onClose={handleCloseModalRonovar}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"¿Esta seguro de Renovar la suscripcion?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Se cobrara el valor de la subcripción
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalRonovar} color="secondary">
            No
          </Button>
          <Button onClick={handleRenovarSubscription} color="primary">
            Si
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
