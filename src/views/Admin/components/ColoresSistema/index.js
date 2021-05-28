import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Paper,
} from "@material-ui/core";
import { useContext } from "react";
import { SwatchesPicker } from "react-color";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import SistemaContext from "../../../../context/sistema";

import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export default function ColoresSistema() {
  const classes = useStyles();
  const {
    setColorPrimario,
    setColorSecundario,
    colorPrimario,
    colorSecundario,
  } = useContext(SistemaContext);

  const saveColors = () => {
    const params = new URLSearchParams();

    params.append("colorPrimario", colorPrimario);
    params.append("colorSecundario", colorSecundario);
    axios
      .put("http://localhost:8083/datos-generales/1", params)
      .then(function (response) { 
       alert("Se acualizarón los colores")
        //return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <InputLabel htmlFor="color-fondo" className={classes.textField}>
              Color primario
            </InputLabel>
            <FormControl>
              <SwatchesPicker onChange={(th) => setColorPrimario(th.hex)} />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <InputLabel htmlFor="color-fondo" className={classes.textField}>
              Color secundario
            </InputLabel>
            <FormControl>
              <SwatchesPicker onChange={(th) => setColorSecundario(th.hex)} />
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ padding: 20, margin: 5 }}
      >
        <Button variant="contained" color="primary" size="large">
          Primary
        </Button>
        <Button variant="contained" color="secondary" size="large">
          Secondary
        </Button>
      </Grid>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ padding: 20, margin: 5 }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={saveColors}
        >
          <SaveIcon /> Guardar cambios
        </Button>
      </Grid>
    </div>
  );
}
