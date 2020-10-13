<template>
    <div class="col-md-4">
        <div class="m-portlet">
            <div class="m-portlet__head titulares">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            INGRESO AL EFECTOR POR SEXO
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
                                <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
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
            ...mapActions('upac', ['INGRESO_AL_EFECTOR_POR_SEXO']),
            obtenerDatos() {
                this.INGRESO_AL_EFECTOR_POR_SEXO()
            }
        },

        computed: {
            ...mapGetters('upac', {sexos: 'GET_INGRESO_AL_EFECTOR_POR_SEXO'}),
            series(){
                return this.sexos.cantidad
            },
            chartOptions(){
                return {
                    chart: {
                        //width: 380,
                        type: 'pie',
                        //size: 200
                    },
                    colors:this.sexos.colors,
                    labels: this.sexos.sexo,
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
        },
    }
</script>

<style scoped>
    .titulares {
        background-color: #A2C4C9;
    }
</style>