import { useContext, useEffect, useState } from "react";

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

export default function ListConceptosPago() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalModificar, setOpenModalModificar] = useState(false);

  const [estatus, setEstatus] = useState(1);
  const [changes, setChanges] = useState(false);
  const {
    getConceptos,
    conceptos,
    addConcepto,
    deleteConcepto,
    updateConcepto,
  } = useContext(SistemaContext);

  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [row, setRow] = useState({});
  useEffect(() => {
    getConceptos().then().catch(null);
  }, [changes]);

  const handleCloseModalEliminar = async () => {
    setOpenModalEliminar(false);

    await deleteConcepto(row.id).then().catch(null);
    setChanges(true);
    setChanges(false);
  };

  const handleCloseModalAgregar = () => {
    setOpenModalAgregar(false);
  };

  const handleClickOpenModalAgregar = () => {
    setOpenModalAgregar(true);
  };

  const handleCloseModalModificar = () => {
    setOpenModalModificar(false);
  };

  const handleClickOpenModalModificar = () => {
    setOpenModalModificar(true);
  };

  const handleAddConcepto = async () => {
    setOpenModalAgregar(false);
    let concepto = {
      concepto: document.querySelector("#nombre-concepto").value,
      descripcion: document.querySelector("#descripcion").value,
      estatus: estatus,
    };

    await addConcepto(concepto).then().catch(null);
    setChanges(true);
    setChanges(false);
  };

  const handleUpdateConcepto = async () => {
    setOpenModalModificar(false);
    let concepto = {
      concepto: document.querySelector("#nombre-concepto").value,
      descripcion: document.querySelector("#descripcion").value,
      estatus: estatus,
    };

    await updateConcepto(row.id, concepto).then().catch(null);
    setChanges(true);
    setChanges(false);
  };
  const handleChange = (event) => {
    setEstatus(event.target.value);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "concepto", headerName: "Conceptos", width: 250 },
    { field: "descripcion", headerName: "Descripcion", width: 250 },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 250,
      renderCell: (params) =>
        Boolean(params.row.estatus) ? "Activo" : "Inactivo",
    },
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
              setOpenModalEliminar(true);
              setRow(params.row);
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
              setOpenModalModificar(true);
              setRow(params.row);
            }}
          >
            Modificar
          </Button>
        </strong>
      ),
    },
  ];

  const classes = useStyles();

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpenModalAgregar}
        >
          <AddIcon></AddIcon>
          Agregar concepto
        </Button>
      </Grid>
      <DataGrid
        rows={conceptos}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 50]}
        components={{
          Toolbar: GridToolbar,
          Pagination: CustomPagination,
        }}
      />

      {/* Modal para agregar  */}
      <Dialog
        onClose={handleCloseModalAgregar}
        aria-labelledby="customized-dialog-title"
        open={openModalAgregar}
        fullWidth={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleCloseModalAgregar}
        >
          Agregar Concepto
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="nombre-concepto">Nombre concepto</InputLabel>
              <Input
                id="nombre-concepto"
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
                id="estatus-select"
                onChange={handleChange}
              >
                <MenuItem value={"1"}>Activo</MenuItem>
                <MenuItem value={"0"}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModalAgregar} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleAddConcepto} color="primary">
            <AddIcon></AddIcon>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para confirmar eliminacion  */}
      <Dialog
        open={openModalEliminar}
        onClose={handleCloseModalEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"??Esta Seguro de eliminar este concepto?"}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={handleCloseModalEliminar}
            color="secondary"
            autoFocus
          >
            Cancelar
          </Button>
          <Button onClick={handleCloseModalEliminar} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para modificar  */}
      <Dialog
        onClose={handleCloseModalModificar}
        aria-labelledby="customized-dialog-title"
        open={openModalModificar}
        fullWidth={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleCloseModalModificar}
        >
          Modificar Concepto
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="nombre-concepto">Nombre concepto</InputLabel>
              <Input
                id="nombre-concepto"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                defaultValue={row.concepto}
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="descripcion">Descripcion</InputLabel>
              <Input
                id="descripcion"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                defaultValue={row.descripcion}
              />
            </FormControl>

            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="estatus-select"
                defaultValue={row.estatus}
                onChange={handleChange}
              >
                <MenuItem value={"1"}>Activo</MenuItem>
                <MenuItem value={"0"}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCloseModalModificar}
            color="secondary"
          >
            Cerrar
          </Button>
          <Button autoFocus onClick={handleUpdateConcepto} color="primary">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
