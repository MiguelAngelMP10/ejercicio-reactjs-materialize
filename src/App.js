import { Container } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./App.css";

import Routes from "./routes";
import SistemaProvider from "./context/sistema/Provider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


function App() {

  const outerTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: "#33c9dc",
      },
      secondary: {
        main: "#7e57c2",
      },    
    },
  });
  
  return (
    <ThemeProvider theme={outerTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <Container>
            <SistemaProvider>
              <Routes></Routes>
            </SistemaProvider>
          </Container>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
