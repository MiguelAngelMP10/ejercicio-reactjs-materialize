import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// let Image =
//   "https://www.consumer.es/wp-content/uploads/2019/07/img_fondo-pantalla-wallpaper-720x474.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "75vh",
    //  backgroundImage: `url(${Image})`,
  },
  img: {
    maxWidth: 345,
  },
  titleColor: {
    fontfamily: "Arial",
    fontSize: "30px",
    textAlign: "center",
    color: " #1278BF",
    textShadow: " 0px 0px 9px #508AD3",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card className={classes.img}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="avatar joven"
                image="https://www.atheneapro.com/assets/img/avatar_joven.svg"
                title="avatar joven"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.titleColor}>
            Athenea Pro es una plataforma digital que ofrece.
          </Typography>
          <Typography variant="h1" component="h2">
            Soluciones tecnológicas para la educación.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
