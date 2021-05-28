import SistemaContext from "./index";

import { useState, useEffect } from "react";
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

  const [penalizaciones, setPenalizaciones] = useState([]);
  const [penalizacion, setPenalizacion] = useState({});

  const [pagosDeposito, setPagosDeposito] = useState([]);

  const [pasarelas, setPasarelas] = useState([]);

  const [datosGenerales, setDatosGenerales] = useState({});

  const [colorPrimario, setColorPrimario] = useState("#3f51b5");
  const [colorSecundario, setColorSecundario] = useState("#f50057");
  
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
      .get("http://localhost:8081/pagos?&expand=usuario")
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

  //penalizaciones
  const getPenalizaciones = async () => {
    axios
      .get("http://localhost:8082/penalizaciones")
      .then(function (response) {
        setPenalizaciones(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addPenalizacion = async (info) => {
    const params = new FormData();
    for (let clave in info) {
      if (info.hasOwnProperty(clave)) {
        params.append(clave, info[clave]);
      }
    }

    axios
      .post("http://localhost:8082/penalizaciones", params)
      .then(function (response) {
        setPenalizacion(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deletepenalizaciones = async (id) => {
    axios
      .delete(`http://localhost:8082/penalizaciones/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updatepenalizaciones = async (id, info) => {
    const params = new URLSearchParams();

    for (let clave in info) {
      if (info.hasOwnProperty(clave)) {
        params.append(clave, info[clave]);
      }
    }
    axios
      .put(`http://localhost:8082/penalizaciones/${id}`, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //pagos_deposito
  const getPagosDeposito = async () => {
    axios
      .get("http://localhost:8082/pagos-deposito")
      .then(function (response) {
        setPagosDeposito(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updatePagoDeposito = async (id, estatus) => {
    const params = new URLSearchParams();
    params.append("estatus", estatus);
    axios
      .put("http://localhost:8082/pagos-deposito/" + id, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Pasarelas
  const getPasarelas = async () => {
    axios
      .get("http://localhost:8083/pasarelas")
      .then(function (response) {
        setPasarelas(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addPasarela = async (info) => {
    const params = new FormData();
    for (let clave in info) {
      if (info.hasOwnProperty(clave)) {
        params.append(clave, info[clave]);
      }
    }

    axios
      .post("http://localhost:8083/pasarelas", params)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Datos generales
  const getDatosGenerales = async () => {
    axios
      .get("http://localhost:8083/datos-generales/1")
      .then(function (response) {
       setColorPrimario(response.data.colorPrimario);
       setColorSecundario(response.data.colorSecundario);
        setDatosGenerales(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateDatosGenerales = async (id, info) => {
    const params = new URLSearchParams();
    for (let clave in info) {
      if (info.hasOwnProperty(clave)) {
        params.append(clave, info[clave]);
      }
    }

    axios
      .put("http://localhost:8083/datos-generales/" + id, params)
      .then(function (response) {
        setDatosGenerales(response.data);
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
        updateConcepto,
        conceptos,
        concepto,

        getPenalizaciones,
        addPenalizacion,
        deletepenalizaciones,
        updatepenalizaciones,
        penalizaciones,
        penalizacion,

        getPagosDeposito,
        pagosDeposito,
        updatePagoDeposito,

        pasarelas,
        getPasarelas,
        addPasarela,

        getDatosGenerales,
        updateDatosGenerales,
        datosGenerales,

        colorPrimario,
        setColorPrimario,
        colorSecundario,
        setColorSecundario,
      }}
    >
      {children}
      
    </SistemaContext.Provider>
  );
}
