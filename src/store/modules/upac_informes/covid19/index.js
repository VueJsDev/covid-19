import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
require("dotenv").config();

const URL = process.env.VUE_APP_API_URI;

let config = {
  headers: {
    'Authorization': `token ${localStorage.getItem('token_api')}`
  }
}

const upac = {
  namespaced: true,
  state: {
    totales: {},
    procedencias_totales: [],
    hisopados_totales: [],
    protocolos_activados_totales: [],
    comparacion_dia_anterior: [],
    detalleProcedenciaDia: [],
    ingresoAlEfectorPorSexo: [],
    ingresos_a_la_provincia_listado: [],
    comparacion_ingresos_de_la_pultima_semana: [],
    distribucion_por_rango_etario_y_sexo: [],
    ingresos_a_la_provincia_graficos: []
  },
  actions: {
    FETCH_TOTALES: function ({ commit }, fechaFiltroGeneral) {
      let fechaDesde = fechaFiltroGeneral
      if (fechaDesde == undefined) {
        
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(URL+"/upac/total-general?fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaDesde, config)
            .then((res) => {
              commit("SET_TOTALES_PROCEDENCIAS", res.data);
              commit("SET_TOTALES_HISOPADOS", res.data);
              commit("SET_TOTALES_PROTOCOLOS_ACTIVADOS", res.data);
              commit("SET_TOTALES_COMPARACION_DIA_ANTERIOR", res.data);
              //console.log('respuesta', res.data);
              resolve(res);
            })
            .catch((err) => {
              console.log(`ERROR: ${err}`);
              reject(err);
            });
        });
      }
    },

    DETALLE_PROCEDENCIA_DIA: function ({ commit }, fechaFiltroGeneral) {
      let fechaDesde = fechaFiltroGeneral
      if (fechaDesde == undefined) {
        
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(URL+"/upac/procedencia-detalle?fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaDesde, config)
            .then((res) => {
              commit("SET_DETALLE_PROCEDENCIA_DIA", res.data);
              resolve(res);
            })
            .catch((err) => {
              console.log(`ERROR: ${err}`);
              reject(err);
            });
        });
      }
    },

    INGRESO_AL_EFECTOR_POR_SEXO: function ({ commit }, fechaFiltroGeneral) {
      let fechaDesde = fechaFiltroGeneral
      if (fechaDesde == undefined) {
        
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(URL + "/upac/ingresos-por-sexo?fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaDesde, config)
            .then((res) => {
              commit("SET_INGRESO_AL_EFECTOR_POR_SEXO", res.data);
              resolve(res);
            })
            .catch((err) => {
              console.log(`ERROR: ${err}`);
              reject(err);
            });
        });
      }
    },

    INGRESOS_A_LA_PROVINCIA_LISTADO: function ({ commit }, fechaFiltroGeneral) {
      let fechaDesde = fechaFiltroGeneral
      if (fechaDesde == undefined) {
        
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(URL + "/upac/ingresos-provincia?fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaDesde, config)
            .then((res) => {
              commit("SET_INGRESOS_A_LA_PROVINCIA_LISTADO", res.data);
              resolve(res);
            })
            .catch((err) => {
              console.log(`ERROR: ${err}`);
              reject(err);
            });
        });
      }
    },

    COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA: function ({ commit }, fechaFiltroGeneral) {
      let fechaDesde = fechaFiltroGeneral
      if (fechaDesde == undefined) {
        
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(URL + "/upac/ingresos-ultima-semana?fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaDesde, config)
            .then((res) => {
              commit("SET_COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA", res.data);
              resolve(res);
            })
            .catch((err) => {
              console.log(`ERROR: ${err}`);
              reject(err);
            });
        });
      }
    },

    DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO: function ({ commit }, fechaFiltroGeneral) {
      let fechaDesde = fechaFiltroGeneral
      if (fechaDesde == undefined) {
        
      } else {
        return new Promise((resolve, reject) => {
          axios
            .get(URL + "/upac/ingresos-por-sexo-y-edad?fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaDesde, config)
            .then((res) => {
              commit("SET_DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO", res.data);
              resolve(res);
            })
            .catch((err) => {
              console.log(`ERROR: ${err}`);
              reject(err);
            });
        });
      }
    },
    
    FETCH_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS: function ({ commit }, datos) {
      console.log('Datos', datos);
      let fechaDesde = datos.fechaDesde;
      let fechaHasta = datos.fechaHasta;
      let procedenciaId = datos.procedenciaId;
      if (procedenciaId == 0) {
        // console.log('Es cero traer todos los datos');
        return new Promise((resolve, reject) => {
          axios
            .get(URL + "/upac/ingresos-provincia?fechaDesde=" + fechaDesde + "&fechaHasta=" +
              fechaHasta, config)
            .then((res) => {
              // console.log('Datos con filtro', res);
              commit("SET_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS", res.data);
              resolve(res);
            })
            .catch((err) => {
              console.log(`ERROR: ${err}`);
              reject(err);
            });
        });
      } else {
        console.log('Viene con filtro', procedenciaId);
        return new Promise((resolve, reject) => {
          axios
            .get(URL + "/upac/ingresos-provincia?fechaDesde=" + fechaDesde + "&fechaHasta=" +
              fechaHasta + "&procedenciaId=" + procedenciaId, config)
            .then((res) => {
              // console.log('Datos con filtro', res);
              commit("SET_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS", res.data);
              resolve(res);
            })
            .catch((err) => {
              console.log(`ERROR: ${err}`);
              reject(err);
            });
        });
      }
    },
  },
  mutations: {
    SET_TOTALES_PROCEDENCIAS: (state, objeto) => {
      state.procedencias_totales = objeto.procedencia
    },
    SET_TOTALES_HISOPADOS: (state, objeto) => {
      state.hisopados_totales = objeto.hisopados
    },
    SET_TOTALES_PROTOCOLOS_ACTIVADOS: (state, objeto) => {
      state.protocolos_activados_totales = objeto.protocoloActivado
    },
    SET_TOTALES_COMPARACION_DIA_ANTERIOR: (state, objeto) => {
      state.comparacion_dia_anterior = objeto.comparacionDiaAnterior
    },
    SET_DETALLE_PROCEDENCIA_DIA: (state, objeto) => {
      state.detalleProcedenciaDia = objeto;
    },
    SET_INGRESO_AL_EFECTOR_POR_SEXO: (state, objeto) => {
      state.ingresoAlEfectorPorSexo = objeto
    },
    SET_INGRESOS_A_LA_PROVINCIA_LISTADO: (state, objeto) => {
      state.ingresos_a_la_provincia_listado = objeto
    },
    SET_COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA: (state, objeto) => {
      state.comparacion_ingresos_de_la_pultima_semana = objeto
    },
    SET_DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO: (state, objeto) => {
      state.distribucion_por_rango_etario_y_sexo = objeto
    },
    SET_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS: (state, objeto) => {
      state.ingresos_a_la_provincia_graficos = objeto
    }
  },
  getters: {
    GET_TOTALES_PROCEDENCIAS: state => state.procedencias_totales,
    GET_TOTALES_HISOPADOS: state => state.hisopados_totales,
    GET_TOTALES_PROTOCOLOS_ACTIVADOS: state => state.protocolos_activados_totales,
    GET_TOTALES_COMPARACION_CON_DIA_ANTERIOR: state => state.comparacion_dia_anterior,
    GET_DETALLE_PROCEDENCIA_DIA(state) {
      let procedencias = []
      let cantidad = []

      let arrayProcedencias = state.detalleProcedenciaDia

      arrayProcedencias.forEach((item) => {
        procedencias.push(item.procedencia)
        cantidad.push(item.cantidad)
      })
      
      let datos = {
        procedencias, cantidad
      }
      return datos;
    },
    GET_INGRESO_AL_EFECTOR_POR_SEXO(state) {
      let sexo = []
      let cantidad = []
      let colors = []
      let arraySexos = state.ingresoAlEfectorPorSexo
      arraySexos.forEach((item) => {
        if (item.sexo == 'M') {
          sexo.push('Masculino')
          colors.push('#5dbfe3')
        } else {
          sexo.push('Femenino'),
          colors.push('#f589d6')
        }
        cantidad.push(item.cantidad)
      })

      let datos = {
        sexo, cantidad, colors
      }
      return datos;
    },
    GET_INGRESOS_A_LA_PROVINCIA_LISTADO: state => state.ingresos_a_la_provincia_listado,
    GET_COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA(state) {
      let fechas = []
      let cantidad = []
      let arrayComparacionUltimaSemana = state.comparacion_ingresos_de_la_pultima_semana
      arrayComparacionUltimaSemana = _.orderBy(state.comparacion_ingresos_de_la_pultima_semana, ['desc'])
      arrayComparacionUltimaSemana.forEach((item) => {
        fechas.push(item.fecha)
        cantidad.push(item.cantidad)
      })
      let datos = {
        fechas, cantidad
      }
      return datos;
    },
    GET_DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO(state) {
      let arrEdades = [];
      let todaLaLista = state.distribucion_por_rango_etario_y_sexo;
      let arrayTmp = _.uniqBy(
        state.distribucion_por_rango_etario_y_sexo,
        "edad"
      );
      //PARA OBTENER SOLO LOS NOMBRES PARA LAS CATEGORIAS
      arrayTmp.forEach((item) => {
        arrEdades.push(item.edad);
      });
      //PARA OBTENER LAS SERIES DE HOMBRES Y MUJERES
      let arrMasculinos = [];
      let arrFemeninos = [];
      arrayTmp.forEach((item) => {
        let masculinos = 0;
        let femeninos = 0;
        todaLaLista.forEach((h) => {
          if (item.edad == h.edad) {
            if (h.sexo == "F") {
              femeninos = h.cantidad;
            }
            if (h.sexo == "M") {
              masculinos = h.cantidad;
            }
          }
        });
        arrMasculinos.push(masculinos);
        arrFemeninos.push(femeninos);
      });
      let datos = {
        edad: arrEdades,
        masculinos: arrMasculinos,
        femeninos: arrFemeninos,
      };
      return datos;
    },
    GET_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS(state) {
      let lugar = []
      let cantidad = []
      let arrayLugares = state.ingresos_a_la_provincia_graficos
      arrayLugares.forEach((item) => {
        lugar.push(item.lugar)
        cantidad.push(item.cantidad)
      })
      let datos = {
        lugar, cantidad
      }
      return datos;
    },
    GET_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS_CANTIDAD(state) {
      let todaLaLista = state.ingresos_a_la_provincia_graficos;
      let total = 0;
      todaLaLista.forEach((h) => {
        total = total + h.cantidad
      });
      return total;
    }
  }
}
export default upac;