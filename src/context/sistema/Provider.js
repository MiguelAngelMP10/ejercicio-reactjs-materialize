import SistemaContext from "./index";

import { useState } from "react";
import axios from "axios";

export default function SistemaProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [pagos, setPagos] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]);
  const [recibos, setRecibos] = useState([]);
  const [usuariosPagos, setUsuariosPagos] = useState([]);
  const [pagosPagados, setPagosPagados] = useState([]);
  const [pagosNoPagados, setPagosNoPagados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [conceptos, setConceptos] = useState([]);
  const [concepto, setConcepto] = useState({});

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

  const getRecibos = async () => {
    axios
      .get("http://localhost:8081/recibos")
      .then(function (response) {
        setRecibos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUsuariosPagos = async () => {
    axios
      .get("http://localhost:8082/usuarios?expand=usuarioPagos,pagos")
      .then(function (response) {
        setUsuariosPagos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPagosPagodos = async () => {
    axios
      .get("http://localhost:8081/pagos/pagados")
      .then(function (response) {
        setPagosPagados(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPagosNoPagodos = async () => {
    axios
      .get("http://localhost:8081/pagos/no-pagados")
      .then(function (response) {
        setPagosNoPagados(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUsuarios = async () => {
    axios
      .get("http://localhost:8082/usuarios")
      .then(function (response) {
        setUsuarios(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addUsuario = async (info) => {
    const params = new FormData();
    for (let clave in info) {
      if (info.hasOwnProperty(clave)) {
        params.append(clave, info[clave]);
      }
    }

    axios
      .post("http://localhost:8082/usuarios", params)
      .then(function (response) {
        setUsuario(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //conceptos
  const getConceptos = async () => {
    axios
      .get("http://localhost:8082/conceptos")
      .then(function (response) {
        setConceptos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addConcepto = async (info) => {
    const params = new FormData();
    for (let clave in info) {
      if (info.hasOwnProperty(clave)) {
        params.append(clave, info[clave]);
      }
    }

    axios
      .post("http://localhost:8082/conceptos", params)
      .then(function (response) {
        setConcepto(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteConcepto = async (id) => {
    axios
      .delete(`http://localhost:8082/conceptos/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateConcepto = async (id, info) => {
    const params = new URLSearchParams();

    for (let clave in info) {
      if (info.hasOwnProperty(clave)) {
        params.append(clave, info[clave]);
      }
    }
    axios
      .put(`http://localhost:8082/conceptos/${id}`, params)
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
        updateSucripciones,
        recibos,
        getRecibos,
        usuariosPagos,
        getUsuariosPagos,
        pagosPagados,
        getPagosPagodos,
        pagosNoPagados,
        getPagosNoPagodos,
        usuarios,
        getUsuarios,
        addUsuario,
        usuario,
        getConceptos,
        addConcepto,
        deleteConcepto,
        conceptos,
        concepto,
        updateConcepto
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
}
