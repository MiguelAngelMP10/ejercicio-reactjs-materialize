import SistemaContext from "./index";

import { useState } from "react";
import axios from "axios";

export default function SistemaProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [pagos, setPagos] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]);


  const getLogin = async (username, password) => {
    try {
      const params = new FormData();
      params.append("username", username);
      params.append("password", password);
      axios
        .post("http://localhost:8081/login/login", params)
        .then(function (response) {
          if (response.data.token !== null) {
            setLogin(true);
            setToken(response.data.token);
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

  const getPagos = async () => {
    axios
      .get("http://localhost:8081/pagos")
      .then(function (response) {
        setPagos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updatePago = async (id, estatus) => {
    const params = new URLSearchParams();
    params.append("estatus", estatus);
    axios
      .put("http://localhost:8081/pagos/" + id, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  const getSuscripciones = async () => {
    axios
      .get("http://localhost:8081/suscripciones")
      .then(function (response) {
        setSuscripciones(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateSucripciones = async (id, estatus) => {
    const params = new URLSearchParams();
    params.append("estatus", estatus);
    axios
      .put("http://localhost:8081/suscripciones/" + id, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <SistemaContext.Provider
      value={{
        login,
        token,
        getLogin,
        pagos,
        getPagos,
        updatePago,
        getSuscripciones,
        suscripciones,
        updateSucripciones
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
}
