<template>
    <div class="col-md-3">
        <div class="m-portlet">
            <div class="m-portlet__head titulares">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            <strong> COMPARACIÓN DEL DÍA ANTERIOR </strong>
                        </h3>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body bodyIngresos">
                <h3 class="m-portlet__head-text display-3">
                    <center>
                        <strong> {{ comparacionesConElDiAnterior }} </strong>
                        <template v-if="flecha == 'igual'">
                            <i class="fa fa-arrow-equals" style="font-size:45px"></i>
                        </template>
                        <template v-else-if="flecha == 'mayor'">
                            <i class="fa fa-arrow-up" style="font-size:45px"></i>
                        </template>
                        <template v-else>
                            <i class="fa fa-arrow-down" style="font-size:45px"></i>
                        </template>
                    </center>
                </h3>
                <br>
                <h6 class="m-portlet__head-text"><strong> Ingresos Pacientes </strong><br><br></h6>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapState, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                flecha: false
            }
        },

        created () {
            this.obtenerDatos();
        },

        methods: {
            ...mapActions('upac', ['FETCH_TOTALES']),
            obtenerDatos() {
                this.FETCH_TOTALES()
            }
        },

        computed: {
            ...mapGetters('upac', ['GET_TOTALES_COMPARACION_CON_DIA_ANTERIOR']),
            comparacionesConElDiAnterior(){
                if (this.GET_TOTALES_COMPARACION_CON_DIA_ANTERIOR == 0) {
                    //console.log('Es igual a 0');
                    this.flecha = "igual";
                    return "0";
                } else if (this.GET_TOTALES_COMPARACION_CON_DIA_ANTERIOR < 0) {
                    //console.log('Es menor a 0');
                    this.flecha = "menor";
                    return Math.abs(this.GET_TOTALES_COMPARACION_CON_DIA_ANTERIOR)
                } else {
                    //console.log('Mayor a 0');
                    this.flecha = "mayor";
                    return Math.abs(this.GET_TOTALES_COMPARACION_CON_DIA_ANTERIOR)
                }
            }
        },
    }
    
</script>

<style scoped>

    .titulares {
        background-color: #A2C4C9;
    }

    .bodyIngresos {
        background-color: #93C47D;
    }
</style>