<template>
    <div class="col-md-3">
        <div class="m-portlet">
            <div class="m-portlet__head titulares">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            INGRESOS A LA PROVINCIA
                        </h3>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body">
                <div class="m-section">
                    <!-- <span class="m-section__sub">
                        <center>
                            <h5>Total de camas para pacientes leves y moderados</h5>
                        </center>
                    </span> -->
                    <div class="m-section__content">
                        <tabla-mas-detalles-ingresos-provincia />
                    </div>
                </div>
            </div>
        </div>
        <modal-ingresos-provincia />
    </div>
</template>

<script>

    import ModalIngresosProvincia from './modal_ingresos_provincia'
    import TablaMasDetallesIngresosProvincia from './tabla_ingresos_mas_detallados'

    export default {
        data() {
            return {
                
            }
        },

        components: {
            ModalIngresosProvincia,
            TablaMasDetallesIngresosProvincia
        },

        methods: {
            viewModalMasDetalle() {
                $('#ModalMasDetalle').modal('show')
            }
        },
    }

</script>

<style scoped>
    .titulares {
        background-color: #A2C4C9;
    }
    th {
        text-align: center;
    }
</style>