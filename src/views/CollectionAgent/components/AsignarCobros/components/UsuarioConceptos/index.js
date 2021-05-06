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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 122,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

const conceptos = ["Inscripción", "mensualidad "];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function UsuarioConceptos() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState("");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
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
              setOpen(true);
            }}
          >
            Asignar concepto
          </Button>
        </strong>
      ),
    },
  ];

  const classes = useStyles();

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
          Agregar conceptos a Usuario
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="nombre-usuario">Nombre usuario</InputLabel>
              <Input
                id="nombre-usuario"
                disabled
                value="Miguel Angel"
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
                disabled
                value="Pozos"
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
                disabled
                value="Muñoz"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel id="demo-mutiple-conceptos-label">
                Conceptos
              </InputLabel>
              <Select
                labelId="demo-mutiple-conceptos-label"
                id="demo-mutiple-conceptos"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input id="select-multiple-conceptos" />}
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
                {conceptos.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Fecha Inicio"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="fecha fin"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleAddUser} color="primary">
            <PersonAddIcon></PersonAddIcon>
            Agregar conceptos
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
