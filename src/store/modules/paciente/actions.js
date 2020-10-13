import axios from 'axios'

require("dotenv").config();
const URL = process.env.VUE_APP_API_URI;

let config = {
  headers: {
    'Authorization': `token ${localStorage.getItem('token_api')}`
  }
}

export default {
  FETCH_EFECTOR_LIST: ({ commit }, data) => {
    // I build my URL
    let urlFull = "/complementos/covid-establecimientos-deriva-listado";

    //console.log("FETCH_EFECTOR_LIST -> " + URL + urlFull);

    return new Promise((resolve, reject) => {
        axios
            .get(URL + urlFull, config)
            .then((res) => {
                commit("SET_EFECTOR_LIST", res.data);
                resolve(res);
            })
            .catch((err) => {
                console.log(`ERROR EFECTOR_LIST: ${err}`);
                reject(err);
            });
    });
  },
  FETCH_PARAMETER_TOTAL_RECORDS: ({ commit }, data) => {
    commit("SET_PARAMETER_TOTAL_RECORDS", data);
    //console.log("state -> Parameters: " + Object.keys(data));
  },
  FETCH_PARAMETER_FILTER: ({ commit }, data) => {
    commit("SET_PARAMETER_FILTER", data);
    //console.log("state -> Parameters: " + Object.keys(data));
  },
  FETCH_PARAMETERS_SEARCH: ({ commit }, data) => {
    commit("SET_PARAMETERS_SEARCH", data);
    //console.log("state -> Parameters: " + Object.keys(data));
  },
  FETCH_PARAMETER_CONDITION: ({ commit }, data) => {
    commit("SET_PARAMETERS_CONDITION", data);
    //console.log("state -> Parameters: " + Object.keys(data));
  },
  FETCH_PATIENTS_LIST: ({ commit }, data) => {
    let searchFor       = data.codeSearchFor;
    let txtSearchFor    = data.txtSearch;
    let parameterFilter = data.parameterFilter;
    let codePageSearch  = data.codePageSearch;
    let total_records   = data.totalRecords;

    typeof searchFor       == 'undefined' ? searchFor       = 2  : searchFor       = data.codeSearchFor;
    typeof txtSearchFor    == 'undefined' ? txtSearchFor    = '' : txtSearchFor    = data.txtSearch;
    typeof parameterFilter == 'undefined' ? parameterFilter = 1  : parameterFilter = data.parameterFilter;
    typeof codePageSearch  == 'undefined' ? codePageSearch  = 1  : codePageSearch  = data.codePageSearch;
    typeof total_records   == 'undefined' ? total_records   = 10 : total_records   = data.totalRecords;

    // I going to build my URL
    let urlGraphic         = "/pacientes/tablero-covid-paciente-listado?";
    let urlFilter          = "filtro1="  + searchFor;
    let urlTxtSearch       = "&VALOR1='" + txtSearchFor + "'";
    let urlParameterFilter = "&filtro2=" + parameterFilter;
    let urlTotalRegister   = "&cantreg=" + total_records;
    let urlPage            = "&nropag="  + codePageSearch;
    
    let urlFull = urlGraphic + urlFilter + urlTxtSearch + urlParameterFilter + urlTotalRegister + urlPage;

    //console.log("FETCH_PATIENTS_LIST -> " + URL + urlFull);

    return new Promise((resolve, reject) => {
        axios
            .get(URL + urlFull, config)
            .then((res) => {
                commit("SET_PATIENTS_LIST", res.data);
                resolve(res);
            })
            .catch((err) => {
                console.log(`ERROR PATIENTS_LIST: ${err}`);
                reject(err);
            });
    });
  },
  FETCH_SAVE_CONDITION_PATIENT: ({ commit }, data) => {
    // I'm going to build my URL
    let urlRoot     = "/pacientes/tablero-covid-paciente-condicion";

    //console.log("PatientID: " + data.patientID + " - ConditionID: " + data.conditionID);
    
    return new Promise((resolve, reject) => {
        axios
            .post(URL + urlRoot,
              {
                PacienteID: data.patientID,
                CondicionID: data.conditionID
              }, 
              config)
            .then((res) => {
                //console.log("Res.status:" + res.status);
                let responseSave = res.status;
                let data = {
                  responseSave
                }
                commit("SET_RESPONSE_SAVE", data)
                resolve(res);
            })
            .catch((err) => {
                //console.log(`ERROR PATIENTS_LIST: ${err}`);
                //console.log('Status Data: '   + err.response.status);
                let responseSave = err.response.status;
                let data = {
                  responseSave
                }
                commit("SET_RESPONSE_SAVE", data)
                reject(err);
            });
    });
  },
  FETCH_RESPONSE_SAVE: ({ commit }, data) => {
    commit("SET_RESPONSE_SAVE", data);
    //console.log("state -> Parameters: " + Object.keys(data));
  },
}