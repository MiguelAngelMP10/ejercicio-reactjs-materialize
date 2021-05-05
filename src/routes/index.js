import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FourOFour from "../views/FourOFour";
import Home from "../views/Home";
import Login from "../views/Login";
import Menu from "../components/menu";
import GeneralUser from "../views/GeneralUser";
import CollectionAgent from "../views/CollectionAgent";

export default function Routes() {
  return (
    <Router>
      <Menu></Menu>
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/login" exact>
          <Login></Login>
        </Route>
        <Route path="/general-user" exact>
          <GeneralUser></GeneralUser>
        </Route>
        <Route path="/collection-agent" exact>
          <CollectionAgent></CollectionAgent>
        </Route>
        <Route>
          <FourOFour></FourOFour>
        </Route>
      </Switch>
    </Router>
  );
}
