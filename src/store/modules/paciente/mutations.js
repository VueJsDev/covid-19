export default {
  SET_EFECTOR_LIST(state, objeto) {
    state.efector_list = objeto;
  },
  SET_PARAMETER_TOTAL_RECORDS(state, value) {
    state.parameter_total_records = value;
  },
  SET_PARAMETER_FILTER(state, value) {
    state.parameter_filter = value;
  },
  SET_PARAMETERS_SEARCH: (state, objeto) => {
    state.parameters_search = objeto
  },
  SET_PARAMETERS_CONDITION: (state, objeto) => {
    state.parameter_condition = objeto
  },
  SET_PATIENTS_LIST: (state, objeto) => {
    state.patients_list = objeto
  },
  SET_RESPONSE_SAVE(state, value) {
    state.responseSave = value;
  },
}