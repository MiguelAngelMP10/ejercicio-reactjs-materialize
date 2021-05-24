import { useState, useContext, useEffect } from "react";
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
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SistemaContext from "../../.././../../../context/sistema";
import axios from "axios";

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
    concepto: "concepto 1",
    descripcion: "descripcion concepto",
    estatus: "Activo",
  },

  {
    id: 2,
    concepto: "concepto 2",
    descripcion: "descripcion concepto",
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

export default function ListConceptosPlanes() {
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({});
  const [plan, setPlan] = useState(null);
  const { getConceptos, conceptos } = useContext(SistemaContext);

  useEffect(() => {
    getConceptos().then().catch(null);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddPlanConcepto = () => {
    const params = new FormData();

    params.append("idConcepto", row.id);
    params.append("plan", plan);

    axios
      .post("http://localhost:8082/conceptos-planes", params)
      .then(function (response) {
        alert("Se Agrego la asociación")
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "concepto", headerName: "Conceptos", width: 250 },
    { field: "descripcion", headerName: "Descripcion", width: 250 },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 250,
      renderCell: (params) => (
        <strong>{Boolean(params.row.estatus) ? "Activo" : "inactivo"}</strong>
      ),
    },
    {
      field: "asociarPlan",
      headerName: "Asociar Plan",
      width: 180,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setRow(params.row);
              setOpen(true);
            }}
          >
            Asociar plan
          </Button>
        </strong>
      ),
    },
  ];

  const handleChange = (event) => {
    setPlan(event.target.value);
  };

  const classes = useStyles();

  return (
    <div style={{ height: 300, width: "100%" }}>
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

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Asociar plan a concepto
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="nombre-concepto">Nombre concepto</InputLabel>
              <Input
                id="nombre-concepto"
                disabled
                value={row.concepto}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={classes.margin} fullWidth={true}>
              <InputLabel htmlFor="descripcion">Descripcion</InputLabel>
              <Input
                id="descripcion"
                disabled
                value={row.descripcion}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>

            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel id="demo-simple-select-label">Tipo plan</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
              >
                <MenuItem value={"1 mes"}>1 mes</MenuItem>
                <MenuItem value={"3 meses"}>3 Meses</MenuItem>
                <MenuItem value={"6 meses"}>6 meses</MenuItem>
                <MenuItem value={"9 meses"}>9 meses</MenuItem>
                <MenuItem value={"12 meses"}>12 meses</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button autoFocus onClick={handleAddPlanConcepto} color="primary">
            <AddIcon></AddIcon>
            Asociar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
