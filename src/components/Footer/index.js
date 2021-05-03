import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container, Grid, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "10vh",
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
  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);

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
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      E
                    </Avatar>
                  }
                  title="Acerca de"
                />

                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>

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
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                      Heat 1/2 cup of the broth in a pot until simmering, add
                      saffron and set aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                      Heat oil in a (14- to 16-inch) paella pan or a large, deep
                      skillet over medium-high heat. Add chicken, shrimp and
                      chorizo, and cook, stirring occasionally until lightly
                      browned, 6 to 8 minutes. Transfer shrimp to a large plate
                      and set aside, leaving chicken and chorizo in the pan. Add
                      pimentón, bay leaves, garlic, tomatoes, onion, salt and
                      pepper, and cook, stirring often until thickened and
                      fragrant, about 10 minutes. Add saffron broth and
                      remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                      Add rice and stir very gently to distribute. Top with
                      artichokes and peppers, and cook without stirring, until
                      most of the liquid is absorbed, 15 to 18 minutes. Reduce
                      heat to medium-low, add reserved shrimp and mussels,
                      tucking them down into the rice, and cook again without
                      stirring, until mussels have opened and rice is just
                      tender, 5 to 7 minutes more. (Discard any mussels that
                      don’t open.)
                    </Typography>
                    <Typography>
                      Set aside off of the heat to let rest for 10 minutes, and
                      then serve.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      E
                    </Avatar>
                  }
                  title="Nosotros"
                />

                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    ENLACE ATHENEA, S.A DE C.V., se compromete a guardar sus
                    datos personales, durante el tiempo necesario para cumplir
                    con la finalidad para lo cual fueron solicitados. Asimismo,
                    le informamos que debido a que la venta, distribución y
                    soporte de nuestros productos es a través de nuestros socios
                    de negocio (Distribuidores, Vendedores), sus datos
                    personales pudieran ser transferidos a alguno de ellos para
                    dar seguimiento a los productos y/o servicios que usted
                    contrata con nosotros.
                  </Typography>
                </CardContent>

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
                    <Typography paragraph>Detalles</Typography>

                    <Typography paragraph>
                      De conformidad con el artículo 8 de la Ley, se entiende
                      que usted consiente tácitamente el tratamiento de sus
                      datos personales cuando se pone a su disposición el
                      presente Aviso de Privacidad, y usted no manifiesta su
                      oposición. Usted podrá negar su consentimiento en
                      cualquier momento sin que se le atribuyan efectos
                      retroactivos, lo cual puede realizar a través de un
                      escrito dirigido a ENLACE ATHENEA, S.A. DE C.V. mediante
                      correo electrónico privacidad@atheneapro.com, en el cual
                      manifieste su oposición al tratamiento de sus datos
                      personales. ENLACE ATHENEA S.A. DE C.V., hace de su
                      conocimiento los casos en que no será necesario el
                      consentimiento para el tratamiento de los datos personales
                      de acuerdo con lo dispuesto en el ART. 10 de la Ley
                      Federal de Protección de Datos Personales en Posesión de
                      los Particulares.
                    </Typography>
                    <Typography paragraph>
                      Add rice and stir very gently to distribute. Top with
                      artichokes and peppers, and cook without stirring, until
                      most of the liquid is absorbed, 15 to 18 minutes. Reduce
                      heat to medium-low, add reserved shrimp and mussels,
                      tucking them down into the rice, and cook again without
                      stirring, until mussels have opened and rice is just
                      tender, 5 to 7 minutes more. (Discard any mussels that
                      don’t open.)
                    </Typography>
                    <Typography>
                      Le informamos que los Sitios, las Apps y las Redes
                      Sociales hacen uso de cookies y otras tecnologías, a
                      través de las cuales es posible monitorear automáticamente
                      su comportamiento, brindarle nuestros productos y/o
                      servicios y otorgarle una experiencia optima y
                      personalizada durante el uso de los mismos, así como
                      ofrecerle nuevos productos y servicios basados en sus
                      preferencias. Los datos personales que se recaban a través
                      de estas tecnologías son: dirección IP, sitios web y
                      secciones de los mismos que usted visita desde los Sitios,
                      antes de los Sitios o en páginas relacionadas con los
                      Sitios y las Apps, características de navegador,
                      características de dispositivos, sistema operativo,
                      preferencias de idiomas, URL a las que se hace referencia,
                      información sobre conductas y acciones realizadas en los
                      Sitios y las Apps, información sobre conductas y acciones
                      realizadas mientras nuestra App está abierta, fechas y
                      horas de las visitas a los Sitios o acceso a las Apps,
                      secciones o contenido consultadas en los mismos y datos de
                      ubicación y localización del Usuario mientras nuestras
                      Apps estén abiertas. Estas tecnologías pueden
                      deshabilitarse accediendo a la(s) opción(es) de Privacidad
                      y/o Seguridad ubicada(s) en la(s) sección(es) de Opciones,
                      Herramientas, Preferencias de Internet o funciones
                      similares del navegador de Internet que esté utilizando o
                      a través del ícono de configuración, herramientas o
                      similares del dispositivo en el cual esté instalada las
                      Apps; sin embargo, al desactivarlas debe tomar en cuenta
                      que dicha acción podría provocar que no sea capaz de
                      obtener el funcionamiento total que los Sitios y las Apps
                      pudiera ofrecerle.
                    </Typography>
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

// export default function Footer() {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <div className={classes.root}>
//       <CssBaseline />

//       <footer className={classes.footer}>
//         <Container>
//           <Typography variant="body1">
//             <Grid container spacing={3}>
//               <Grid item xs={6}>
//                 <Paper className={classes.paper}>Acerca de</Paper>
//               </Grid>
//               <Grid item xs={6}>
//                 <Paper className={classes.paper}>Nosotros</Paper>
//               </Grid>
//             </Grid>
//           </Typography>
//           <Copyright />
//         </Container>
//       </footer>
//     </div>
//   );
// }
