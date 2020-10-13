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

const upac_procedencias = {
    namespaced: true,
    state: {
        upac_informes_de_procedencias: [],
        upac_informes_de_procedencias_sexo: []
    },
    actions: {
        FETCH_INFORMES_DE_LAS_PROCEDENCIAS_PARA_GRAFICOS: function ({ commit }, datos) {
            // console.log('Datos de procedencias', datos);
            let fechaDesde = datos.fechaDesde;
            let fechaHasta = datos.fechaHasta;
            let sexo = datos.sexoId;
            if (sexo == 0) {
              //console.log('Es cero traer todos los datos');
              return new Promise((resolve, reject) => {
                axios
                  .get(URL + "/upac/procedencia-detalle-historial?fechaDesde=" + fechaDesde + "&fechaHasta=" +
                    fechaHasta, config)
                  .then((res) => {
                    commit("SET_INFORMES_DE_LAS_PROCEDENCIAS_PARA_GRAFICOS", res.data);
                    resolve(res);
                  })
                  .catch((err) => {
                    console.log(`ERROR: ${err}`);
                    reject(err);
                  });
              });
            } else {
              //console.log('Viene con filtro datos de prcedencias', sexo);
              return new Promise((resolve, reject) => {
                axios
                  .get(URL + "/upac/procedencia-detalle-historial?fechaDesde=" + fechaDesde + "&fechaHasta=" +
                    fechaHasta + "&sexo=" + sexo, config)
                  .then((res) => {
                    console.log('Datos con filtro', res);
                    commit("SET_INFORMES_DE_LAS_PROCEDENCIAS_PARA_GRAFICOS", res.data);
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
        SET_INFORMES_DE_LAS_PROCEDENCIAS_PARA_GRAFICOS: (state, objeto) => {
          state.upac_informes_de_procedencias = objeto
        },
    },
    getters: {
      GET_INFORMES_PROCEDENCIAS_GRAFICOS(state) {
        let procedencias = []
        let cantidad = []

        let arrayProcedencias = state.upac_informes_de_procedencias
        
        arrayProcedencias.forEach((item) => {
            procedencias.push(item.Procedencia)
            cantidad.push(item.Cantidad)
        })
        
        let datos = {
            procedencias, cantidad
        }
        return datos;
      },
      GET_INFORMES_PROCEDENCIAS_SEXO(state) {
        let arrProcedencias = [];

        let todaLaLista = state.upac_informes_de_procedencias;
        //console.log('Index', todaLaLista)
        
        let arrayTmp = _.uniqBy(
          state.upac_informes_de_procedencias,
          "ProcedenciaID"
        );

        //PARA OBTENER SOLO LOS NOMBRES PARA LAS CATEGORIAS
        arrayTmp.forEach((item) => {
            arrProcedencias.push(item.Procedencia);
        });

        //PARA OBTENER LAS SERIES DE HOMBRES Y MUJERES
        let arrMasculinos = [];
        let arrFemeninos = [];
        
        arrayTmp.forEach((item) => {
          let masculinos = 0;
          let femeninos = 0;
          todaLaLista.forEach((h) => {
            if (item.ProcedenciaID == h.ProcedenciaID) {
              if (h.Sexo == "F") {
                femeninos = h.Cantidad;
              }
              if (h.Sexo == "M") {
                masculinos = h.Cantidad;
              }
            }
          });
          arrMasculinos.push(masculinos);
          arrFemeninos.push(femeninos);
        });

        let datos = {
          procedencias: arrProcedencias,
          masculinos: arrMasculinos,
          femeninos: arrFemeninos,
        };
        
        return datos;
      },

      GET_INFORMES_PROCEDENCIAS_SEXO_PARA_GRAFICOS_CANTIDAD(state) {
        let todaLaLista = state.upac_informes_de_procedencias;
        let total = 0;
        todaLaLista.forEach((h) => {
          total = total + h.Cantidad
        });
        
        return total;
      }
    }
}

export default upac_procedencias;