export default {
  SET_ACTIVE_CODE(state, value) {
    state.code_active = value;
  },
  SET_DATE_RANGE(state, objeto){
    state.dateRange = objeto
  },
  SET_TOTALS(state, data) {
    state.totals = data;
  },
  SET_INCOME_PROVINCE_GRAPHIC_BY_ZONE: (state, objeto) => {
    state.graphic_chart_zone = objeto
  },
  SET_INCOME_PROVINCE_GRAPHIC_BY_SEX: (state, objeto) => {
    state.graphic_chart_sex = objeto
  },
  SET_INCOME_PATIENTS_PROVINCE_LIST: (state, objeto) => {
    state.income_patients_province_list= objeto
  },
}