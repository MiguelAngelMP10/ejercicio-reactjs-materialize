import SistemaContext from "./index";

import { useState } from "react";
import axios from 'axios';


export default function SistemaProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");

  const getLogin = async (username, password) => {
    try {
      const params = new FormData();
      params.append('username', username);
      params.append('password', password);
      axios.post('http://localhost:8081/login/login', params)
      .then(function (response) {
        if (response.data.token!==null) {
          setLogin(true);
          setToken(response.data.token)
        }
      })
      .catch(function (error) {
        setLogin(false);
        console.log(error);
      });
    } catch (error) {
      setLogin(false);
    } finally {
    }
  };

  return (
    <SistemaContext.Provider
      value={{
        login,
        token,
        getLogin,
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
}
