export default {
  GET_ACTIVE_CODE(state){
    //console.log("store: code selected " + state.code_active);
    return state.code_active
  },
  GET_DATE_RANGE(state) {
    return state.dateRange
  },
  GET_TOTALS(state) {
    return state.totals;
  },
  GET_INCOME_PROVINCE_GRAPHIC_BY_ZONE(state) {
    let incomeFrom = []
    let quantity = []
    let colors = []
    let arrayIncome = state.graphic_chart_zone

    function generarLetra(){
      var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
      var numero = (Math.random()*15).toFixed(0);
      return letras[numero];
    }          
    function colorHEX(){
      var vColor = "";
      for(var i=0;i<6;i++){
        vColor = vColor + generarLetra() ;
      }
      return "#" + vColor;
    }

    arrayIncome.forEach((item) => {
      incomeFrom.push(item.Lugar)
      quantity.push(item.Cantidad)
      colors.push(colorHEX())
    })
    
    let vData = {
      incomeFrom, quantity, colors
    }
    return vData;
  },
  GET_INCOME_PROVINCE_GRAPHIC_BY_SEX(state) {
    let sex = []
    let quantity = []
    let colors = []
    let arraySex = state.graphic_chart_sex
    arraySex.forEach((item) => {
      switch (item.Codigo) {
        case "M":
            sex.push('Masculino')
            colors.push('#36A3F7')
            break;
        case "F":
            sex.push('Femenino')
            colors.push('#F736D5')
            break;
        default:
            sex.push('No definido')
            colors.push('#716ACA')
            break;
      }
      quantity.push(item.Cantidad)
    })

    let vData = {
      sex, quantity, colors
    }
    return vData;
  },
  GET_INCOME_PATIENTS_PROVINCE_LIST(state) {
    return state.income_patients_province_list;
  },
}