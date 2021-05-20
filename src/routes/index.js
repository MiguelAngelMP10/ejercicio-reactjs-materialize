import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import FourOFour from "../views/FourOFour";
import Home from "../views/Home";
import Login from "../views/Login";
import Menu from "../components/menu";
import GeneralUser from "../views/GeneralUser";
import CollectionAgent from "../views/CollectionAgent";
import Admin from "../views/Admin";
import { useContext } from "react";
import SistemaContext from "../context/sistema";

export default function Routes() {
  const { login } = useContext(SistemaContext);
  return (
    <Router>
      <Menu></Menu>
      <Switch>
        <Route path="/" exact>
        {!login ? <Redirect to="/login" /> : <Home/>}
        </Route>
        <Route path="/login" exact>
        {login ? <Redirect to="/" /> : <Login/>}
        </Route>
        <Route path="/general-user" exact>
        {!login ? <Redirect to="/login" /> : <GeneralUser/>}
        </Route>
        <Route path="/collection-agent" exact>
        {!login ? <Redirect to="/login" /> : <CollectionAgent/>}
        </Route>
        <Route path="/admin" exact>
        {!login ? <Redirect to="/login" /> : <Admin/>}
        </Route>
        <Route>
          <FourOFour></FourOFour>
        </Route>
      </Switch>
    </Router>
  );
}
