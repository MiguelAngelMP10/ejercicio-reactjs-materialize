import {
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import SistemaContext from "../../context/sistema";

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

export default function Login() {
  const classes = useStyles();

  const { getLogin } = useContext(SistemaContext);

  const checkLogin = () => {
    let username = document.querySelector("#email").value;
    let password = document.querySelector("#password").value
    getLogin(username, password).then().catch(null);
  };

  return (
    <Container>
      <Grid
        direction="row"
        justify="center"
        alignItems="stretch"
        style={{
          minHeight: "65vh",
          marginTop: "100px",
        }}
      >
        <FormControl>
          <div className={classes.root}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" id="email" fullWidth />
            <TextField label="Password" type="password" id="password" fullWidth />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "15px" }}
              onClick={checkLogin}
            >
              Entrar
            </Button>
          </div>
        </FormControl>
      </Grid>
    </Container>
  );
}
