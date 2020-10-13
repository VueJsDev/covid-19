<template>
    <div class="m-portlet">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon m--hide">
                        <i class="la la-gear"></i>
                    </span>
                    <h3 class="m-portlet__head-text">
                        FILTRAR LISTADO POR:
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="m-section">
                <div class="m-form__group form-group">
                    <div class="m-radio-inline">
                        <label class="m-radio m-radio--state-brand col-sm-3">
                        <input type="radio" 
                            name="nRbFilterFor" 
                            checked
                            @click="rbFilterFor(1)"
                            value="1"> Casos Confirmados
                            <span></span>
                        </label>
                        <label class="m-radio m-radio--state-brand col-sm-3">
                            <input type="radio" 
                                name="nRbFilterFor" 
                                @click="rbFilterFor(2)"
                                value="2"> Casos Negativos
                            <span></span>
                        </label>
                        <label class="m-radio m-radio--state-brand col-sm-2">
                            <input type="radio" 
                                name="nRbFilterFor"
                                @click="rbFilterFor(3)" 
                                value="3"> Casos Fatales
                            <span></span>
                        </label>
                        <label class="m-radio m-radio--state-brand col-sm-2">
                            <input type="radio" 
                                name="nRbFilterFor" 
                                @click="rbFilterFor(0)"
                                value="0"> Ver Todos
                            <span></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters} from 'vuex';

    export default {

         data() {
            return {
                vRbFilterFor: '1',
            }
        },

        components: {
          // components' list
        },

        methods: {
            ...mapActions('paciente', [
                'FETCH_PARAMETER_TOTAL_RECORDS',
                'FETCH_PARAMETERS_SEARCH',
                'FETCH_PARAMETER_FILTER',
                'FETCH_PATIENTS_LIST',
            ]),

            rbFilterFor(code){
                //console.log("### UPDATE PAGE BY DATE AND CODE BY INCOMING ABOARD ###");
                // Initializing the pop-up message 
                this.$toasted.show('Actualizando lista de pacientes...', {
                        icon : 'fa-hourglass-half ',
                        theme: 'outline',
                        position: 'bottom-right'
                })

                let arrSearch       = this.GET_PARAMETERS_SEARCH;
                let codeSearchFor   = arrSearch['codeSearchFor'];
                let txtSearch       = arrSearch['txtSearch'];
                let arrTotRecords   = this.GET_PARAMETER_TOTAL_RECORDS;
                let totalRecords    = arrTotRecords['totalRecords'];
                let parameterFilter = code == 0 ? null : code;

                let data = {
                    codeSearchFor,
                    txtSearch,
                    parameterFilter,
                    totalRecords
                }

                this.FETCH_PARAMETER_FILTER(data),
                this.FETCH_PARAMETERS_SEARCH(data),
                this.FETCH_PATIENTS_LIST(data) 
                
            },
        },

        computed: {
            ...mapGetters('paciente', [
                'GET_PARAMETER_TOTAL_RECORDS',
                'GET_PARAMETERS_SEARCH', 
                'GET_PARAMETER_FILTER',
                'GET_PATIENTS_LIST'
            ]),
        }

    }
</script>
<style scoped>
.header_color {
    background-color: #E0E0E0;
}
.myHeaderTitleList {
    word-break: break-word;
    height: auto;
    min-height: 50px;
}
</style>