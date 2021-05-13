import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
                image="https://worknest.com.mx/wp-content/uploads/2021/03/PORTADA-CAJA.png"
                title="avatar joven"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.titleColor}>
            Super caja una plataforma digital que ofrece.
          </Typography>
          <Typography variant="h1" component="h2">
            Soluciones tecnológicas.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
