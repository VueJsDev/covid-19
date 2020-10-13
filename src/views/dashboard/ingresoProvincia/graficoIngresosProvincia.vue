<template>
    <div class="m-portlet heightCard">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon m--hide">
                        <i class="la la-gear"></i>
                    </span>
                    <h3 class="m-portlet__head-text">
                        DETALLE SEGÚN LA REGIÓN DE LOS INGRESOS DE LA PROVINCIA
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
                                  <div>
                                        <br><br>
                                        <apexchart type="bar" 
                                            height="350" 
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
        <!-- ERROR CLICK ON CHART  -->
        <div class="modal fade" id="modalClickOnChart" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <span style="color: #ff6600;"><i class="fas fa-exclamation-triangle fa-2x"></i></span>
                            <span style="margin-left: 10px;">NO SE REGISTRÓ EL CLICK</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="m-section__content table-wrapper">
                            <div id="idNamePatient">
                                <span style="color:Tomato;"><i class="far fa-check-circle fa-2x"></i></span>
                                <span style="vertical-align: 4px; margin-left: 10px">POR FAVOR INTENTELO DE NUEVO</span>
                            </div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import apexchart from 'vue-apexcharts'
var esApex = require("apexcharts/dist/locales/es.json")

import {es} from 'vuejs-datepicker/dist/locale'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { mapActions, mapState, mapGetters} from 'vuex';

export default {
    data() {
        return {
            dateFrom:    new Date(),
            dateTo:      new Date(),
            es:          esApex,
            currentDate: new Date(),
            barSelected: 5,
        }
    },

    created() {
        this.getData()
    },

    methods: {
        ...mapActions('ingreosALaProvincia', [
            'FETCH_TOTALS', 
            'FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE', 
            'FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX',
            'FETCH_INCOME_PATIENTS_PROVINCE_LIST',
            'FETCH_DATE_RANGE', 
            'FETCH_ACTIVE_CODE',
            'FETCH_INCOME_PROVINCE_PATIENTS_LIST_FORM_GRAPHIC_BY_ZONE']),
        
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

                this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE(data)
            }
        },

        labelSelectedChartBar(vPatientForm) {
            
            if( typeof vPatientForm === 'undefined') {
                //$('#modalClickOnChart').modal("show");
                swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'No hemos podido registrar su click. Por favor, intentelo de nuevo.',
                    timer: 3000
                });
            }
            else {
                this.$toasted.show('Actualizando lista de pacientes...', {
                        icon : 'fa-hourglass-half ',
                        theme: 'outline',
                        position: 'bottom-right'
                });

                let patientFrom = vPatientForm;
            
                let arrDataDate = this.vDate;
                let dateF = new Date(arrDataDate['dateFrom']);
                let dateT = new Date(arrDataDate['dateTo']);
                
                let dateFrom = `${dateF.getFullYear()}/${dateF.getMonth() + 1}/${dateF.getDate()}`;
                let dateTo   = `${dateT.getFullYear()}/${dateT.getMonth() + 1}/${dateT.getDate()}`;
                
                let arrDataCode = this.vCode;
                let code_active = arrDataCode['code_active'];

                if (Date.parse(dateFrom) > Date.parse(dateTo)) {
                    //alert("La fecha hasta debe ser posterior a la fecha Desde");
                    swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'No hemos podido registrar su click. Por favor, intentelo de nuevo.',
                        timer: 3000
                    });
                }
                else  {
                    let data = {
                            dateFrom,
                            dateTo,
                            code_active,
                            patientFrom
                        }
                    /*
                    // It's going to list position
                    let listPatient = document.getElementById('listPatient');
                    listPatient.scrollIntoView({block: "start", behavior: "smooth", alignTo: true});
                    
                    // Fixing position
                    let positionY = window.scrollY - 75;
                    window.scroll({ top: positionY, left: 0, behavior: 'smooth' });
                    */
                    var targetOffset = $('#listPatient').offset().top - 75;
                    $('html, body').animate( { scrollTop: targetOffset}, 500 );

                    // Update all data of the income to province
                    this.FETCH_TOTALS(data);
                    this.FETCH_ACTIVE_CODE(data);
                    this.FETCH_DATE_RANGE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX(data),
                    this.FETCH_INCOME_PROVINCE_PATIENTS_LIST_FORM_GRAPHIC_BY_ZONE(data)
                }
            }
        }
    },

    computed: {
        ...mapGetters('ingreosALaProvincia', { 
            vCode: 'GET_ACTIVE_CODE',
            vDate: 'GET_DATE_RANGE',
            graphicIncomeZone: 'GET_INCOME_PROVINCE_GRAPHIC_BY_ZONE' }
        ),

        

        series(){
            let vSerie = [
                {
                    name: 'Cantidad',
                    data: this.graphicIncomeZone.quantity
                }
            ]
            
            let arrData = this.vCode;
            switch (arrData['code_active']) {
                case 1:
                    $("#titleChartBar").text("DETALLE SEGÚN LA REGIÓN DE LOS INGRESOS DE LA PROVINCIA DESDE EL EXTERIOR");
                    break;
                case 2:
                    $("#titleChartBar").text("DETALLE SEGÚN LA REGIÓN DE LOS INGRESOS DE LA PROVINCIA DESDE EL INTERIOR DEL PAIS");
                    break;
                default:
                    $("#titleChartBar").text("DETALLE SEGÚN LA REGIÓN DE LOS INGRESOS DE LA PROVINCIA");
                    break;
            }

            return vSerie;
        },

        chartOptions() {
            return {
                colors:['#36A3F7', '#f589d6',],
                chart: {
                    locales: [esApex],
                    defaultLocale: 'es',
                    type: 'bar',
                    height: 330,
                    events: {
                        /*
                        click: function(event, chartContext, config) {
                            //console.log("Click en: " + config.globals.labels[config.dataPointIndex]);
                        },
                        legendClick: function(chartContext, seriesIndex, config) {
                            //console.log(seriesIndex); 
                        },
                        */
                        dataPointSelection: (event, chartContext, config) => { 
                            let income = this.graphicIncomeZone.incomeFrom[config.selectedDataPoints];
                            this.labelSelectedChartBar(income);
                            //console.log("dataPointSelection: " + chartContext, config);
                        }
                    },
                    toolbar: {
                        show: false,
                    },
                },
                responsive: [{
                    breakpoint: 1000,
                    options: {},
                }],
                dataLabels: {
                    enabled: true,
                    offsetY: 0,
                    style: {
                    fontSize: '14px',
                    colors: ["#304758"]
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        dataLabels: {
                            position: 'center'
                        } 
                    },
                },
                stroke: {
                    width: 0,
                    colors: ['#fff']
                },
                xaxis: {
                    categories: this.graphicIncomeZone.incomeFrom
                },
                yaxis: {
                    title: {
                        text: undefined
                    },
                },
                tooltip: {
                    y: {
                        formatter: function (val) {    
                        return val + " ingresos"
                        }
                    },
                    
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                },
            }
        },
    },

    components: {
        apexchart,
        VueSweetalert2
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