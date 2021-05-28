import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import FourOFour from "../views/FourOFour";
import Home from "../views/Home";
import Login from "../views/Login";
import Menu from "../components/menu";
import GeneralUser from "../views/GeneralUser";
import CollectionAgent from "../views/CollectionAgent";
import Admin from "../views/Admin";
import { useContext, useEffect } from "react";
import SistemaContext from "../context/sistema";
import Footer from "../components/Footer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export default function Routes() {
  const { login, colorPrimario, colorSecundario, getDatosGenerales } =
    useContext(SistemaContext);

  useEffect(() => {
    getDatosGenerales().then().catch(null);
  },[]);

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: colorPrimario,
      },
      secondary: {
        main: colorSecundario,
      },
    },
    typography: {
      fontSize: 14,
      fontWeightLight: 200,
    },
    props: {
      MuiList: {
        dense: true,
      },
      MuiMenuItem: {
        dense: true,
      },
      MuiTable: {
        size: "small",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Menu></Menu>
        <Switch>
          <Route path="/" exact>
            {!login ? <Redirect to="/login" /> : <Home />}
          </Route>
          <Route path="/login" exact>
            {login ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/general-user" exact>
            {!login ? <Redirect to="/login" /> : <GeneralUser />}
          </Route>
          <Route path="/collection-agent" exact>
            {!login ? <Redirect to="/login" /> : <CollectionAgent />}
          </Route>
          <Route path="/admin" exact>
            {!login ? <Redirect to="/login" /> : <Admin />}
          </Route>
          <Route>
            <FourOFour></FourOFour>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </ThemeProvider>
  );
}
