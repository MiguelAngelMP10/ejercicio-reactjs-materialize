import { useContext, useState, useEffect } from "react";
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
import SistemaContext from "../../../../context/sistema";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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

export default function RegistarAgente() {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterino, setApellidoMaterino] = useState("");
  const [tipoAgente, setTipoAgente] = useState("");
  const [cambio, setCambio] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [row, setRow] = useState({});
  const { getAgentes, agentes, addAgente, deleteAgente, updateAgente } =
    useContext(SistemaContext);

  useEffect(() => {
    getAgentes().then().catch(null);
  }, [cambio]);

  const handleClose = () => {
    setOpenModalAdd(false);
  };

  const handleCloseModalEliminar = () => {
    setOpenModalEliminar(false);
  };
  const handleCloseModalEditar = () => {
    setOpenModalEdit(false);
  };

  const handleClickOpen = () => {
    setOpenModalAdd(true);
  };

  const handleAddAgente = async () => {
    setOpenModalAdd(false);
    let agente = {
      nombre: nombre,
      apellidoPaterno: apellidoMaterino,
      apellidoMaterno: apellidoPaterno,
      tipoAgente: tipoAgente,
    };
    await addAgente(agente)
      .then((result) => {
        setCambio(true);
        setCambio(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteAgente = async () => {
    await deleteAgente(row.id)
      .then((result) => {
        console.log(result);
        setCambio(true);
        setCambio(false);
        setOpenModalEliminar(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAgente = async () => {
    setOpenModalEdit(false);
    let agente = {
      nombre: nombre,
      apellidoPaterno: apellidoMaterino,
      apellidoMaterno: apellidoPaterno,
      tipoAgente: tipoAgente,
    };
    await updateAgente(row.id, agente)
      .then((result) => {
        console.log(result);
        setCambio(true);
        setCambio(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "apellidoPaterno", headerName: "ApellidoPaterno", width: 250 },
    { field: "tipoAgente", headerName: "Tipo Agente", width: 250 },
    {
      field: "Eliminar ",
      headerName: "Eliminar",
      width: 180,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="secondary  "
            onClick={() => {
              setRow(params.row);
              setOpenModalEliminar(true);
            }}
          >
            <DeleteIcon />
            Eliminar
          </Button>
        </strong>
      ),
    },
    {
      field: "Modificar ",
      headerName: "Modificar",
      width: 180,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setRow(params.row);
              setOpenModalEdit(true);
              setTipoAgente(params.row.tipoAgente)
            }}
          >
            <EditIcon />
            Modificar
          </Button>
        </strong>
      ),
    },
  ];

  const handleChange = (event) => {
    setTipoAgente(event.target.value);
  };

  const classes = useStyles();

  return (
    <div style={{ height: 450, width: "100%" }} fullWidth>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          <PersonAddIcon></PersonAddIcon>
          Agregar Agente
        </Button>
      </Grid>
      <DataGrid
        rows={agentes}
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
        open={openModalAdd}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Agregar Agente
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="nombre-agente">Nombre agente</InputLabel>
              <Input
                onChange={(event) => setNombre(event.target.value)}
                id="nombre-agente"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="apellido-paterno-agente">
                Apellido Paterno agente
              </InputLabel>
              <Input
                onChange={(event) => setApellidoPaterno(event.target.value)}
                id="apellido-paterno-agente"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="apellido-materno-agente">
                Apellido Materno agente
              </InputLabel>
              <Input
                onChange={(event) => setApellidoMaterino(event.target.value)}
                id="apellido-materno-agente"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo agente</InputLabel>
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
          <Button autoFocus onClick={handleAddAgente} color="primary">
            <PersonAddIcon></PersonAddIcon>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openModalEliminar}
        onClose={handleCloseModalEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Esta Seguro de eliminar este agente?"}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={handleCloseModalEliminar}
            color="secondary"
            autoFocus
          >
            Cancelar
          </Button>
          <Button onClick={handleDeleteAgente} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={handleCloseModalEditar}
        aria-labelledby="customized-dialog-title"
        open={openModalEdit}
        fullWidth
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleCloseModalEditar}
        >
          Editar Agente
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="nombre-agente">Nombre agente</InputLabel>
              <Input
                onChange={(event) => setNombre(event.target.value)}
                defaultValue={row.nombre}
                id="nombre-agente"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="apellido-paterno-agente">
                Apellido Paterno agente
              </InputLabel>
              <Input
                onChange={(event) => setApellidoPaterno(event.target.value)}
                defaultValue={row.apellidoPaterno}
                id="apellido-paterno-agente"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="apellido-materno-agente">
                Apellido Materno agente
              </InputLabel>
              <Input
                onChange={(event) => setApellidoMaterino(event.target.value)}
                id="apellido-materno-agente"
                defaultValue={row.apellidoMaterno}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo agente</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={row.tipoAgente}
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
          <Button autoFocus onClick={handleCloseModalEditar} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleUpdateAgente} color="primary">
            <EditIcon />
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
