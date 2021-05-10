import { Button, Divider, TextField } from "@material-ui/core";

export default function AcercaDeYNosotros() {
  return (
    <div>
      <TextField
        fullWidth={true}
        id="outlined-multiline-flexible-acercade"
        label="Acerca de "
        multiline
        rows={10}
        variant="outlined"
        style={{ marginTop: "20px" }}
      />

      <TextField
        fullWidth={true}
        id="outlined-multiline-flexible-nosotros"
        label="Nosotros"
        multiline
        rows={10}
        variant="outlined"
        style={{ marginTop: "20px" }}
      />
      <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Actualizar
      </Button>
    </div>
  );
}
