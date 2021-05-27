import { FormControl, InputLabel, Typography } from "@material-ui/core";
import { useState } from "react";
import { GithubPicker, CirclePicker, SwatchesPicker  } from "react-color";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

    width: "25ch",
  },
}));
function colorPrimario(th) {
  console.log(th);
}

function colorSecundario(th) {
  console.log("Letra", th);
}
export default function ColoresSistema() {
  const classes = useStyles();

  return (
    <div>
      <InputLabel htmlFor="color-fondo" className={classes.textField}>
        Color primario
      </InputLabel>
      <FormControl fullWidth>
        <SwatchesPicker  onChange={colorPrimario} />
      </FormControl>
      <InputLabel htmlFor="color-fondo" className={classes.textField}>
        Color secundario
      </InputLabel>
      <FormControl fullWidth>
        <CirclePicker  onChange={colorSecundario} />
      </FormControl>
    </div>
  );
}
