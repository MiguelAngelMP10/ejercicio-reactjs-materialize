import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  useGridSlotComponentProps,
} from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";
import AddIcon from "@material-ui/icons/Add";
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
    penalizacion: "penalizacion 1",
    descripcion: "descripcion penalizacion",
    estatus: "Activo",
  },

  {
    id: 2,
    penalizacion: "penalizacion 2",
    descripcion: "descripcion penalizacion",
    estatus: "Activo",
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

export default function ListPenalizaciones() {
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
    { field: "penalizacion", headerName: "penalizacions", width: 250 },
    { field: "descripcion", headerName: "Descripcion", width: 250 },
    { field: "estatus", headerName: "Estatus", width: 250 },
    {
      field: "eliminar",
      headerName: "Eliminar",
      width: 130,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Eliminar
          </Button>
        </strong>
      ),
    },
    {
      field: "modificar",
      headerName: "Modificar",
      width: 130,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Modificar
          </Button>
        </strong>
      ),
    },
  ];

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const classes = useStyles();

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          <AddIcon></AddIcon>
          Agregar Penalizacion
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
          Agregar penalizacion
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="nombre-penalizacion">
                Nombre penalizacion
              </InputLabel>
              <Input
                id="nombre-penalizacion"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="descripcion">Descripcion</InputLabel>
              <Input
                id="descripcion"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>

            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
              >
                <MenuItem value={"activo"}>Activo</MenuItem>
                <MenuItem value={"inactivo"}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleAddUser} color="primary">
            <AddIcon></AddIcon>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
