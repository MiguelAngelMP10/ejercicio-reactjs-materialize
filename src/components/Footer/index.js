import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container, Grid, Link } from "@material-ui/core";
import SistemaContext from "../../context/sistema";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 30,
    minHeight: "5vh",
  },
  media: {
    height: 0,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const { getDatosGenerales, datosGenerales } = useContext(SistemaContext);
  useEffect(() => {
    getDatosGenerales().then().catch(null);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  return (
    <footer className={classes.footer}>
      <Container>
        <Copyright />
        <Typography variant="body1">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card className={classes.root}>
                <Typography variant="h4">Acerca de</Typography>

                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>{datosGenerales.acercaDe}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card className={classes.root}>
                <Typography variant="h4">Nosotros</Typography>

                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded2,
                    })}
                    onClick={handleExpandClick2}
                    aria-expanded={expanded2}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded2} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>{datosGenerales.nosotros}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </footer>
  );
}
function Copyright() {
  return (
    <Typography variant="h5" color="textSecondary">
      {" "}
      {"Copyright © "}{" "}
      <Link color="inherit" href="https://material-ui.com/">
        {" "}
        Your Website{" "}
      </Link>{" "}
      {new Date().getFullYear()} {"."}{" "}
    </Typography>
  );
}
