import { useState, useContext, useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  useGridSlotComponentProps,
} from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";
import SistemaContext from "../../../../../../context/sistema";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
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

export default function PorUsuario() {
  const [open, setOpen] = useState(false);
  const { usuariosPagos, getUsuariosPagos } = useContext(SistemaContext);
  const [row, setRow] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 250 },
    {
      field: "apellidoPaterno",
      headerName: "Apellido Paterno",
      width: 200,
    },
    {
      field: "apellidoMaterno",
      headerName: "Apellido Materno",
      width: 200,
    },

    {
      field: "´pagos",

      headerName: "Pagos",
      width: 130,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setRow(params.row);
              setOpen(true);
            }}
          >
            Pagos
          </Button>
        </strong>
      ),
    },
  ];

  const columnsPagos = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "concepto", headerName: "concepto", width: 200 },
    { field: "fechaVencimiento", headerName: "fechaVencimiento", width: 200 },
    { field: "importe", headerName: "importe", width: 200 },
    { field: "saldos", headerName: "saldos", width: 200 },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  useEffect(() => {
    getUsuariosPagos().then().catch(null);
  }, []);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={usuariosPagos}
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
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Pagos del usuario:{" "}
          {`${row.nombre} ${row.apellidoPaterno} ${row.apellidoMaterno}`},
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.formControl}>
              {listPagos(row.pagos)}
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function listPagos(pagos) {
 
  //
}
