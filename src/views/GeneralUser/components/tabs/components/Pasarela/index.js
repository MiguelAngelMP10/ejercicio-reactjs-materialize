import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 520,
  },
  media: {
    height: 300,
  },
});

export default function Pasarela() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Pasarela
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Introdusca datos para la pasarela de pago
          </Typography>
          <CardMedia
            className={classes.media}
            image="https://public.openpay.mx/images/ejemplo_cobro_tarjeta4.png"
            title="Contemplative Reptile"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
