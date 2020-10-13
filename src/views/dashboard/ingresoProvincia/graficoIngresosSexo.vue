<template>
    <div class="m-portlet heightCard">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon m--hide">
                        <i class="la la-gear"></i>
                    </span>
                    <h3 class="m-portlet__head-text">
                        INGRESO POR SEXO
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="m-section">
                <div class="row">
                    <div class="col-md-12">
                        <div class="m-section__content">
                            <div class="row">
                              <div class="col-md-12">
                                  <div id="chart">
                                        <apexchart type="pie" 
                                            width="100%"
                                            :options="chartOptions" 
                                            :series="series">
                                        </apexchart>
                                  </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import { mapActions, mapState, mapGetters} from 'vuex';

import apexchart from 'vue-apexcharts'
var esApex = require("apexcharts/dist/locales/es.json")

export default {
    data() {
        return {
            dateFrom:    new Date(),
            dateTo:      new Date(),
            es: esApex,
            currentDate: new Date()
        }
    },

    created() {
        this.getData()
    },

    methods: {
        ...mapActions('ingreosALaProvincia', [
            'FETCH_INCOME_PROVINCE_PATIENTS_LIST_FORM_GRAPHIC_BY_ZONE',
            'FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX']),
        
        getData() {
            
            // Get Date updated
            let arrDataDate = this.vDate;
            let dateF = new Date(arrDataDate['dateFrom']);
            let dateT = new Date(arrDataDate['dateTo']);

            let dateFrom = `${dateF.getFullYear()}/${dateF.getMonth() + 1}/${dateF.getDate()}`;
            let dateTo   = `${dateT.getFullYear()}/${dateT.getMonth() + 1}/${dateT.getDate()}`;

            // Get Code updated
            let arrDataCode = this.vCode;
            let code_active = arrDataCode['code_active'];

            // I checked dates
            if (Date.parse(dateFrom) > Date.parse(dateTo)) {
                alert("La fecha hasta debe ser posterior a la fecha Desde");
            }
            else  {
                let data = {
                        dateFrom,
                        dateTo,
                        code_active
                    }

                this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX(data)
            }

            
        }
    },

    computed: {
        ...mapGetters('ingreosALaProvincia', {
            vCode: 'GET_ACTIVE_CODE',
            vDate: 'GET_DATE_RANGE',
            vSex: 'GET_INCOME_PROVINCE_GRAPHIC_BY_SEX'}),

        series(){
            let arrData = this.vCode;
            
            switch (arrData['code_active']) {
                case 1:
                    $("#titleListSex").text("INGRESOS POR SEXO DESDE EL EXTERIOR");
                    break;
                case 2:
                    $("#titleListSex").text("INGRESOS POR SEXO DESDE EL INTERIOR DEL PAIS");
                    break;
                default:
                    $("#titleListSex").text("INGRESOS POR SEXO A LA PROVINCIA");
                    break;
            }
            return this.vSex.quantity
        },
        
        chartOptions(){
            return {
                chart: {
                    type: 'pie',
                    events: {
                        dataPointSelection: (event, chartContext, config) => { 
                            //let income = this.graphicIncomeZone.incomeFrom[config.selectedDataPoints];
                            //this.labelSelectedChartBar(income);
                            //console.log("dataPointSelection: " + config.selectedDataPoints, config);
                        }
                    },
                },
                colors:this.vSex.colors,
                labels: this.vSex.sex,
                responsive: [{
                    breakpoint: 1000,
                    options: {},
                }],
                legend: {
                    position: 'bottom',
                    horizontalAlign: 'center'
                },
                
            }
        }
    },

    components: {
        apexchart
    }
}
</script>

<style scoped>
.header_color {
    background-color: #E0E0E0;
}
.heightCard {
    height: 550px;
}
.myHeaderTitleList {
    word-break: break-word;
    height: auto;
    min-height: 65px;
}
</style>