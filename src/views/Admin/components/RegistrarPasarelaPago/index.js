import { useState, useContext, useEffect } from "react";
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
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SistemaContext from "../../../../context/sistema";

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
  const [open, setOpen] = useState(false);
  const [cambios, setcambios] = useState(false);

  const { pasarelas, getPasarelas, addPasarela } = useContext(SistemaContext);

  useEffect(() => {
    getPasarelas().then().catch(null);
  }, [cambios]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddPasarela = async () => {
    setOpen(false);
    let info = {
      nombrePasarela: document.querySelector("#nombre-pasarela").value,
      clavePublica: document.querySelector("#clave-publica").value,
      claveSecreta: document.querySelector("#clave-publica").value,
    };
    setcambios(false);
    await addPasarela(info).then().catch(null);
    setcambios(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombrePasarela", headerName: "pasarela", width: 250 },
    { field: "clavePublica", headerName: "Clave Publica", width: 250 },
    { field: "claveSecreta", headerName: "Clave Secreta", width: 250 },
  ];

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
        rows={pasarelas}
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
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Agregar pasarela
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth>
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
            <FormControl className={classes.margin} fullWidth>
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
            <FormControl className={classes.margin} fullWidth>
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
              fullWidth
            ></FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleAddPasarela} color="primary">
            <AccountBalanceIcon />
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
