import { useState, useContext, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import SistemaContext from "../../../../context/sistema";
export default function AcercaDeYNosotros() {
  const { getDatosGenerales, datosGenerales, updateDatosGenerales } =
    useContext(SistemaContext);
  useEffect(() => {
    getDatosGenerales().then().catch(null);
  }, []);

  const handleUpdateDatosGenerales = async () => {
    console.log("click");
    let info = { acercaDe: document.querySelector("#outlined-multiline-flexible-acercade").innerHTML, nosotros: document.querySelector("#outlined-multiline-flexible-nosotros").innerHTML };

    let respuesta  = await updateDatosGenerales(1, info).then().catch(null);
    console.log(respuesta);
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
