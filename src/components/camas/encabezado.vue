<template>
    <div class="d-none d-lg-block">
        <div class="row m-row--col-separator-xl">
            <div class="col-md-12 col-lg-6 col-xl-3">
                <!-- INGRESOS A LA PROVINCIA -->
                <div class="row">
                    <div class="col-md-6 align-self-center">
                        <center>
                            <h6>Ingresos a la provincia</h6>
                        </center>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-4 align-self-center" style="margin-top: 10px">
                        <center>
                            <h6>Del día</h6>
                            <h2 class="m--font-info">{{ GET_TOTALS_HEADER.IngresosDiarios }}</h2>
                        </center>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-lg-6 col-xl-3">
                <!-- HISOPADOS -->
                <div class="row">
                    <div class="col-md-4" style="margin-top: 10px">
                        <center>
                            <h6>Acumulados</h6>
                            <h2 class="m--font-info">{{ isNaN(Intl.NumberFormat("de-DE").format(GET_TOTALS_HEADER.IngresosAcumulado)) ? '-' : Intl.NumberFormat("de-DE").format(GET_TOTALS_HEADER.IngresosAcumulado) }}</h2>
                        </center>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6 align-self-center">
                                    <h6 class="pull-right">Test</h6>
                            </div>
                            <div class="col-md-6" style="margin-top: 10px">
                                <center>
                                    <h6>Del día</h6>
                                    <h2 class="m--font-info">{{ GET_TOTALS_HEADER.hisopadosDelDia }}</h2>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-lg-6 col-xl-3">
                <!-- CASOS CONFIRMADOS -->
                <div class="row">
                    <div class="col-md-4" style="margin-top: 10px">
                        <center>
                            <h6>Acumulados</h6>
                            <h2 class="m--font-info">{{ isNaN(Intl.NumberFormat("de-DE").format(GET_TOTALS_HEADER.hisopadosTotal)) ? '-' : Intl.NumberFormat("de-DE").format(GET_TOTALS_HEADER.hisopadosTotal)  }}</h2>
                        </center>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6 align-self-center">
                                <center>
                                    <h6>Casos<br>confirmados</h6>
                                </center>
                            </div>
                            <div class="col-md-6" style="margin-top: 10px">
                                <center>
                                    <h6>Del día</h6>
                                    <h2 class="m--font-info">{{ GET_TOTALS_HEADER.positivosDelDia }}</h2>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-lg-6 col-xl-3">
                <!-- CASOS SOSPECHESOS DEL DÍA -->
                <div class="row">
                    <div class="col-md-4" style="margin-top: 10px">
                        <center>
                            <h6>Acumulados</h6>
                            <h2 class="m--font-info">{{ isNaN(Intl.NumberFormat("de-DE").format(GET_TOTALS_HEADER.positivosTotal)) ? "-" : Intl.NumberFormat("de-DE").format(GET_TOTALS_HEADER.positivosTotal) }}</h2>
                        </center>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6 align-self-center" style="margin-top: 10px">
                                <center>
                                    <h6>Casos sospechosos del día</h6>
                                </center>
                            </div>
                            <div class="col-md-6 align-self-center">
                                <center>
                                    <h2 class="m--font-info">{{ GET_TOTALS_HEADER.Sospechosos }}</h2>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters} from 'vuex';
    export default {
        data () {
            return {

            }
        },
        created () {
            this.getTotals()
            var self = this;
            setInterval(function(){
                self.getTotals();
            }, 60 * 5000);

        },
        methods: {
            ...mapActions('encabezado', ['FETCH_TOTALS']),
            getTotals(){
                this.FETCH_TOTALS()
            }
        },
        computed: {
            ...mapGetters('encabezado', ['GET_TOTALS_HEADER'])
        }
    }
</script>