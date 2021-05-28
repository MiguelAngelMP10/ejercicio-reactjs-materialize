import { useState, useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SistemaContext from "../../../../../../context/sistema";

export default function MisRecibos() {
  const { recibos, getRecibos } = useContext(SistemaContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [row, setRow] = useState([]);

  useEffect(() => {
    getRecibos().then().catch(null);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "descripcionRecibo",
      headerName: "Descripcion recibo",
      width: 300,
    },
    { field: "tipoPago", headerName: "tipo Pago", width: 200 },
    { field: "estatus", headerName: "Estatus", width: 150 },
    {
      field: "Ver recibo",
      headerName: "Ver Recibo",
      width: 150,
      renderCell: (params) => (
        <strong>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setOpenDialog(true);
              setRow(params.row);
            }}
            startIcon={<VisibilityIcon />}
          >
            Ver
          </Button>
        </strong>
      ),
    },
  ];

  const handleCloseModalRecibo = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={recibos} columns={columns} pageSize={5} />

      <Dialog
        open={openDialog}
        keepMounted
        onClose={handleCloseModalRecibo}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Detalles del Recibo"}
        </DialogTitle>
        <DialogContent>
            <TextField disabled id="standard-id" label="id" value={row.id} fullWidth />
            <TextField
              disabled
              id="standard-descripcionRecibo"
              label="Descripcion Recibo"
              defaultValue={row.descripcionRecibo}
              fullWidth
            />
            <TextField
              disabled
              id="standard-tipoPago"
              label="Tipo Pago"
              value={row.tipoPago}
              fullWidth
            />
            <TextField
              disabled
              id="standard-estatus"
              label="Estatus"
              value={row.estatus}
              fullWidth
            />
 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalRecibo} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
