import { useContext, useEffect, useState } from "react";
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
import SistemaContext from "../../../../../../context/sistema";

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

export default function UserList() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [savedUser, setSavedUser] =  useState(false)

  const { usuarios, getUsuarios, addUsuario, usuario } = useContext(SistemaContext);

  useEffect(() => {
    getUsuarios().then().catch(null);
  }, [savedUser]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddUser = async () => {
    setOpen(false);
    let user = {
      nombre: document.querySelector("#nombre-usuario").value,
      apellidoPaterno: document.querySelector("#nombre-usuario").value,
      apellidoMaterno: document.querySelector("#nombre-usuario").value,
    };
    await addUsuario(user).then().catch(null);
    setSavedUser(true);
    setSavedUser(false);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "apellidoPaterno", headerName: "ApellidoPaterno", width: 250 },
    { field: "apellidoMaterno", headerName: "Apellido Materno", width: 250 },
  ];

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const classes = useStyles();

 

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          <PersonAddIcon></PersonAddIcon>
          Agregar usuario
        </Button>
      </Grid>
      <DataGrid
        rows={usuarios}
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
          Agregar Usuario
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="nombre-usuario">Nombre usuario</InputLabel>
              <Input
                id="nombre-usuario"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="apellido-paterno-usuario">
                Apellido Paterno Usuario
              </InputLabel>
              <Input
                id="apellido-paterno-usuario"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="apellido-materno-usuario">
                Apellido Materno Usuario
              </InputLabel>
              <Input
                id="apellido-materno-usuario"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleAddUser} color="primary">
            <PersonAddIcon></PersonAddIcon>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
