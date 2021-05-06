import { Container } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./App.css";
import Footer from "./components/Footer";

import Routes from "./routes";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Container>
          <Routes></Routes>
        </Container>
        <Footer></Footer>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
