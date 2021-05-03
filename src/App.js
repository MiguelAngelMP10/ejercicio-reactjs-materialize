import { Container } from "@material-ui/core";
import "./App.css";
import Footer from "./components/Footer";

import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <Container>
        <Routes></Routes>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default App;
