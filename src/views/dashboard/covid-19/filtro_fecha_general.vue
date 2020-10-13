<template>
    <div class="col-md-12">
                <div class="m-portlet">
                    <div class="m-portlet__body">
                        <div class="form-group m-form__group row">
                            <div class="col-md-2">
                                <label class="col-form-label"><strong>Seleccione Fecha</strong></label>
                            </div>
                            <div class="input-group-append">
                                <div class="col-md-10">
                                    <datepicker input-class="form-control" format="dd-MM-yyyy" v-model="fechaDesde" :language="es" bootstrap-styling clear-button></datepicker>
                                </div>
                                <a @click="consultaFechas()" class="btn btn-outline-info m-btn m-btn--icon">
                                    <span>
                                        <i class="fa flaticon-search"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'
    import {es} from 'vuejs-datepicker/dist/locale'

    import { mapActions, mapState, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                fechaDesde: new Date(),
                //fechaHasta: new Date(),
                es: es,
                //currentDate: new Date(),
            }
        },

        created () {
            this.getDatos();
        },

        methods: {
            ...mapActions('upac', 
            ['FETCH_TOTALES', 'DETALLE_PROCEDENCIA_DIA', 'INGRESO_AL_EFECTOR_POR_SEXO', 'INGRESOS_A_LA_PROVINCIA_LISTADO', 
             'COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA', 'DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO']),
            getDatos() {
                let fechaD = this.fechaDesde;
                let fechaDesde = `${fechaD.getFullYear()}/${fechaD.getMonth() + 1}/${fechaD.getDate()}`;
                //console.log('+++', fechaDesde);
                this.FETCH_TOTALES(fechaDesde)
                this.DETALLE_PROCEDENCIA_DIA(fechaDesde)
                this.INGRESO_AL_EFECTOR_POR_SEXO(fechaDesde)
                this.INGRESOS_A_LA_PROVINCIA_LISTADO(fechaDesde)
                this.COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA(fechaDesde)
                this.DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO(fechaDesde)
            },

            consultaFechas() {
                let fechaD = this.fechaDesde;
                let fechaDesde = `${fechaD.getFullYear()}/${fechaD.getMonth() + 1}/${fechaD.getDate()}`;
                //console.log('***', fechaDesde);
                this.FETCH_TOTALES(fechaDesde)
                this.DETALLE_PROCEDENCIA_DIA(fechaDesde)
                this.INGRESO_AL_EFECTOR_POR_SEXO(fechaDesde)
                this.INGRESOS_A_LA_PROVINCIA_LISTADO(fechaDesde)
                this.COMPARACION_INGRESOS_DE_LA_ULTIMA_SEMANA(fechaDesde)
                this.DISTRIBUCIÓN_POR_RANGO_ETARIO_Y_SEXO(fechaDesde)
            }
        },

        components: {
            Datepicker
        }
    }
</script>