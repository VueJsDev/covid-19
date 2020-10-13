<template>
    <div class="m-portlet">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        Test Diario
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="m-section">
                <div class="row">
                    <div class="col-md-2 border-right">
                        <span class="m-section__sub">
                            <center>
                                <div class="alturaFija">
                                    <h6>Total de día</h6>
                                </div>
                            </center>
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circleBlue">
                                    <h3>
                                        {{ computedTotalDelDia  }}
                                    </h3>
                                </div><br>
                                <button 
                                    @click="fectchPatients(GET_TOTALS.cod_totalDelDia)"  
                                    type="button" 
                                    class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_TEST_DIARIOS}">
                                    Ver
                                </button>
                            </center>
                        </div>
                    </div>
                    <div class="col-md-10">
                        <div class="row">
                            <!-- TEST CONFIRMADOS -->
                            <div class="col-md-3">
                                <span class="m-section__sub">
                                    <center>
                                        <div class="alturaFija">
                                            <h6>Test confirmados</h6>
                                        </div>
                                    </center>
                                </span>
                                <div class="m-section__content">
                                    <center>
                                        <div class="circlePink">
                                            <h3>
                                                {{ computedTestConfirmados  }}
                                            </h3>
                                        </div>
                                        <br>
                                        <button 
                                            @click="fectchPatients(GET_TOTALS.cod_positivosTotalDelDia)"
                                            type="button"
                                            :disabled="disabledTestConfirmados" 
                                            class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_TEST_DIARIOS_CONFIRMADOS}">
                                            Ver
                                        </button>
                                    </center>
                                </div>
                            </div>
                            <!-- REHISOPADOS CASOS CONFIRMADOS -->
                            <div class="col-md-3">
                                <span class="m-section__sub">
                                    <center>
                                        <div class="alturaFija">
                                            <h6>Rehisopados Casos confirmados</h6>
                                        </div>
                                    </center>
                                </span>
                                <div class="m-section__content">
                                    <center>
                                        <div class="circleYellow">
                                            <h3>
                                                {{ computedReHisopados  }}
                                            </h3>
                                        </div>
                                        <br>
                                        <button 
                                            @click="fectchPatients(GET_TOTALS.cod_positivoRehisopadoDelDia)"
                                            type="button"
                                            :disabled="disabledReHisopados" 
                                            class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_TEST_DIARIOS_REHISOPADOS}">
                                            Ver
                                        </button>
                                    </center>
                                </div>
                            </div>
                            <!-- RESULTADOS PENDIENTES -->
                            <div class="col-md-3">
                                <span class="m-section__sub">
                                    <center>
                                        <div class="alturaFija">
                                            <h6>Resultados pendientes</h6>
                                        </div>
                                    </center>
                                </span>
                                <div class="m-section__content">
                                    <center>
                                        <div class="circleOrange">
                                            <h3>
                                                {{ computedPendientes  }}
                                            </h3>
                                        </div>
                                        <br>
                                        <button 
                                            @click="fectchPatients(GET_TOTALS.cod_faltaResultadoDelDia)"
                                            type="button"
                                            :disabled="disabledPendientes" 
                                            class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_TEST_DIARIOS_PENDIENTES}">
                                            Ver
                                        </button>
                                    </center>
                                </div>
                            </div>
                            <!-- TEST NEGATIVOS -->
                            <div class="col-md-3">
                                <center>
                                <span class="m-section__sub">
                                    <center>
                                        <div class="alturaFija">
                                            <h6>Test Negativos</h6>
                                        </div>
                                    </center>
                                </span>
                                <div class="m-section__content">
                                    <div class="circleGray">
                                        <h3>
                                            {{ computedNegativos  }}
                                        </h3>
                                    </div>
                                    <br>
                                    <button
                                         @click="fectchPatients(GET_TOTALS.cod_negativosDelDia)"
                                        type="button"
                                        :disabled="disabledNegativos" 
                                        class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_TEST_DIARIOS_NEGATIVOS}">
                                        Ver
                                    </button>
                                </div>
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
        components: {

        },
        methods: {
            ...mapActions('testcovid19', ['FETCH_PATIENTS']),
            fectchPatients(code){
                this.$toasted.show('Actualizando lista de pacientes...', {
                        icon : 'fa-hourglass-half ',
                        theme: 'outline',
                        position: 'bottom-right'
                })
                let data = {
                    code
                }
                this.FETCH_PATIENTS(data)
            }
        },

        beforeCreate () {
            
        },
        mounted () {
            
        },
        computed: {
            ...mapGetters('testcovid19', ['GET_TOTALS', 'GET_LOADING_TEST_DIARIOS', 'GET_LOADING_TEST_DIARIOS_CONFIRMADOS', 'GET_LOADING_TEST_DIARIOS_REHISOPADOS', 'GET_LOADING_TEST_DIARIOS_PENDIENTES', 'GET_LOADING_TEST_DIARIOS_NEGATIVOS']),
            computedTotalDelDia(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.totalDelDia)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.totalDelDia);
            },
            computedTestConfirmados(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.positivosTotalDelDia)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.positivosTotalDelDia);
            },
            computedReHisopados(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.positivoRehisopadoDelDia)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.positivoRehisopadoDelDia);
            },
            computedPendientes(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.faltaResultadoDelDia)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.faltaResultadoDelDia);
            },
            computedNegativos(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.negativosDelDia)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.negativosDelDia);
            },
            disabledTestConfirmados(){
                if (this.computedTestConfirmados == "-" || this.computedTestConfirmados == 0) {
                    return "disabled"
                } else {
                    return false
                }
            },
            disabledReHisopados(){
                if (this.computedReHisopados == "-" || this.computedReHisopados == 0) {
                    return "disabled"
                } else {
                    return false
                }
            },
            disabledPendientes(){
                if (this.computedPendientes == "-" || this.computedPendientes == 0) {
                    return "disabled"
                } else {
                    return false
                }
            },
            disabledNegativos(){
                if (this.computedNegativos == "-" || this.computedNegativos == 0) {
                    return "disabled"
                } else {
                    return false
                }
            }
        }
    }
</script>
<style scoped>
.circleBlue, .circleYellow, .circleGray, .circlePink, .circleGreen, .circleOrange
    {
		height: 60px;
		width: 60px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
    }
.circleBlue 
{
    background: #bad6ff;
}    
.circleYellow
    {
		background: #fdffa5;
    }
.circleGray
    {
		background: #c5c5c5;
    }
.circlePink
    {
		background: #ffa3a3;
    }
.circleGreen
    {
		background: #b0ffb4;
    }
.circleOrange
    {
		background: #FFB357;
    }
.alturaFija
{
    height: 35px;
}
</style>