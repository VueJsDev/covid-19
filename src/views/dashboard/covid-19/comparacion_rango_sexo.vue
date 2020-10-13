<template>
    <div class="col-md-6">
        <div class="m-portlet">
            <div class="m-portlet__head titulares">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            DISTRIBUCIÓN POR RANGO ETARIO Y SEXO
                        </h3>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body">
                <div class="m-section">
                    <div class="m-section">
                        <span class="m-section__sub">
                            
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circleBlue">
                                    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
                                </div>
                            </center>
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
    var es = require("apexcharts/dist/locales/es.json")

    export default {
        data() {
            return {
                
            }
        },

        created() {
            this.obtenerDatos()
        },

        methods: {
            ...mapActions('upac', ['DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO']),
            obtenerDatos() {
                this.DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO()
            }
        },

        computed: {

            ...mapGetters('upac', {distribucionPorRangoEtarioYSexo: 'GET_DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO'}),

            series() {
                let ser = [{
					name: 'Masculino',
					data: this.distribucionPorRangoEtarioYSexo.masculinos
				}, {
					name: 'Femenino',
					data: this.distribucionPorRangoEtarioYSexo.femeninos
				}]
                return ser;
            },

            chartOptions() {
                return {
					colors:['#5dbfe3', '#f589d6',],
					chart: {
						locales: [es],
   						defaultLocale: 'es',
						type: 'bar',
						height: 330,
                        stacked: true,
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
                        //offsetX: +30,
                        style: {
                        fontSize: '14px',
                        colors: ["#304758"]
                        },
                        // formatter: function(value, { seriesIndex, dataPointIndex, w}) {
                        // let indices = w.config.series.map((item, i) => i);
                        // indices = indices.filter(i => !w.globals.collapsedSeriesIndices.includes(i) && _.get(w.config.series, `${i}.data.${dataPointIndex}`) > 0);
                        // if (seriesIndex == _.max(indices))
                        //     return w.globals.stackedSeriesTotals[dataPointIndex];
                        // return '';
                        // }
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
						categories: this.distribucionPorRangoEtarioYSexo.edad,
					},
					yaxis: {
						title: {
							text: undefined
						},
					},
					tooltip: {
						y: {
							formatter: function (val) {
							    return val 
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
            }
        },  

        components: {
            apexchart
        },
    }
</script>

<style scoped>
    .titulares {
        background-color: #A2C4C9;
    }
</style>