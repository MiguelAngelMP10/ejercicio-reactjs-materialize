import { useState, useContext, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import SistemaContext from "../../../../context/sistema";
export default function AcercaDeYNosotros() {
  const { getDatosGenerales, datosGenerales, updateDatosGenerales } =
    useContext(SistemaContext);
  useEffect(() => {
    getDatosGenerales().then().catch(null);
  }, []);

  const [acercaDe, setAcercaDe] = useState("");
  const [nosotros, setNosotros] = useState("");

  const handleUpdateDatosGenerales = async () => {
    let info = {
      acercaDe: acercaDe,
      nosotros: nosotros,
    };
    await updateDatosGenerales(1, info).then(console.log).catch(null);
  };

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
        defaultValue={datosGenerales.acercaDe}
        onChange={(event) => setAcercaDe(event.target.value)}
      />

      <TextField
        fullWidth={true}
        id="outlined-multiline-flexible-nosotros"
        label="Nosotros"
        multiline
        rows={10}
        variant="outlined"
        style={{ marginTop: "20px" }}
        defaultValue={datosGenerales.nosotros}
        onChange={(event) => setNosotros(event.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleUpdateDatosGenerales}
      >
        Actualizar
      </Button>
    </div>
  );
}
