import { Container } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./App.css";
import Footer from "./components/Footer";

import Routes from "./routes";
import SistemaProvider from "./context/sistema/Provider";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Container>
          <SistemaProvider>
            <Routes></Routes>
          </SistemaProvider>
        </Container>
        <Footer></Footer>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
