<template>
    <div class="col-md-6">
        <div class="m-portlet">
            <div class="m-portlet__head titulares">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            COMPARACIÓN DE INGRESOS POR SEMANA
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
                                    <apexchart type="line" height="250" :options="chartOptions" :series="series"></apexchart>
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
            ...mapActions('upac', ['COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA']),
            obtenerDatos() {
                this.COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA()
            }
        },

        components: {
            apexchart
        },

        computed: {
            ...mapGetters('upac', {ingresosPorSemana: 'GET_COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA'}),

            series(){
                let ser = [
                    {
                        name: 'Cantidad',
                        data: this.ingresosPorSemana.cantidad
                    }
                ]
                return ser;
            },

            chartOptions() {
                return {
					colors:['#5dbfe3', '#f589d6',],
					chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false,
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        // text: 'Product Trends by Month',
                        // align: 'left'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: this.ingresosPorSemana.fechas
                    }
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