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
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        paper: '#eeeeee',
        default: '#f5f5f5',
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
        size: 'small',
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
