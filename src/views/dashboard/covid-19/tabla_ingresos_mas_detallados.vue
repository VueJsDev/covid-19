<template>
    <div>
        <div class="pull-right">
            <a @click="viewModalMasDetalle()" href="#">Ver más detallado</a><br><br>
        </div>
        <center>
            <div class="table-wrapper">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Lugar</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dato in GET_INGRESOS_A_LA_PROVINCIA_LISTADO">
                            <td align="center"> {{ dato.lugar }} </td>
                            <td align="center"> {{ dato.cantidad }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </center>
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

        components: {
           
        },

        methods: {
            ...mapActions('upac', ['INGRESOS_A_LA_PROVINCIA_LISTADO']),
            obtenerDatos() {
                this.INGRESOS_A_LA_PROVINCIA_LISTADO()
            },
            viewModalMasDetalle() {
                $('#ModalMasDetalle').modal('show');
            }
        },

        computed: {
            ...mapGetters('upac', ['GET_INGRESOS_A_LA_PROVINCIA_LISTADO']),
        }

    }

</script>

<style scoped>

    .table-wrapper
    {
        max-height: 300px;
        width: 220px;
        overflow: auto;
        display:inline-block;
    }

    th {
        text-align: center;
    }

</style>