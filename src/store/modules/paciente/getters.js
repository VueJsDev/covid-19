export default {
  GET_EFECTOR_LIST(state){
    return state.efector_list;
  },
  GET_PARAMETER_TOTAL_RECORDS(state) {
    return state.parameter_total_records;
  },
  GET_PARAMETER_FILTER(state){
    return state.parameter_filter;
  },
  GET_PARAMETERS_SEARCH(state) {
    return state.parameters_search;
  },
  GET_PARAMETER_CONDITION(state) {
    return state.parameter_condition;
  },
  GET_PATIENTS_LIST(state) {
    return state.patients_list;
  },
  GET_RESPONSE_SAVE(state) {
    return state.responseSave;
  },
}