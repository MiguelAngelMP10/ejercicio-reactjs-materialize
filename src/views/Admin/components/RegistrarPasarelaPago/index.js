import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  useGridSlotComponentProps,
} from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
const rows = [
  {
    id: 1,
    pasarela: "Conecta",
    clavePublica:
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    claveSecreta: "XCIATictiVERmA",
  },

  {
    id: 6,
    pasarela: "PayPal",
    clavePublica:
      "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bbchez",
    claveSecreta: "XCIATictiVERmA",
  },
  {
    id: 7,
    pasarela: "OpenPay",
    clavePublica:
      "8e2ceecbcb5c7a306792a3104b9b249f16e36d70da1ed02c7ba948690a0819b3",
    claveSecreta: "FuentXCIATictiVERmAes",
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

export default function RegistrarPasarelaPago() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddUser = () => {
    setOpen(false);
    alert(user);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "pasarela", headerName: "pasarela", width: 250 },
    { field: "clavePublica", headerName: "Clave Publica", width: 250 },
    { field: "claveSecreta", headerName: "Clave Secreta", width: 250 },
  ];

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const classes = useStyles();

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          <AccountBalanceIcon />
          Agregar pasarela
        </Button>
      </Grid>
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
          Agregar pasarela
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="nombre-pasarela">Nombre pasarela</InputLabel>
              <Input
                id="nombre-pasarela"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountBalanceIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="clave-publica">Clave Publica</InputLabel>
              <Input
                id="clave-publica"
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="clave-secreta">Clave Secreta</InputLabel>
              <Input
                id="clave-secreta"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              fullWidth={true}
            ></FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleAddUser} color="primary">
            <AccountBalanceIcon />
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
