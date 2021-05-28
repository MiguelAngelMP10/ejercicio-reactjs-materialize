import { Container } from "@material-ui/core";
import { useState, useContext, useEffect } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./App.css";

import Routes from "./routes";
import SistemaProvider from "./context/sistema/Provider";

function App() {


  return (

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <SistemaProvider>
            <Container>
              <Routes></Routes>
            </Container>
          </SistemaProvider>
        </div>
      </MuiPickersUtilsProvider>
 
  );
}

export default App;
