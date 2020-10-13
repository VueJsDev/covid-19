<template>
    <div class="modal fade" id="ModalMasDetalle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">INGRESOS A LA PROVINCIA</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <datepicker format="dd/MM/yyyy" placeholder="fecha desde" :language="es"  :value="currentDate" v-model="fechaDesde" bootstrap-styling clear-button></datepicker>
                        </div>
                        <div class="col-md-3">
                            <datepicker format="dd/MM/yyyy" placeholder="fecha hasta" :language="es"  :value="currentDate" v-model="fechaHasta" bootstrap-styling clear-button></datepicker>
                        </div>
                        <div class="col-md-6">
                            <div class="input-group">
                                <select v-model="selectOpcion" class="form-control m-input" id="listadoCboIngresos">
                                <option value="0">Todos</option>
                                <option value="1">Exterior</option>
                                <option value="2">Dentro del país</option>
                            </select>
                                <div class="input-group-append">
                                    <a @click="getPacientesPorIngreso()" class="btn btn-outline-info m-btn m-btn--icon">
                                        <span>
                                            <i class="fa flaticon-search"></i>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="m-separator m-separator--dashed"></div>
                    <div class="row">
                        <div class="col-md-12">
                            <h6>Informe según el ingreso del paciente: {{ graficosDeInformesSegunIngresoALaProvinciaTotal }} </h6>
                        </div>
                    </div>
                    <div class="m-separator m-separator--dashed"></div>
                    <div>
                        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import apexchart from 'vue-apexcharts'
    var esApex = require("apexcharts/dist/locales/es.json")
    import Datepicker from 'vuejs-datepicker'
    import {es} from 'vuejs-datepicker/dist/locale'

    import { mapActions, mapState, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                fechaDesde: new Date(),
                fechaHasta: new Date(),
                es: es,
                currentDate: new Date(),
                selectOpcion: 0,
            }
        },

        created () {
            this.getDatos();
        },
        
        methods: {
            ...mapActions('upac', ['FETCH_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS']),
            getDatos() {
                let fechaD = new Date()
                let fechaH = new Date()
                let fechaDesde = `${fechaD.getFullYear()}/${fechaD.getMonth() + 1}/${fechaD.getDate()}`;
                let fechaHasta = `${fechaH.getFullYear()}/${fechaH.getMonth() + 1}/${fechaH.getDate()}`;
                let procedenciaId = 0
                let datos = {
                    fechaDesde,
                    fechaHasta,
                    procedenciaId,
                }
                this.FETCH_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS(datos)
            },

            getPacientesPorIngreso() {
                let fechaDesde = `${this.fechaDesde.getFullYear()}/${this.fechaDesde.getMonth() + 1}/${this.fechaDesde.getDate()}`;
                let fechaHasta = `${this.fechaHasta.getFullYear()}/${this.fechaHasta.getMonth() + 1}/${this.fechaHasta.getDate()}`;
                let procedenciaId = $('#listadoCboIngresos').val();
                
                let datos = {
                    fechaDesde,
                    fechaHasta,
                    procedenciaId,
                } 

                this.FETCH_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS(datos)
            }
        },

        computed: {
            ...mapGetters('upac', {
                'graficosDeInformesSegunIngresoALaProvincia': 'GET_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS',
                'graficosDeInformesSegunIngresoALaProvinciaTotal': 'GET_INGRESOS_A_LA_PROVINCIA_PARA_GRAFICOS_CANTIDAD'}),
            series() {
                let ser = [
                    {
                        name: 'Cantidad',
                        data: this.graficosDeInformesSegunIngresoALaProvincia.cantidad
                    }
                ]
                return ser;
            },

            chartOptions() {
                let colors = ['#FEADC8', '#B4E51C','#FEC80D', '#C7BEE6','#6F91BD', '#00A1E7','#4F80BB', '#FE7E26',]
                return {
                    chart: {
                        locales: [esApex],
                        defaultLocale: 'es',
                        type: 'bar',
                        height: 450,
                        stacked: false,
                        toolbar: {
                            show: false
                        }
                    },
                    colors: colors,
                    plotOptions: {
						bar: {
                            horizontal: false,
                            dataLabels: {
                                enabled: false
                            },
                            distributed: true,
						},
					},
                    stroke: {
                        width: 0,
                        colors: ['#FEADC8', '#B4E51C','#FEC80D', '#C7BEE6','#6F91BD', '#00A1E7','#4F80BB', '#FE7E26',]
                    },
                    xaxis: {
                        categories: this.graficosDeInformesSegunIngresoALaProvincia.lugar
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
                        }
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
            }

        },

        components: {
            apexchart,
            Datepicker
        },
    }
</script>