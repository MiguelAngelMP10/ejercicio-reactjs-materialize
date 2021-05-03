import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import React from "react";

const useStyles = makeStyles(() => ({
  right: {
    flex: 1,
    display: "flex",
    color: "white",
    justifyContent: "flex-center",
    textDecoration: "none",
  },
}));
export default function Menu() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="sticky" color="transparent">
        <Toolbar color="inherit" aria-label="menu">
          <Typography className={classes.right} variant="body1" color="inherit">
            <div className={classes.right}>
              <Link to="/">{"Home"}</Link>
            </div>
            <div className={classes.right}>
              <Link to="/general-user">{"usuario General"}</Link>
            </div>
            <div className={classes.right}>
              <Link to="/login">{"Agente de Cobro"}</Link>
            </div>
            <div className={classes.right}>
              <Link to="/login">{"Admin"}</Link>
            </div>
            <div className={classes.right}>
              <Link to="/login">{"Login"}</Link>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
