<template>
    <div class="col-md-5">
        <div class="m-portlet">
            <div class="m-portlet__head  titulares">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            DETALLE DE LAS PROCEDENCIAS INGRESADAS EN EL DÍA
                        </h3>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body">
                <div class="m-section">
                    <span class="m-section__sub">
                        
                    </span>
                    <div class="m-section__content">
                        <center>
                            <div>
                                <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
                            </div>
                        </center>
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
            ...mapActions('upac', ['DETALLE_PROCEDENCIA_DIA']),
            obtenerDatos() {
                this.DETALLE_PROCEDENCIA_DIA()
            }
        },

        components: {
            apexchart
        },

        computed: {
            ...mapGetters('upac', {procedencias: 'GET_DETALLE_PROCEDENCIA_DIA'}),

            series(){
                let ser = [
                    {
                        name: 'Cantidad',
                        data: this.procedencias.cantidad
                    }
                ]
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
						categories: this.procedencias.procedencias
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
        },
    }
</script>

<style scoped>
    .titulares {
        background-color: #A2C4C9;
    }
</style>