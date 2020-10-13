<template>
    <div class="col-md-3">
        <div class="m-portlet">
            <div class="m-portlet__head titulares">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            <strong> PROTOCOLOS ACTIVADOS </strong>
                        </h3>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body bodyProtocolos">
                <h3 class="m-portlet__head-text display-3">
                    <center>
                        <strong> {{ GET_TOTALES_PROTOCOLOS_ACTIVADOS }} </strong>
                    </center>
                </h3>
                <br>
                <h6 class="m-portlet__head-text"><strong> Cantidad de protocolos activados </strong></h6>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapActions, mapState, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                
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
            ...mapGetters('upac', ['GET_TOTALES_PROTOCOLOS_ACTIVADOS']),
        },
    }
    
</script>

<style scoped>

    .titulares {
        background-color: #A2C4C9;
    }

    .bodyProtocolos {
        background-color: #f9cb9c;
    }
</style>