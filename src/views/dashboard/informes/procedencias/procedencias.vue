<template>
    <div>
        <!-- <h2>Procedencia</h2>
        <div class="m-separator m-separator--dashed"></div> -->
        <submenuinformes />
        <div class="row">
            <div class="col-md-12">
                <div class="m-portlet">
                    <div class="m-portlet__body">
                        <div class="form-group m-form__group row">
                            <div class="container-fluid">
                                <div class="form-group m-form__group row row2">
                                    <div class="col-sm col-md-2">
                                        <label class="col-form-label"><strong>Fecha Desde</strong></label>
                                    </div>
                                    <div class="col-sm-4 col-md-2">
                                            <datepicker format="dd/MM/yyyy" placeholder="fecha desde" :language="es"  :value="currentDate" v-model="fechaDesde" bootstrap-styling clear-button></datepicker>
                                        </div>
                                    <div class="col-sm col-md-2">
                                        <label class="col-form-label"><strong>Fecha Hasta</strong></label>
                                    </div>
                                    <div class="col-sm-4 col-md-2">
                                        <datepicker format="dd/MM/yyyy" placeholder="fecha hasta" :language="es"  :value="currentDate" v-model="fechaHasta" bootstrap-styling clear-button></datepicker>
                                    </div>
                                    <div class="col-sm-4 col-md-2">
                                        <div class="m-form__group form-group">
                                            <div class="m-checkbox-inline">
                                                <label class="m-checkbox">
                                                    <input type="checkbox" v-model="sexo" @change="mostrarNuevoSelect"> <strong>Mostrar por Sexo</strong>
                                                    <span></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-2">
                                        <a @click="getPacientesPorIngreso()" class="btn btn-outline-info m-btn m-btn--icon">
                                            <span>
                                                <i class="fa flaticon-search"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-portlet">
            <div class="m-portlet__body">
                <div class="row">
                    <div class="col-md-9">
                        <h5>Informe según la procedencia de los pacientes</h5>
                    </div>
                </div>
                <div class="m-separator m-separator--dashed"></div><br>
                <div class="row">
                    <div class="col-md-9">
                        <h5>Cantidad de ingresos: {{ informeProcedenciasCantidad }}</h5>
                    </div>
                </div><br>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div v-if="selectOculto">
                                <br><br>
                                <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
                            </div>
                            <div v-else>
                                <apexchart type="bar" height="350" :options="chartOptions2" :series="series2"></apexchart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>    

<script>

    import Submenuinformes from './submenuinformes'
    
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
                selectOculto: true,
                sexo: ''
            }
        },

        created () {
            this.getDatos();
        },

        methods: {
            ...mapActions('upac_procedencias', ['FETCH_INFORMES_DE_LAS_PROCEDENCIAS_PARA_GRAFICOS']),
            getDatos() {
                let fechaD = new Date()
                let fechaH = new Date()
                let fechaDesde = `${fechaD.getFullYear()}/${fechaD.getMonth() + 1}/${fechaD.getDate()}`;
                let fechaHasta = `${fechaH.getFullYear()}/${fechaH.getMonth() + 1}/${fechaH.getDate()}`;
                let sexoId = 0
                let datos = {
                    fechaDesde,
                    fechaHasta,
                    sexoId,
                }
                this.FETCH_INFORMES_DE_LAS_PROCEDENCIAS_PARA_GRAFICOS(datos)
            },
            getPacientesPorIngreso() {
                let fechaDesde = `${this.fechaDesde.getFullYear()}/${this.fechaDesde.getMonth() + 1}/${this.fechaDesde.getDate()}`;
                let fechaHasta = `${this.fechaHasta.getFullYear()}/${this.fechaHasta.getMonth() + 1}/${this.fechaHasta.getDate()}`;
                let sexoId = this.sexo
                
                if (sexoId == true) {
                    sexoId = 1
                } 
                
                let datos = {
                    fechaDesde,
                    fechaHasta,
                    sexoId,
                } 

                this.FETCH_INFORMES_DE_LAS_PROCEDENCIAS_PARA_GRAFICOS(datos)
            },

            mostrarNuevoSelect() {
                let sexoId = this.sexo
                if (sexoId == 1) {
                    this.selectOculto = false
                } else {
                    this.selectOculto = true
                }
            },
        },

        computed: {
            ...mapGetters('upac_procedencias', 
                {informeProcedencias: 'GET_INFORMES_PROCEDENCIAS_GRAFICOS', 
                 informeProcedenciasSexo: 'GET_INFORMES_PROCEDENCIAS_SEXO',
                 informeProcedenciasCantidad: 'GET_INFORMES_PROCEDENCIAS_SEXO_PARA_GRAFICOS_CANTIDAD'
                }),
            
            series(){
                let ser = [
                    {
                        name: 'Cantidad',
                        data: this.informeProcedencias.cantidad
                    }
                ]
                return ser;
            },

            chartOptions() {
                return {
					colors:['#5dbfe3', '#f589d6',],
					chart: {
						locales: [esApex],
   						defaultLocale: 'es',
						type: 'bar',
						height: 430,
                        events: {
                            click: function(event, chartContext, config) {
                                console.log(config);                                
                            },
                            legendClick: function(chartContext, seriesIndex, config) {
                                console.log(seriesIndex); 
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
						categories: this.informeProcedencias.procedencias
					},
					yaxis: {
						title: {
							text: undefined
						},
					},
					tooltip: {
						y: {
							formatter: function (val) {
							return val + " procedencias"
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

            series2 (){
                let ser = [{
                    name: 'Masculino',
					data: this.informeProcedenciasSexo.masculinos
				}, {
                    name: 'Femenino',
					data: this.informeProcedenciasSexo.femeninos
				}]
                return ser;
            },

            chartOptions2 () {
                return {
                    colors:['#5dbfe3', '#f589d6'],
                    chart: {
                        type: 'bar',
                        height: 'auto',
                        toolbar: {
                            show: false
                        },
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            dataLabels: {
                                position: 'top',
                            },
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        offsetX: -6,
                        style: {
                            fontSize: '14px',
                            colors: ["#304758"]
                        }
                    },
                    responsive: [{
                        breakpoint: 1000,
                        options: {
                            chart: {
                                height: 450,
                            }
                        }
                    }],
                    stroke: {
                        show: true,
                        width: 1,
                        colors: ['#fff']
                    },
                    xaxis: {
                        categories: this.informeProcedenciasSexo.procedencias,
                    },
                    legend: {
						position: 'top',
						horizontalAlign: 'left',
						offsetX: 40
					}
                }
            }
        },
        

        components: {
            Submenuinformes,
            Datepicker,
            apexchart
        }
    }
</script>

<style scoped>

    .row2 { margin: 10px 0; }
    .row2 div[class*='col'] { padding: 10px;}

</style>