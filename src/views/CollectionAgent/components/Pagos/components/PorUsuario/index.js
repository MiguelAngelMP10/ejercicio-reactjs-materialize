import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  useGridSlotComponentProps,
} from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
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
}));
const rows = [
  {
    id: 1,
    nombre: "Miguel Angel",
    apellidoPaterno: "Muñoz",
    apellidoMaterno: "Pozos",
    pagos:""

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

export default function PorUsuario() {
  const [open, setOpen] = React.useState(false);

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
                setOpen(true);
                // setRow(params.row);
              }}
            >
              Pagos
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
          Pagos del usuario: "Miguel Angel Muñoz Pozos",
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <FormControl className={classes.formControl} fullWidth={true}>
            

            
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


