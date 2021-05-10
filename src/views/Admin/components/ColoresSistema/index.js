import { FormControl, InputLabel, Typography } from "@material-ui/core";
import { useState } from "react";
import { GithubPicker, CompactPicker } from "react-color";
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
function color(th) {
  console.log(th);
}

function colorLetra(th) {
  console.log("Letra", th);
}
export default function ColoresSistema() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <InputLabel htmlFor="color-fondo" className={classes.textField}>
        Color fondo
      </InputLabel>
      <FormControl fullWidth={true}>
        <GithubPicker onChange={color} />
      </FormControl>
      <InputLabel htmlFor="color-fondo" className={classes.textField}>
        Color letra
      </InputLabel>
      <FormControl fullWidth={true}>
        <CompactPicker onChange={colorLetra} />
      </FormControl>
    </div>
  );
}
