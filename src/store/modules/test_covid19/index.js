import _ from "lodash";
import axios from "axios";
require("dotenv").config();

const URL = process.env.VUE_APP_API_URI;

let config = {
  headers: {
    'Authorization': `token ${localStorage.getItem('token_api')}`
  }
}

const testcovid19 = {
  namespaced: true,
  state: {
    patients: [],
    patients_filter: [],
    totals: {},
    details_patient: [],
    code_patients: 1,
    loading_test_realizados: false,
    loading_test_confirmados: false,
    loading_test_recuperados: false,
    loading_test_diarios: false,
    loading_test_diarios_confirmados: false,
    loading_test_diarios_rehisopados: false,
    loading_test_diarios_pendientes: false,
    loading_test_diarios_negativos: false,
    loading_test_casos_activos: false,
    loading_test_en_transito: false,
    loading_test_obitos: false
  },
  actions: {
    FETCH_PATIENTS: ({ commit }, data) => {
      let code = data.code
      let codeSelect = data.codeSelect ?? 0
      switch (code) {
        case 6:
          commit("SET_LOADING_TEST_REALIZADOS", true)
          break;
        case 7:
          commit("SET_LOADING_TEST_CONFIRMADOS", true)  
          break;
          case 8:
            commit("SET_LOADING_TEST_RECUPERADOS", true)
            break;
          case 1:
            commit("SET_LOADING_TEST_DIARIOS", true)
            break;
          case 2:
            commit("SET_LOADING_TEST_DIARIOS_CONFIRMADOS", true)
            break;
          case 3:
              commit("SET_LOADING_TEST_DIARIOS_REHISOPADOS", true)
              break;
          case 5:
              commit("SET_LOADING_TEST_DIARIOS_PENDIENTES", true)
              break;
          case 4:
              commit("SET_LOADING_TEST_DIARIOS_NEGATIVOS", true)
              break;
          case 9:
              commit("SET_LOADING_CASOS_ACTIVOS", true)
              break;
          case 10:
              commit("SET_LOADING_EN_TRANSITO", true)
              break;
          case 12:
              commit("SET_LOADING_OBITOS", true)
              break;


      }
      return new Promise((resolve, reject) => {
        axios
        .get(URL + "/hisopados/paciente-listado?codigo=" + code, config)
          .then((res) => {
            commit("SET_PATIENTS", res.data);
            if ( code == 6 && codeSelect != 0){
              let data = {
                patients: res.data,
                codeSelect: codeSelect
              }
              commit("FILTER_TOTAL_TEST_REALIZADOS", data);
            } else {
              commit("SET_CODE_PATIENTS", code)
            }

            commit("SET_LOADING_TEST_REALIZADOS", false)
            commit("SET_LOADING_TEST_CONFIRMADOS", false)
            commit("SET_LOADING_TEST_DIARIOS", false)
            commit("SET_LOADING_TEST_RECUPERADOS", false)
            commit("SET_LOADING_TEST_DIARIOS_CONFIRMADOS", false)
            commit("SET_LOADING_TEST_DIARIOS_REHISOPADOS", false)
            commit("SET_LOADING_TEST_DIARIOS_PENDIENTES", false)
            commit("SET_LOADING_TEST_DIARIOS_NEGATIVOS", false)
            commit("SET_LOADING_CASOS_ACTIVOS", false)
            commit("SET_LOADING_EN_TRANSITO", false)
            commit("SET_LOADING_OBITOS", false)

            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
      });
    },
    FETCH_DATA_DETAIL_PATIENT: ({ commit }, data) => {
      let id = data.idPatient
      return new Promise((resolve, reject) => {
        axios
        .get(URL + "/hisopados/paciente-detalle?pacienteId=" + id, config)
          .then((res) => {
            commit("SET_DETAIL_PATIENT", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(`ERROR: ${err}`);
            reject(err);
          });
        });
    },
    FETCH_TOTALS: ({ commit }) => {
      return new Promise((resolve, reject) => {
      axios
        .get(URL + "/hisopados/totales", config)
        .then((res) => {
          commit("SET_TOTALS", res.data);
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
    FILTER_TOTAL_TEST_REALIZADOS(state, data){
      let patients = data.patients
      let codeSelect = data.codeSelect
      
      //1 - Pendientes
      //2 - Negativos
      //3 - Rehisopados

      if (codeSelect == -1) {
        state.patients = patients
      } else {
        state.patients = []
        patients.forEach(patient => {
          if (codeSelect == 1) {
            if (patient.ResultadoPendiente == 1){
              state.patients.push(patient)
            }
          } else if ( codeSelect == 2 ){
            if (patient.ResultadoPendiente != 1 && patient.Positivo < 1) {
              state.patients.push(patient)
            }
          } else if (codeSelect == 3) {
            if (patient.Positivo > 1) {
              state.patients.push(patient)
            }
          }
        })
      }
    },
    SET_LOADING_TEST_RECUPERADOS(state, value){
      state.loading_test_recuperados = value
    },
    SET_LOADING_TEST_REALIZADOS(state, value){
      state.loading_test_realizados = value
    },
    SET_LOADING_TEST_CONFIRMADOS(state, value){
      state.loading_test_confirmados = value
    },
    SET_LOADING_TEST_DIARIOS(state, value){
      state.loading_test_diarios = value
    },
    SET_LOADING_TEST_DIARIOS_CONFIRMADOS(state, value){
      state.loading_test_diarios_confirmados = value
    },
    SET_LOADING_TEST_DIARIOS_REHISOPADOS(state, value){
      state.loading_test_diarios_rehisopados = value
    },
    SET_LOADING_TEST_DIARIOS_PENDIENTES(state, value){
      state.loading_test_diarios_pendientes = value
    },
    SET_LOADING_TEST_DIARIOS_NEGATIVOS(state, value){
      state.loading_test_diarios_negativos = value
    },
    SET_LOADING_CASOS_ACTIVOS(state, value) {
      state.loading_test_casos_activos = value
    },
    SET_LOADING_EN_TRANSITO(state, value) {
      state.loading_test_en_transito = value
    },
    SET_LOADING_OBITOS(state, value) {
      state.loading_test_obitos = value
    },
    SET_PATIENTS(state, data) {
      state.patients = data;
    },
    SET_CODE_PATIENTS(state, code){
      state.code_patients = code
    },
    SET_DETAIL_PATIENT(state, data){
      state.details_patient = data
    },
    SET_TOTALS(state, data) {
      state.totals = data;
    },
  },
  getters: {
    GET_PATIENTS(state) {
      return state.patients;
    },
    GET_CODE_PATIENTS(state) {
      return state.code_patients
    },
    GET_DETAIL_PATIENT(state){
      return state.details_patient
    },
    GET_TOTALS(state) {
      return state.totals;
    },
    GET_LOADING_TEST_REALIZADOS(state) {
      return state.loading_test_realizados
    },
    GET_LOADING_TEST_CONFIRMADOS(state){
      return state.loading_test_confirmados
    },
    GET_LOADING_TEST_DIARIOS(state){
      return state.loading_test_diarios
    },
    GET_LOADING_TEST_RECUPERADOS(state){
      return state.loading_test_recuperados
    },
    GET_LOADING_TEST_DIARIOS_CONFIRMADOS(state){
      return state.loading_test_diarios_confirmados
    },    
    GET_LOADING_TEST_DIARIOS_REHISOPADOS(state){
      return state.loading_test_diarios_rehisopados
    },
    GET_LOADING_TEST_DIARIOS_PENDIENTES(state){
      return state.loading_test_diarios_pendientes
    },
    GET_LOADING_TEST_DIARIOS_NEGATIVOS(state){
      return state.loading_test_diarios_negativos
    },
    GET_LOADING_CASOS_ACTIVOS(state){
      return state.loading_test_casos_activos
    },
    GET_LOADING_EN_TRANSITO(state) {
      return state.loading_test_en_transito
    },
    GET_LOADING_OBITOS(state) {
      return state.loading_test_obitos
    }
  },
};
export default testcovid19;
