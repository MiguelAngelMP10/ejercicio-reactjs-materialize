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
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";

import { KeyboardDatePicker } from "@material-ui/pickers";
import SistemaContext from "../../../../../../context/sistema";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UsuarioConceptos() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [conceptoLocal, setConceptoLocal] = useState([]);
  const [selectedDateStart, setSelectedDateStart] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());

  const { usuarios, getUsuarios, getConceptos, conceptos } =
    useContext(SistemaContext);
  const [row, setRow] = useState({});

  const handleDateChangeStart = (date) => {
    setSelectedDateStart(date);
  };

  const handleDateChangeEnd = (date) => {
    setSelectedDateEnd(date);
  };

  const handleChange = (event) => {
    setConceptoLocal(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddConceptos = () => {
    let info = {
      idUsuario: row.id,
      conceptos: conceptoLocal,
      start: selectedDateStart.toISOString().split("T")[0],
      end: selectedDateEnd.toISOString().split("T")[0],
    };

    const params = new FormData();
    for (let clave in info) {
      if (info.hasOwnProperty(clave)) {
        params.append(clave, info[clave]);
      }
    }

    axios
      .post("http://localhost:8082/usuario-cobros/add-cobros", params)
      .then(function (response) {
        alert("Se asignarón los cobros al usuario")
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "nombre", width: 250 },
    { field: "apellidoPaterno", headerName: "ApellidoPaterno", width: 250 },
    { field: "apellidoMaterno", headerName: "Apellido Materno", width: 250 },
    {
      field: "asignarConcepto",
      headerName: "Asignar Concepto",
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              console.log(conceptos);
              setOpen(true);
              setRow(params.row);
            }}
          >
            Asignar concepto
          </Button>
        </strong>
      ),
    },
  ];

  const classes = useStyles();

  useEffect(() => {
    getUsuarios().then().catch(null);
    getConceptos().then().catch(null);
  }, []);

  return (
    <div style={{ height: 300, width: "100%" }}>
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
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Agregar conceptos a Usuario
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="nombre-usuario">Nombre usuario</InputLabel>
              <Input
                id="nombre-usuario"
                disabled
                value={row.nombre}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="apellido-paterno-usuario">
                Apellido Paterno Usuario
              </InputLabel>
              <Input
                id="apellido-paterno-usuario"
                disabled
                value={row.apellidoPaterno}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="apellido-materno-usuario">
                Apellido Materno Usuario
              </InputLabel>
              <Input
                id="apellido-materno-usuario"
                disabled
                value={row.apellidoMaterno}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-mutiple-chip-label">Conceptos</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={conceptoLocal}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {conceptos.map((fila) => (
                  <MenuItem key={fila.id} value={fila.id}>
                    {fila.concepto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialo"
              label="Fecha Inicio"
              format="yyyy/MM/dd"
              value={selectedDateStart}
              onChange={handleDateChangeStart}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              fullWidth
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="fecha fin"
              format="yyyy/MM/dd"
              value={selectedDateEnd}
              onChange={handleDateChangeEnd}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleAddConceptos} color="primary">
            <PersonAddIcon></PersonAddIcon>
            Agregar conceptos
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
