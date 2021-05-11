import SistemaContext from "./index";
import apiCall from "../../utils/apiCall";
import { useState } from "react";

export default function SistemaProvider({ children }) {
  const [login, setLogin] = useState(false);

  return (
    <SistemaContext.Provider
      value={{
        login,
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
}
