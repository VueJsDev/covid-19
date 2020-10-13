import Vue from "vue";
import Vuex from "vuex";

import totals from "./modules/camas/totals";
import lists from "./modules/camas/lists";
import encabezado from "./modules/encabezado"
import testcovid19 from "./modules/test_covid19";
import upac from "./modules/upac_informes/covid19";
import upac_procedencias from "./modules/upac_informes_procedencias/index";
import users from "./modules/users";
import ingreosALaProvincia from "./modules/ingresos/index";
import paciente from "./modules/paciente/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    totals,
    lists,
    upac,
    users,
    encabezado,
    upac_procedencias,
    testcovid19,
    ingreosALaProvincia,
    paciente,
  },
});
