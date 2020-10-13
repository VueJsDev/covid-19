import axios from 'axios'
require("dotenv").config();

const URL = process.env.VUE_APP_API_URI;

let config = {
  headers: {
    'Authorization': `token ${localStorage.getItem('token_api')}`
  }
}

export default {
  FETCH_ACTIVE_CODE: ({ commit }, data) => {
    commit("SET_ACTIVE_CODE", data);
    //console.log("state -> Code selected: " + data.code_active);
  },
  FETCH_DATE_RANGE: ({ commit }, data) => {
    commit("SET_DATE_RANGE", data);
    //console.log("state -> DateFrom: " + data.dateFrom + " y DateTo: " + data.dateTo);
  },
  FETCH_TOTALS: ({ commit }, data) => {
    // I build my URL
    let urlTotals = "/covid/ingresos-totales?fechaDesde="+ data.dateFrom +"&fechaHasta=" + data.dateTo;
    data.dateFrom == data.dateTo ? urlTotals = "/covid/ingresos-totales" : urlTotals;
    
    return new Promise((resolve, reject) => {
    axios
        .get(URL + urlTotals, config)
        .then((res) => {
            //console.log("state Fetch totals result -> " + Object.keys(res.data));
            commit("SET_TOTALS", res.data);
              resolve(res);
        })
        .catch((err) => {
          //console.log(`ERROR FETCH_TOTALS: ${err}`);
          reject(err);
        });
    });
  },
  FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE: function ({ commit }, data) {
    let dateFrom = data.dateFrom;
    let dateTo = data.dateTo;
    let code_active = data.code_active;

    // I build my URL
    let urlGraphic = "/covid/ingresos-detalle";
    let urlDate = "?fechaDesde=" + dateFrom + "&fechaHasta=" + dateTo;
    let urlOrigin = "procedencia=";
    let urlFull = "";

    switch (parseInt(code_active)) {
        case 0:
            dateFrom == dateTo ? urlFull = urlGraphic : urlFull = urlGraphic + urlDate;
            break;
        case 1:
            dateFrom == dateTo ? urlFull = urlGraphic + "?" + urlOrigin + 1 : urlFull = urlGraphic + urlDate + "&" +urlOrigin + 1;
            break;
        case 2:
            dateFrom == dateTo ? urlFull = urlGraphic + "?" +urlOrigin + 2: urlFull = urlGraphic + urlDate + "&" +urlOrigin + 2;
            break;
        default:
            urlFull = urlGraphic;
            break;
    }
    //console.log("FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE -> " + URL + urlFull);

    return new Promise((resolve, reject) => {
      axios
        .get(URL + urlFull, config)
        .then((res) => {
            commit("SET_INCOME_PROVINCE_GRAPHIC_BY_ZONE", res.data);
            resolve(res);
        })
        .catch((err) => {
          //console.log(`ERROR: ${err}`);
          reject(err);
        });
    });
  },
  FETCH_INCOME_PROVINCE_PATIENTS_LIST_FORM_GRAPHIC_BY_ZONE: ({ commit }, data) => {
    let dateFrom = data.dateFrom;
    let dateTo = data.dateTo;
    let code_active = data.code_active;
    let patientFrom = data.patientFrom;

    // I build my URL
    let urlGraphic = "/covid/ingresos-listado-pacientes";
    let urlDate = "?fechaDesde=" + dateFrom + "&fechaHasta=" + dateTo;
    let urlOrigin = "procedencia=";
    let urlFilter = "filtro=3&valor=" + patientFrom;
    //let urlFilter = "filtro=2&valor=25466921";
    let urlFull = "";

    switch (parseInt(code_active)) {
        case 0:
            dateFrom == dateTo ? urlFull = urlGraphic + "?" + urlOrigin + 0 + "&" + urlFilter : urlFull = urlGraphic + urlDate + "&" + urlOrigin + 0 + "&" + urlFilter;
            break;
        case 1:
            dateFrom == dateTo ? urlFull = urlGraphic + "?" + urlOrigin + 1 + "&" + urlFilter: urlFull = urlGraphic + urlDate + "&" + urlOrigin + 1 + "&" + urlFilter;
            break;
        case 2:
            dateFrom == dateTo ? urlFull = urlGraphic + "?" +urlOrigin + 2 + "&" + urlFilter: urlFull = urlGraphic + urlDate + "&" + urlOrigin + 2  + "&" + urlFilter;
            break;
        default:
            urlFull = urlGraphic;
            break;
    }
    //console.log("FETCH_INCOME_PROVINCE_PATIENTS_LIST_FORM_GRAPHIC_BY_ZONE -> " + urlFull);

    return new Promise((resolve, reject) => {
        axios
            .get(URL + urlFull, config)
            .then((res) => {
                commit("SET_INCOME_PATIENTS_PROVINCE_LIST", res.data);
                resolve(res);
            })
            .catch((err) => {
                //console.log(`ERROR INCOME_PATIENTS_PROVINCE_LIST: ${err}`);
                reject(err);
            });
    });
  },
  FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX: function ({ commit }, data) {
    let dateFrom = data.dateFrom;
    let dateTo = data.dateTo;
    let code_active = data.code_active;

    // I build my URL
    let urlGraphic = "/covid/ingresos-por-sexo";
    let urlDate = "?fechaDesde=" + dateFrom + "&fechaHasta=" + dateTo;
    let urlOrigin = "procedencia=";
    let urlFull = "";

    switch (parseInt(code_active)) {
        case 0:
            dateFrom == dateTo ? urlFull = urlGraphic : urlFull = urlGraphic + urlDate;
            break;
        case 1:
            dateFrom == dateTo ? urlFull = urlGraphic + "?" + urlOrigin + 1 : urlFull = urlGraphic + urlDate + "&" +urlOrigin + 1;
            break;
        case 2:
            dateFrom == dateTo ? urlFull = urlGraphic + "?" +urlOrigin + 2: urlFull = urlGraphic + urlDate + "&" +urlOrigin + 2;
            break;
        default:
            urlFull = urlGraphic;
            break;
    }
    //console.log("FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX -> " + urlFull);

    return new Promise((resolve, reject) => {
      axios
        .get(URL + urlFull, config)
        .then((res) => {
            commit("SET_INCOME_PROVINCE_GRAPHIC_BY_SEX", res.data);
            resolve(res);
        })
        .catch((err) => {
            //console.log(`ERROR INCOME_PROVINCE_GRAPHIC_BY_SEX: ${err}`);
            reject(err);
        });
    });
  },
  FETCH_INCOME_PATIENTS_PROVINCE_LIST: ({ commit }, data) => {
    let dateFrom = data.dateFrom;
    let dateTo = data.dateTo;
    let code_active = data.code_active;

    // I build my URL
    let urlGraphic = "/covid/ingresos-listado-pacientes";
    let urlDate = "?fechaDesde=" + dateFrom + "&fechaHasta=" + dateTo;
    let urlOrigin = "procedencia=";
    let urlFull = "";

    switch (parseInt(code_active)) {
        case 0:
            dateFrom == dateTo ? urlFull = urlGraphic : urlFull = urlGraphic + urlDate;
            break;
        case 1:
            dateFrom == dateTo ? urlFull = urlGraphic + "?" + urlOrigin + 1 : urlFull = urlGraphic + urlDate + "&" +urlOrigin + 1;
            break;
        case 2:
            dateFrom == dateTo ? urlFull = urlGraphic + "?" +urlOrigin + 2: urlFull = urlGraphic + urlDate + "&" +urlOrigin + 2;
            break;
        default:
            urlFull = urlGraphic;
            break;
    }
    //console.log("FETCH_INCOME_PATIENTS_PROVINCE_LIST -> " + urlFull);

    return new Promise((resolve, reject) => {
        axios
            .get(URL + urlFull, config)
            .then((res) => {
                commit("SET_INCOME_PATIENTS_PROVINCE_LIST", res.data);
                resolve(res);
            })
            .catch((err) => {
                //console.log(`ERROR INCOME_PATIENTS_PROVINCE_LIST: ${err}`);
                reject(err);
            });
    });
  },
}