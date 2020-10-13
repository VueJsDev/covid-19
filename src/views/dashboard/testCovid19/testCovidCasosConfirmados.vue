<template>
    <div class="m-portlet">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        Detalle de los totales de los casos confirmados
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="m-section">
                <div class="row">
                    <div class="col-md-3 border-right">
                        <span class="m-section__sub">
                            <center>
                                <div class="alturaFija">
                                    <h6>Casos activos de la Pcia.</h6>
                                </div>
                            </center>
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circlePurple">
                                    <h3>
                                        {{ computedCasosActivos }}
                                    </h3>
                                </div>
                                <br>
                                <button 
                                    @click="fectchPatients(GET_TOTALS.cod_activos)" 
                                    type="button" 
                                    class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_CASOS_ACTIVOS}">
                                    Ver
                                </button>
                            </center>
                        </div>
                    </div>
                    <div class="col-md-3 border-right">
                        <span class="m-section__sub">
                            <center>
                                <div class="alturaFija">
                                    <h6>En tránsito con egreso provincial</h6>
                                </div>
                            </center>
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circlePink">
                                    <h3>
                                        {{ computedEnTransito }}
                                    </h3>
                                </div><br>
                                <button 
                                    @click="fectchPatients(GET_TOTALS.cod_egreso)" 
                                    type="button" 
                                    class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_EN_TRANSITO}">
                                    Ver
                                </button>
                            </center>
                        </div>
                    </div>
                    <div class="col-md-3 border-right">
                        <span class="m-section__sub">
                            <center>
                                <div class="alturaFija">
                                    <h6>Recuperados</h6>
                                </div>
                            </center>
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circleGreen">
                                    <h3>
                                        {{ computedRecuperados  }}                                            
                                    </h3>
                                </div><br>
                                <button 
                                    @click="fectchPatients(GET_TOTALS.cod_recuperados)" 
                                    type="button" 
                                    class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_OBITOS}">
                                    Ver
                                </button>
                            </center>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <span class="m-section__sub">
                            <center>
                                <div class="alturaFija">
                                    <h6>Óbitos</h6>
                                </div>
                            </center>
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circleGrey">
                                    <h3>
                                        {{ computedObitos }}                                            
                                    </h3>
                                </div><br>
                                <button 
                                    @click="fectchPatients(GET_TOTALS.cod_obito)" 
                                    type="button" 
                                    class="btn btn-outline-info" :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_OBITOS}">
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
            ...mapGetters('testcovid19', [
                'GET_TOTALS', 
                'GET_LOADING_CASOS_ACTIVOS',
                'GET_LOADING_EN_TRANSITO',
                'GET_LOADING_TEST_RECUPERADOS',
                'GET_LOADING_OBITOS'
                ]
            ),
            computedCasosActivos(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.activos)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.activos);
            },
            computedEnTransito(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.egreso)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.egreso);
            },
            computedRecuperados(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.recuperados)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.recuperados);
            },            
            computedObitos(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.obito)) 
                        ? '-' 
                        : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.obito);
            },    
            
        }

    }
</script>
<style scoped>
.circleBlue, .circleGreen, .circlePink, .circleGrey, .circlePurple
    {
		height: 60px;
		width: 60px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
    }
.circlePurple {
    background: #c8a8e2;
}
.circleBlue {
    background: #bad6ff
}    
.circleGreen
    {
    	background: #cdffcf
    }    

.circlePink
    {
		background: #ff9ff7
    }
.circleGrey
    {
		background: #e0e0e0
    }
.alturaFija
{
    height: 35px;
}
.toastClass{
    background-color: aquamarine;
}
</style>