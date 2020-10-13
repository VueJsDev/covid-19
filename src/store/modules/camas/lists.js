import _ from "lodash";
import axios from "axios";
require("dotenv").config();

const URL = process.env.VUE_APP_API_URI;

let config = {
  headers: {
    'Authorization': `token ${localStorage.getItem('token_api')}`
  }
}

const lists = {
  namespaced: true,
  state: {
    camasPorEstablecimientos: [],
    camasPorEstablecimientosLevesModerados: [],
    camasPorEstablecimientosCriticos: [],
    pacientesLevesModerados: [],
    pacientesCriticos: [],
    efectoresParaModalDeHistorial: [],
    efectoresCriticosParaModalDeHistorial: [],
    pacientes_moderados_para_grafica: [],
    pacientes_criticos_para_grafica: [],
    pacientes_listado_moderados_para_grafica: [],
    pacientes_listado_criticos_para_grafica: [],
    totalPacientesAtendidosModerados: 0    
  },
  actions: {
    FETCH_PACIENTES_LISTADO_MODERADOS_PARA_GRAFICA: ({ commit }, datos) => {
      let fechaDesde = datos.fechaDesde;
      let fechaHasta = datos.fechaHasta;
      let efectorId = datos.efectorId;
      let checkFiltroPorDia = datos.checkFiltroPorDia;
      
      let url =
        URL + "/covid/internacion-paciente-historial?tipo=0&fechaDesde=" +
        fechaDesde +
        "&fechaHasta=" +
        fechaHasta;

      if (efectorId != 0) {
        url =
          URL + "/covid/internacion-paciente-historial?tipo=0&fechaDesde=" +
          fechaDesde +
          "&fechaHasta=" +
          fechaHasta +
          "&hospitalId=" +
          efectorId;
      }

      if ( checkFiltroPorDia ) {
        url = url + "&hoy=1"
      }

        

      return new Promise((resolve, reject) => {
        axios
          .get(url, config)
          .then((res) => {
            commit("SET_PACIENTES_LISTADO_MODERADOS_PARA_GRAFICA", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FETCH_PACIENTES_LISTADO_CRITICOS_PARA_GRAFICA: ({ commit }, datos) => {
      let fechaDesde = datos.fechaDesde;
      let fechaHasta = datos.fechaHasta;
      let efectorId = datos.efectorId;
      let checkFiltroPorDia = datos.checkFiltroPorDia;
      
      let url =
        URL + "/covid/internacion-paciente-historial?tipo=1&fechaDesde=" +
        fechaDesde +
        "&fechaHasta=" +
        fechaHasta;

      if (efectorId != 0) {
        url =
          URL + "/covid/internacion-paciente-historial?tipo=1&fechaDesde=" +
          fechaDesde +
          "&fechaHasta=" +
          fechaHasta +
          "&hospitalId=" +
          efectorId;
      }

      if ( checkFiltroPorDia ) {
        url = url + "&hoy=1"
      }

        

      return new Promise((resolve, reject) => {
        axios
          .get(url, config)
          .then((res) => {
            commit("SET_PACIENTES_LISTADO_CRITICOS_PARA_GRAFICA", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FETCH_PACIENTES_MODERADOS_PARA_GRAFICA: ({ commit }, datos) => {
      let fechaDesde = datos.fechaDesde;
      let fechaHasta = datos.fechaHasta;
      let efectorId = datos.efectorId;
      let checkFiltroPorDia = datos.checkFiltroPorDia;

      let url =
        URL + "/covid/internacion-total-por-genero?tipo=0&fechaDesde=" +
        fechaDesde +
        "&fechaHasta=" +
        fechaHasta;

        if (efectorId != 0) {
          url =
            URL + "/covid/internacion-total-por-genero?tipo=0&fechaDesde=" +
            fechaDesde +
            "&fechaHasta=" +
            fechaHasta +
            "&hospitalId=" +
            efectorId;
        }

        if ( checkFiltroPorDia ) {
          url = url + "&hoy=1"
        }
        

        

      return new Promise((resolve, reject) => {
        axios
          .get(url, config)
          .then((res) => {
            commit("SET_PACIENTES_MODERADOS_PARA_GRAFICA", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FETCH_PACIENTES_CRITICOS_PARA_GRAFICA: ({ commit }, datos) => {
      let fechaDesde = datos.fechaDesde;
      let fechaHasta = datos.fechaHasta;
      let efectorId = datos.efectorId;
      let checkFiltroPorDia = datos.checkFiltroPorDia;

      let url =
        URL + "/covid/internacion-total-por-genero?tipo=1&fechaDesde=" +
        fechaDesde +
        "&fechaHasta=" +
        fechaHasta;

      if (efectorId != 0) {
        url =
          URL + "/covid/internacion-total-por-genero?tipo=1&fechaDesde=" +
          fechaDesde +
          "&fechaHasta=" +
          fechaHasta +
          "&hospitalId=" +
          efectorId;
      }

      if ( checkFiltroPorDia ) {
        url = url + "&hoy=1"
      }



      return new Promise((resolve, reject) => {
        axios
          .get(url, config)
          .then((res) => {
            commit("SET_PACIENTES_CRITICOS_PARA_GRAFICA", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FETCH_EFECTORES_PARA_MODAL_HISTORIAL: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(URL + "/covid/listado-efectores", config)
          .then((res) => {
            commit("SET_EFECTORES_PARA_MODAL_HISTORIAL", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FETCH_EFECTORES_CRITICOS_PARA_MODAL_HISTORIAL: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(URL + "/covid/listado-efectores?tipo=1", config)
          .then((res) => {
            commit("SET_EFECTORES_CRITICOS_PARA_MODAL_HISTORIAL", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FETCH_CAMAS_ESTABLECIMIENTOS: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(URL + "/covid/total-camas-por-efector", config)
          .then((res) => {
            commit("SET_CAMAS_ESTABLECIMIENTOS", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FECTH_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS: ({ commit }, ocupada) => {
      return new Promise((resolve, reject) => {
        let url = URL + "/covid/total-camas-por-efector?tipo=0";
        if (ocupada == 1 || ocupada == 0) {
          url =
            URL + "/covid/total-camas-por-efector?tipo=0&ocupada=" +
            ocupada;
        }
        axios
          .get(url, config)
          .then((res) => {
            commit("SET_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FECTH_CAMAS_ESTABLECIMIENTOS_CRITICOS: ({ commit }, datos) => {
      let ocupada = datos.ocupadas == undefined ? undefined : datos.ocupadas;
      let respirador =
        datos.respirador == undefined ? undefined : datos.respirador;

      return new Promise((resolve, reject) => {
        let url = URL + "/covid/total-camas-por-efector?tipo=1";
        if (ocupada != undefined) {
          url =
            URL + "/covid/total-camas-por-efector?tipo=1&ocupada=" +
            ocupada;
        }
        if (respirador != undefined) {
          url = url + "&respirador=" + respirador;
        }
        axios
          .get(url, config)
          .then((res) => {
            commit("SET_CAMAS_ESTABLECIMIENTOS_CRITICOS", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FECTH_PACIENTES_CAMAS_LEVES_MODERADAS: ({ commit }, hospitalId) => {
      return new Promise((resolve, reject) => {
        let url = `${URL}/covid/internacion-paciente-fecha-actual?hospitalId=${hospitalId}&tipo=0`;
        axios
          .get(url, config)
          .then((res) => {
            commit("SET_PACIENTES_CAMAS_LEVES_MODERADAS", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FECTH_PACIENTES_CAMAS_CRITICOS: ({ commit }, data) => {
      var hospitalId = data.hospitalId;
      var respirador = data.respirador;
      return new Promise((resolve, reject) => {
        let url = `${URL}/covid/internacion-paciente-fecha-actual?hospitalId=${hospitalId}&tipo=1&respirador=${respirador}`;
        axios
          .get(url, config)
          .then((res) => {
            commit("SET_PACIENTES_CAMAS_CRITICOS", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
  },
  mutations: {
    SET_PACIENTES_LISTADO_MODERADOS_PARA_GRAFICA(state, data) {
      state.pacientes_listado_moderados_para_grafica = data;
    },
    SET_PACIENTES_LISTADO_CRITICOS_PARA_GRAFICA(state, data) {
      state.pacientes_listado_criticos_para_grafica = data;
    },
    SET_PACIENTES_MODERADOS_PARA_GRAFICA(state, data) {
      state.pacientes_moderados_para_grafica = data;
    },
    SET_PACIENTES_CRITICOS_PARA_GRAFICA(state, data) {
      state.pacientes_criticos_para_grafica = data;
    },
    SET_EFECTORES_PARA_MODAL_HISTORIAL(state, data) {
      state.efectoresParaModalDeHistorial = data;
    },
    SET_EFECTORES_CRITICOS_PARA_MODAL_HISTORIAL(state, data) {
      state.efectoresCriticosParaModalDeHistorial = data;
    },
    SET_CAMAS_ESTABLECIMIENTOS(state, data) {
      state.camasPorEstablecimientos = data;
    },
    SET_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS(state, data) {
      state.camasPorEstablecimientosLevesModerados = data;
    },
    SET_CAMAS_ESTABLECIMIENTOS_CRITICOS(state, data) {
      state.camasPorEstablecimientosCriticos = data;
    },
    SET_PACIENTES_CAMAS_LEVES_MODERADAS(state, data) {
      state.pacientesLevesModerados = data;
    },
    SET_PACIENTES_CAMAS_CRITICOS(state, data) {
      state.pacientesCriticos = data;
    },
  },
  getters: {
    GET_TOTALPACIENTES_ATENDIDOS_MODERADOS_PARA_GRAFICA( state ) {
      let todaLaLista = state.pacientes_moderados_para_grafica;
      let cantidad = 0;
      todaLaLista.forEach((h) => {
        cantidad = cantidad + h.total
      });

      return cantidad;
    },
    GET_TOTALPACIENTES_ATENDIDOS_CRITICOS_PARA_GRAFICA(state) {
      let todaLaLista = state.pacientes_criticos_para_grafica;
      let cantidad = 0;
      todaLaLista.forEach((h) => {
        cantidad = cantidad + h.total
      });

      return cantidad;
    },
    GET_PACIENTES_LISTADO_MODERADOS_PARA_GRAFICA(state) {
      return state.pacientes_listado_moderados_para_grafica;
    },
    GET_PACIENTES_LISTADO_CRITICOS_PARA_GRAFICA(state) {
      return state.pacientes_listado_criticos_para_grafica;
    },
    GET_DATOS_PARA_PARA_GRAFICA_MODERADOS(state) {
      let arrHospitales = [];
      let todaLaLista = state.pacientes_moderados_para_grafica;
      let arrayTmp = _.uniqBy(
        state.pacientes_moderados_para_grafica,
        "hospitalId"
      );

      //PARA OBTENER SOLO LOS NOMBRES PARA LAS CATEGORIAS
      arrayTmp.forEach((item) => {
        arrHospitales.push(item.efector);
      });

      //PARA OBTENER LAS SERIES DE HOMBRES Y MUJERES
      let arrMasculinos = [];
      let arrFemeninos = [];
      arrayTmp.forEach((item) => {
        let masculinos = 0;
        let femeninos = 0;
        todaLaLista.forEach((h) => {
          if (item.hospitalId == h.hospitalId) {
            if (h.sexo == "F") {
              femeninos = h.total;
            }
            if (h.sexo == "M") {
              masculinos = h.total;
            }
          }
        });
        arrMasculinos.push(masculinos);
        arrFemeninos.push(femeninos);
      });

      let datos = {
        hospitales: arrHospitales,
        masculinos: arrMasculinos,
        femeninos: arrFemeninos,
      };

      return datos;
    },
    GET_DATOS_PARA_PARA_GRAFICA_CRITICOS(state) {
      let arrHospitales = [];
      let todaLaLista = state.pacientes_criticos_para_grafica;
      let arrayTmp = _.uniqBy(
        state.pacientes_criticos_para_grafica,
        "hospitalId"
      );

      //PARA OBTENER SOLO LOS NOMBRES PARA LAS CATEGORIAS
      arrayTmp.forEach((item) => {
        arrHospitales.push(item.efector);
      });

      //PARA OBTENER LAS SERIES DE HOMBRES Y MUJERES
      let arrMasculinos = [];
      let arrFemeninos = [];
      arrayTmp.forEach((item) => {
        let masculinos = 0;
        let femeninos = 0;
        todaLaLista.forEach((h) => {
          if (item.hospitalId == h.hospitalId) {
            if (h.sexo == "F") {
              femeninos = h.total;
            }
            if (h.sexo == "M") {
              masculinos = h.total;
            }
          }
        });
        arrMasculinos.push(masculinos);
        arrFemeninos.push(femeninos);
      });

      let datos = {
        hospitales: arrHospitales,
        masculinos: arrMasculinos,
        femeninos: arrFemeninos,
      };

      return datos;
    },
    GET_EFECTORES_PARA_MODAL_HISTORIAL(state) {
      return state.efectoresParaModalDeHistorial;
    },
    GET_EFECTORES_CRITICOS_PARA_MODAL_HISTORIAL(state) {
      return state.efectoresCriticosParaModalDeHistorial;
    },
    GET_CAMAS_ESTABLECIMIENTOS(state) {
      return state.camasPorEstablecimientos;
    },
    GET_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS(state) {
      return state.camasPorEstablecimientosLevesModerados;
    },
    GET_CAMAS_ESTABLECIMIENTOS_CRITICOS(state) {
      return state.camasPorEstablecimientosCriticos;
    },
    GET_PACIENTES_LEVES_MODERADOS(state) {
      return state.pacientesLevesModerados;
    },
    GET_PACIENTES_CRITICOS(state) {
      return state.pacientesCriticos;
    },
  },
};
export default lists;
