<template>
    <div class="m-portlet">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h4 class="m-portlet__head-text">
                        Total de Test Acumulados
                    </h4>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="m-section">
                <div class="row">
                    <div class="col-md-4 border-right">
                        <span class="m-section__sub">
                            <center>
                                <div class="alturaFija">
                                    <h6>Test realizados</h6>
                                </div>
                            </center>
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circleBlue">
                                    <h4>
                                        {{ computedTotalTestRealizados  }}
                                    </h4>
                                </div>
                                <br>
                                <button 
                                    @click="fectchPatients(GET_TOTALS.cod_totalAcumulado)" 
                                    type="button" 
                                    class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_TEST_REALIZADOS}">
                                    Ver
                                </button>
                            </center>
                        </div>
                    </div>
                    <div class="col-md-4 border-right">
                        <span class="m-section__sub">
                            <center>
                                <div class="alturaFija">
                                    <h6>Pacientes hisopados</h6>
                                </div>
                            </center>
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circleLightBlue">
                                    <h4>
                                        {{ computedTotalPacientesHisopados  }}
                                    </h4>
                                </div><br>
                                <button 
                                    @click="fectchPatients(GET_TOTALS.cod_totalPacintesHisopodos)" 
                                    type="button" 
                                    class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_TEST_CONFIRMADOS}">
                                    Ver
                                </button>
                            </center>
                        </div>
                    </div>
                    <div class="col-md-4 border-right">
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
                                    <h4>
                                        {{ computedTotalTestConfirmados  }}
                                    </h4>
                                </div><br>
                                <button 
                                    @click="fectchPatients(GET_TOTALS.cod_positivosAcumulado)" 
                                    type="button" 
                                    class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_TEST_CONFIRMADOS}">
                                    Ver
                                </button>
                            </center>
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
        mounted () {
            this.fetchTotals(),
            this.fectchPatients(1)
            var self = this;
            setInterval(function(){
                self.fetchTotals();
            }, 60 * 5000);

        },
        methods: {
            ...mapActions('testcovid19', ['FETCH_TOTALS', 'FETCH_PATIENTS']),
            fetchTotals(){
                console.log("=== ACTUALIZO TOTALES DE TEST ===")
                this.FETCH_TOTALS()
            },
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
        computed: {
            ...mapGetters('testcovid19', ['GET_TOTALS', 'GET_LOADING_TEST_REALIZADOS', 'GET_LOADING_TEST_CONFIRMADOS', 'GET_LOADING_TEST_RECUPERADOS']),
            computedRecuperados(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.recuperados)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.recuperados);
            },
            computedTotalTestRealizados(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.totalAcumulado)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.totalAcumulado);
            },
            computedTotalPacientesHisopados(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.totalPacintesHisopodos)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.totalPacintesHisopodos);
            },
            computedTotalTestConfirmados(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.positivosAcumulado)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.positivosAcumulado);
            }

            
        }

    }
</script>
<style scoped>
.circleBlue, .circleGreen, .circleGray, .circlePink, .circleLightBlue
    {
		height: 60px;
		width: 60px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
    }
.circleLightBlue{
    background: #17d1ff
}    
.circleBlue {
    background: #bad6ff
}    
.circleGreen
    {
		background: #cdffcf
    }    
.circleGray
    {
		background: #d6d6d6
    }
.circlePink
    {
		background: #ffa3a3
    }
.alturaFija
{
    height: 35px;
}
.toastClass{
    background-color: aquamarine;
}
</style>