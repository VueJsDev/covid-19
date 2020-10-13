<template>
    <div class="m-portlet">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon m--hide">
                        <i class="la la-gear"></i>
                    </span>
                    <h3 class="m-portlet__head-text">
                        BUSCADOR DE PACIENTE:
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="m-section">
                <div class="row form-inline">
                    <select 
                        class="form-control m-input col-md-4"
                        v-model="mSearchFor"
                        @change="onChange($event)">
                        <option v-for="option in optionsSearchFor" 
                                v-bind:value="option.value" 
                                :key="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                    <div class="m-input-icon m-input-icon--left col-sm-6"
                        style="padding-left: 10px">
                        <!-- DNI -->
                        <input type="text"
                            v-if="mSelectDNI"
                            v-model="mSearchTxtDNI"
                            @input="updateSearchTxt"
                            @keyup.enter="searchFor()"
                            class="form-control m-input"
                            style="width: 100%"
                            placeholder="Ej. 11222333">
                        <span 
                            v-if="mSelectDNI"
                            class="m-input-icon__icon m-input-icon__icon--left">
                            <span>
                                <i class="la la-search"></i>
                            </span>
                        </span>
                        <!-- Name and Last name -->
                        <input type="text" 
                            ref="txtLastName"
                            v-if="mSelectName"
                            v-model="mSearchTxtLastName"
                            @input="updateSearchTxt"
                            @keyup.enter="searchFor()"
                            class="form-control m-input"
                            style="width: 50%; padding-left:23px;"
                            placeholder="Apellido">
                        <span 
                            v-if="mSelectName"
                            class="m-input-icon__icon m-input-icon__icon--left">
                            <span>
                                <i class="la la-search"></i>
                            </span>
                        </span>
                        <input type="text" 
                            ref="txtName"
                            v-if="mSelectName"
                            v-model="mSearchTxtName"
                            @input="updateSearchTxt"
                            @keyup.enter="searchFor()"
                            class="form-control m-input"
                            style="width: 50%; padding-left:10px;"
                            placeholder="Nombre">
                        <!-- Efector -->
                        <select 
                            ref="cbEfector"
                            v-if="mSelectEfector"
                            class="form-control m-input"
                            v-model="mSearchTxtEfector"
                            @change="searchFor()"
                            style="width: 100%; padding-left:10px;">
                            <option v-for="option in this.GET_EFECTOR_LIST" 
                                v-bind:value="option.empresaID" 
                                :key="option.empresaID">
                                {{ option.Descripcion }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <button type="button" 
                            @click="searchFor()"
                            class="btn m-btn--pill m-btn--air btn-outline-primary">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters} from 'vuex';
    import VueSweetalert2 from 'vue-sweetalert2';
    import 'sweetalert2/dist/sweetalert2.min.css';

    export default {

        data() {
            return {
                mSearchFor: '2',
                optionsSearchFor: [
                    { text: 'DNI', value: '1' },
                    { text: 'Nombre y Apellido', value: '2' }
               ],
               mSearchTxtDNI:     '',
               mSearchTxtLastName:'',
               mSearchTxtName:    '',
               mSearchTxtEfector: '',
               mSelectDNI:     false,
               mSelectName:    true,
               mSelectEfector: false,
            }
        },

        components: {
          // components' list
          VueSweetalert2
        },

        methods: {
            ...mapActions('paciente', [
                'FETCH_PARAMETER_TOTAL_RECORDS',
                'FETCH_EFECTOR_LIST',
                'FETCH_PARAMETERS_SEARCH',
                'FETCH_PARAMETER_FILTER',
                'FETCH_PATIENTS_LIST',
            ]),

            onChange(event) {
                //console.log("Select: " + event.target.value);
                switch (event.target.value) {
                    case '1':
                        this.mSelectDNI     = true;
                        this.mSelectName    = false;
                        this.mSelectDate    = false;
                        this.mSelectEfector = false;
                        break;
                    case '2':
                        this.mSelectDNI     = false;
                        this.mSelectName    = true;
                        this.mSelectDate    = false;
                        this.mSelectEfector = false;
                        break;
                    case '4':
                        this.mSelectDNI     = false;
                        this.mSelectName    = false;
                        this.mSelectDate    = false;
                        this.mSelectEfector = true;
                        let data;
                        this.FETCH_EFECTOR_LIST(data);
                        break;
                    default:
                        this.mSelectDNI     = true;
                        this.mSelectName    = false;
                        this.mSelectDate    = false;
                        this.mSelectEfector = false;
                        break;
                };

                let arrFilter       = this.GET_PARAMETER_FILTER;
                let parameterFilter = arrFilter['parameterFilter'];
                let codeSearchFor   = this.mSearchFor;
                let txtSearch       = '';

                // Put on blank all fields
                this.mSearchTxtDNI      = '';
                this.mSearchTxtLastName = '';
                this.mSearchTxtName     = '';
                
                let data = {
                    codeSearchFor,
                    txtSearch,
                    parameterFilter
                }

                this.FETCH_PARAMETER_FILTER(data),
                this.FETCH_PARAMETERS_SEARCH(data),
                this.FETCH_PATIENTS_LIST(data)
            },

            searchFor(){
                //console.log("### UPDATE PAGE BY SEARCH AND FILTER PARAMETERS ###");
                
                this.$toasted.show('Actualizando lista de pacientes...', {
                        icon :    'fa-hourglass-half ',
                        theme:    'outline',
                        position: 'bottom-right'
                })

                let arrFilter       = this.GET_PARAMETER_FILTER;
                let parameterFilter = arrFilter['parameterFilter'];
                let codeSearchFor   = this.mSearchFor;
                let arrTotRecords   = this.GET_PARAMETER_TOTAL_RECORDS;
                let totalRecords    = arrTotRecords['totalRecords'];
                let txtSearch       = '';
                switch (this.mSearchFor) {
                    case '1':
                        txtSearch = this.mSearchTxtDNI;
                        break;
                    case '2':
                        txtSearch = this.mSearchTxtLastName + '/' + this.mSearchTxtName;
                        break;
                    case '4':
                        txtSearch = this.mSearchTxtEfector;
                        break;
                    default:
                        txtSearch = '';
                        break;
                };

                if (txtSearch == ''){
                    swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Debe ingresar el valor que desea buscar!',
                        timer: 5000
                    });
                    this.$toasted.clear();
                    return;
                }

                var targetOffset = $('#listPatient').offset().top - 73;
                $('html, body').animate( { scrollTop: targetOffset}, 500 );

                let data = {
                    codeSearchFor,
                    txtSearch,
                    parameterFilter,
                    totalRecords
                }

                //console.log("searchFor: " + Object.keys(data));
                //console.log("searchFor: " + Object.values(data));
                //console.log("searchFor: " + codeSearchFor + " txtSearch: " + txtSearch + " parameterFilter: " + parameterFilter);

                this.FETCH_PARAMETER_FILTER(data),
                this.FETCH_PARAMETERS_SEARCH(data),
                this.FETCH_PATIENTS_LIST(data)
            },

            updateSearchTxt(value) {
                // console.log("Input update keys: " + Object.keys(value) + " - values: " + Object.values(value));
                // console.log("Values: " + this.mSearchTxtLastName);
                let arrFilter       = this.GET_PARAMETER_FILTER;
                let parameterFilter = arrFilter['parameterFilter'];
                let codeSearchFor   = this.mSearchFor;
                let arrTotRecords   = this.GET_PARAMETER_TOTAL_RECORDS;
                let totalRecords    = arrTotRecords['totalRecords'];
                let txtSearch       = '';
                switch (this.mSearchFor) {
                    case '1':
                        txtSearch = this.mSearchTxtDNI;
                        break;
                    case '2':
                        txtSearch = this.mSearchTxtLastName + '/' + this.mSearchTxtName;
                        break;
                    case '4':
                        txtSearch = this.mSearchTxtEfector;
                        break;
                    default:
                        txtSearch = '';
                        break;
                };

                let data = {
                    codeSearchFor,
                    txtSearch,
                    parameterFilter,
                    totalRecords
                }

                this.FETCH_PARAMETER_FILTER(data),
                this.FETCH_PARAMETERS_SEARCH(data)
            }
        },

        computed: {
            ...mapGetters('paciente', [
                'GET_PARAMETER_TOTAL_RECORDS',
                'GET_EFECTOR_LIST',
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