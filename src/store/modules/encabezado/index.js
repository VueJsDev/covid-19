import _ from "lodash";
import axios from "axios";
require("dotenv").config();


const URL = process.env.VUE_APP_API_URI;

let config = {
    headers: {
        'Authorization': `token ${localStorage.getItem('token_api')}`
    }
}

const encabezado = {
    namespaced: true,
    state: {
        totals: {},
    },
    actions: {
        FETCH_TOTALS: ({ commit }) => {
            return new Promise((resolve, reject) => {
                axios
                  .get(`${URL}/covid/encabezado-totales`, config)
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
        SET_TOTALS(state, data) {
            state.totals = data;
        },
    },
    getters: {
        GET_TOTALS_HEADER(state) {
            return state.totals;
        }
    },
};
export default encabezado;
