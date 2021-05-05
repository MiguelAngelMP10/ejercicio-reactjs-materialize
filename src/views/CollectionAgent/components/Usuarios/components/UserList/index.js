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
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";

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
    usuario: "Miguel Angel",
    apellidoPaterno: "Muñoz",
    apellidoMaterno: "Pozos",
  },

  {
    id: 6,
    usuario: "Miguel ",
    apellidoPaterno: "sanchez",
    apellidoMaterno: "",
  },
  {
    id: 7,
    usuario: "Jorge",
    apellidoPaterno: "Cortez",
    apellidoMaterno: "Fuentes",
  },
  {
    id: 8,
    usuario: "Ara",
    apellidoPaterno: "Nava",
    apellidoMaterno: "",
  },
  {
    id: 9,
    usuario: "Pedro",
    apellidoPaterno: "Cruz",
    apellidoMaterno: "",
  },
  {
    id: 10,
    usuario: "Miguel Angel",
    apellidoPaterno: "Marquez",
    apellidoMaterno: "",
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

export default function UserList() {
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
    { field: "usuario", headerName: "Usuario", width: 250 },
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
            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel id="demo-simple-select-label">
                Tipo usuario
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
              >
                <MenuItem value={"general"}>General</MenuItem>
                <MenuItem value={"agentePagos"}>Agente de Pagos</MenuItem>
                <MenuItem value={"Administrador"}>Administrador</MenuItem>
              </Select>
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
