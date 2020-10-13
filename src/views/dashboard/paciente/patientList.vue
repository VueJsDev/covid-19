<template>
    <div>
        <div class="m-portlet">
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <span class="m-portlet__head-icon m--hide">
                            <i class="la la-gear"></i>
                        </span>
                        <h3 class="m-portlet__head-text">
                            RESULTADOS: 
                        </h3>
                    </div>
                </div>
            </div>
            <div class="col-sm-12" style="padding: 30px 0 0 30px;">
                <div style='width:96%'>
                    <h5  
                        v-if="typeof this.vPatients[0] != 'undefined'"
                        style="margin-right: 15px">
                            Total de pacientes: <b>{{ this.vPatients[0].cantidadRegistro }} </b>
                    </h5>
                    <h5  
                        v-else
                        style="margin-right: 15px">
                            Total de pacientes: <b> -- </b>
                    </h5>
                    <div class="m-separator m-separator--dashed"></div>
                </div>
                <div class="d-flex flex-row">
                    <div class="p-2" style="margin-top: 6px;">Mostrar</div>
                    <div class="p-2">
                        <select 
                            name="mSearchForTot" 
                            aria-controls="example" 
                            class="custom-select custom-select-sm form-control form-control-sm"
                            v-model="mSearchForTot"
                            @change="onChange($event)">
                            <option v-for="option in optionsSearchForTot" 
                                    v-bind:value="option.value" 
                                    :key="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                    <div class="p-2" style="margin-top: 6px;">registros</div>
                    <div class="p-2" style="margin-top: 6px; width: 62%;"></div>
                    <div
                        v-if="typeof this.vPatients[0] != 'undefined'" 
                        class="p-2" style="margin-top: 6px;">
                            Mostrando {{ typeof this.vTotRecords.totalRecords == 'undefined' ? 10 : this.vTotRecords.totalRecords }} 
                                   de {{ this.vPatients[0].cantidadRegistro }} 
                            registros
                    </div>
                </div>
            </div>
            <div class="m-portlet__body" style="overflow-x:auto">
                <div style='width:98%'>
                    <table class="table m-table m-table--head-separator-primary table-striped">
                        <thead>
                            <tr>
                                <th style="width:04%"><center>#</center></th>
                                <th style="width:08%"><center>Documento</center></th>
                                <th style="width:20%"><center>Paciente</center></th>
                                <th style="width:08%"><center>Sexo</center></th>
                                <th style="width:08%"><center>Edad</center></th>
                                <th style="width:17%"><center>Dirección</center></th>
                                <th style="width:05%"><center>Cant. de Hisopados</center></th>
                                <th style="width:16%"><center>Condición Paciente</center></th>
                                <th style="width:14%"><center>Acción</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                :id="`pat-${patient.pacienteID}`" v-for="(patient, index) in vPatients" :key="index">
                                <td><center>{{ patient.Orden }}</center></td>
                                <td><center>{{ patient.numeroDocumento }}</center></td>
                                <td><center>{{ patient.paciente }}</center></td>
                                <td><center>{{ patient.sexo }}</center></td>
                                <td><center>{{ patient.edad }}</center></td>
                                <td><center>{{ patient.direccion }}</center></td>
                                <td><center>{{ patient.cantidadHisopado }}</center></td>
                                <td><center>{{ patient.Condicion }}</center></td>
                                <td>
                                    <center>
                                        <div class="btn-group" role="group" aria-label="actionPatient">
                                            <button type="button" 
                                                class="btn btn-light"
                                                @click="btnSituation(patient.pacienteID, patient.numeroDocumento, patient.paciente, patient.Condicion)"
                                                v-if="patient.Condicion == 'Positivo'">
                                                <i class="fas fa-file-medical fa-2x" style="padding-top: 15px"></i>
                                                <span style="margin-left: 5px">Agregar</span><br/>
                                                <span style="margin-left: 30px">Situación</span>
                                            </button>
                                            <div v-else> -- </div>
                                            <!-- 
                                            <button type="button" 
                                                :class="patient.Condicion == 'Positivo' ? 'btn_rounded_right' : 'btn_rounded_right_only'"
                                                class="btn btn-light">
                                                <i class="fas fa-folder-open fa-2x" style="padding-top: 15px"></i>
                                                <span style="margin-left: 6px">Historia</span><br/>
                                                <span style="margin-left: 35px">Clínica</span>
                                            </button>
                                            -->
                                        </div>
                                    </center>
                                </td>
                            </tr>
                            <tr v-if="typeof this.vPatients[0] == 'undefined'">
                                <td colspan="9">“No se encontraron resultado con esos parámetros</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row" style="float:right; margin-right:5px;">
                        <vue-paginate-al 
                            :totalPage="typeof this.vPatients[0] == 'undefined' ? 1: this.vPatients[0].TotalPaginas" 
                            :prevText="'Ant.'"
                            :nextText="'Sig.'"
                            :currentPage="this.pageActive"
                            @btnClick="paginateClick">
                        </vue-paginate-al>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body">
                <div class="row">
                    <div class="row col-md-12">
                        <!-- Referencias -->
                    </div>
                </div>
            </div>
        </div>
        <!-- DETALLE DE PACIENTES TEST -->
        <div class="modal fade" 
            id="modalAddSituation" 
            tabindex="-1" 
            role="dialog" 
            aria-labelledby="idNamePatient" 
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="m-section__content table-wrapper">
                            <div class="form-group row">
                                <label class="col-sm-7 col-form-label">
                                    <h5 class="modal-title">
                                        <span style="color:#ff0000; position:absolute; top: 3%;">
                                            <i class="flaticon-information fa-2x"></i>
                                        </span>
                                        <span style="margin-left: 45px">AGREGAR SITUACIÓN</span>
                                    </h5>
                                </label>
                                <div class="col-sm-5" style="text-align: right">
                                    <a data-dismiss="modal" style="color:#716aca">
                                        <i class="flaticon-cancel fa-2x"></i>
                                    </a>
                                </div>
                            </div>
                            <hr class="dotted">
                            <div class="form-group row">
                                <!-- ID -->
                                <label id="txtIDPatient"
                                    style="display:none"
                                    class="col-form-label">
                                </label>
                                <!-- Name -->
                                <label for="txtNamePatient" 
                                    id="txtNamePatient"
                                    class="col-sm-6 col-form-label">
                                </label>
                                <!-- DNI -->
                                <label for="txtDniPatient" 
                                    id="txtDniPatient"
                                    class="col-sm-2 col-form-label">
                                </label>
                                <div class="col-sm-4" style="text-align: right">
                                    <button type="button" 
                                        :disabled="this.isDisabled"
                                        @click="btnUpadteList()" 
                                        class="btn m-btn--pill btn-outline-brand">
                                        <i class="la la-save fa-2x"></i>&nbsp;&nbsp;&nbsp;GUARDAR
                                    </button>
                                </div>
                            </div>
                            <hr class="dotted">
                            <div v-if="this.errCondition"
                                class="alert alert-danger alert-dismissible fade show" 
                                role="alert">
                                <span>{{ errConditionTxt }}</span>
                            </div>
                            <div id="idBodyAddSituation">
                                Este paciente se encuentra:<br/><br/>
                                <div class="form-check" style="margin-left: 50px;">
                                    <input class="form-check-input" 
                                        type="radio" 
                                        name="rbAddSituation" 
                                        id="outsideProvince" 
                                        value="2"
                                        @click="rbAddSituation(2)">
                                    <label class="form-check-label" for="outsideProvince">
                                        En tránsito con egreso provincial
                                    </label>
                                </div>
                                <br/>
                                <div class="form-check" style="margin-left: 50px;">
                                    <input class="form-check-input" 
                                        type="radio" 
                                        name="rbAddSituation" 
                                        id="medicalRelease" 
                                        value="3"
                                        @click="rbAddSituation(3)">
                                    <label class="form-check-label" for="medicalRelease">
                                        Alta médica por Óbito
                                    </label>
                                </div>
                                <br/>
                                <div class="form-check" style="margin-left: 50px;">
                                    <input class="form-check-input" 
                                        type="radio" 
                                        name="rbAddSituation" 
                                        id="rbInputDefault" 
                                        value="0"
                                        checked
                                        @click="rbAddSituation(0)">
                                    <label id="rbDefaultCondition"
                                        class="form-check-label">
                                        <!-- Default Condition -->
                                    </label>
                                </div>
                            </div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<!-- use the latest release -->
<script src="https://unpkg.com/vuejs-paginate@latest"></script>
<script>
    import { mapActions, mapState, mapGetters} from 'vuex';
    import VuePaginateAl from 'vue-paginate-al'
    import VueSweetalert2 from 'vue-sweetalert2';
    import 'sweetalert2/dist/sweetalert2.min.css';
        
    export default {
        data: () => ({
            result: null,
            errCondition: false,
            pageActive: 1,
            isDisabled: false,
            errConditionTxt: 'Debe elegir una condición',
            mSearchForTot: '10',
            optionsSearchForTot: [
                { text: '10',  value: '10' },
                { text: '25',  value: '25' },
                { text: '50',  value: '50' },
                { text: '100', value: '100' }
            ],
        }),

        components: {
            VuePaginateAl,
            VueSweetalert2
        },

        created () {
            this.getData(); 
        },

        methods: {
            ...mapActions('paciente', [
                'FETCH_PARAMETER_TOTAL_RECORDS',
                'FETCH_PARAMETER_FILTER',
                'FETCH_PARAMETERS_SEARCH',
                'FETCH_PARAMETER_CONDITION',
                'FETCH_PATIENTS_LIST',
                'FETCH_SAVE_CONDITION_PATIENT',
                'FETCH_RESPONSE_SAVE'
                ]),

            onChange(event) {
                //console.log("Select: " + event.target.value);

                this.$toasted.show('Actualizando lista de pacientes...', {
                        icon :    'fa-hourglass-half ',
                        theme:    'outline',
                        position: 'bottom-right'
                })
                
                let arrFilter       = this.vFilter;
                let parameterFilter = arrFilter['parameterFilter'];
                let arrSearch       = this.vSearch;
                let codeSearchFor   = arrSearch['codeSearchFor'];
                let txtSearch       = arrSearch['txtSearch'];
                let totalRecords    = event.target.value;
                let codePageSearch  = 1;
                this.pageActive     = 1;

                let data = {
                    codeSearchFor,
                    txtSearch,
                    parameterFilter,
                    totalRecords,
                    codePageSearch
                }

                this.FETCH_PARAMETER_TOTAL_RECORDS(data),
                this.FETCH_PARAMETER_FILTER(data),
                this.FETCH_PARAMETERS_SEARCH(data),
                this.FETCH_PATIENTS_LIST(data)
            },
            
            paginateClick : function(pageNumber) {

                this.$toasted.show('Actualizando lista de pacientes...', {
                        icon :    'fa-hourglass-half ',
                        theme:    'outline',
                        position: 'bottom-right'
                })

                let arrFilter       = this.vFilter;
                let parameterFilter = arrFilter['parameterFilter'];
                let arrSearch       = this.vSearch;
                let codeSearchFor   = arrSearch['codeSearchFor'];
                let txtSearch       = arrSearch['txtSearch'];
                let codePageSearch  = pageNumber;
                this.pageActive     = pageNumber;
                let arrTotRecords   = this.vTotRecords;
                let totalRecords    = arrTotRecords['totalRecords'];
                
                var targetOffset = $('#listPatient').offset().top - 73;
                $('html, body').animate( { scrollTop: targetOffset}, 500 );

                let data = {
                    codeSearchFor,
                    txtSearch,
                    parameterFilter,
                    codePageSearch,
                    totalRecords
                }

                this.FETCH_PARAMETER_FILTER(data),
                this.FETCH_PARAMETERS_SEARCH(data),
                this.FETCH_PATIENTS_LIST(data)
            },

            getData() {
                let arrFilter     = this.vFilter;
                let codeFilterFor = arrFilter['codeFilterFor'];
                let arrSearch     = this.vSearch;
                let codeSearchFor = arrSearch['codeSearchFor'];
                let txtSearch     = arrSearch['txtSearch'];
                let arrTotRecords = this.vTotRecords;
                let totalRecords  = arrTotRecords['totalRecords'];
                
                let data = {
                    codeSearchFor,
                    txtSearch,
                    codeFilterFor,
                    totalRecords
                }

                this.FETCH_PARAMETER_FILTER(data),
                this.FETCH_PARAMETERS_SEARCH(data),
                this.FETCH_PATIENTS_LIST(data) 
            },

            btnSituation(id, dni, fullName, condition){
                
                $('#txtNamePatient').html(`Paciente: <b>${fullName}</b>`);
                $('#txtDniPatient').html(`DNI: <b>${dni}</b>`);
                $('#txtIDPatient').html(`${id}`);
                $('#rbDefaultCondition').html(`${condition}`);
                $("#rbInputDefault").prop("checked", true);

                // Check the DNI value
                if (dni == null) {
                    this.isDisabled = true;
                    this.errConditionTxt = 'El paciente no tiene DNI, no va a poder guardar.';
                    this.errCondition =  true;
                }
                else {
                    this.isDisabled = false;
                }
                
                $('#modalAddSituation').modal("show")
            },

            rbAddSituation(code){
                //console.log("### UPDATE PAGE BY DATE AND CODE BY INCOMING ABOARD ###");
                this.errCondition = false;
                
                let arrSearch     = this.vSearch;
                let codeSearchFor = arrSearch['codeSearchFor'];
                let txtSearch     = arrSearch['txtSearch'];
                let arrFilter     = this.vFilter;
                let codeFilterFor = arrFilter['codeFilterFor'];
                let condition     = code;
                let arrTotRecords = this.vTotRecords;
                let totalRecords  = arrTotRecords['totalRecords'];

                let data = {
                    codeSearchFor,
                    txtSearch,
                    codeFilterFor,
                    condition,
                    totalRecords
                }
                //console.log("Situation: " + condition);
                this.FETCH_PARAMETER_CONDITION(data)
            },

            btnUpadteList() {
                let arrCondition = this.vCondition;
                let conditionID  = arrCondition['condition'];
                let patientID    = $('#txtIDPatient').text();
                //console.log("patientID: " + patientID + " conditionID: " + conditionID);

                if (typeof conditionID == 'undefined' || conditionID == 0) {
                    this.errConditionTxt = 'Debe elegir una condición!';
                    this.errCondition    =  true;
                }
                else {
                    this.errCondition = false;
                    this.isDisabled   = false;
                    let data = {
                        patientID, 
                        conditionID 
                    }

                    this.FETCH_SAVE_CONDITION_PATIENT(data);
                    $('#modalAddSituation').modal("hide")
                }

                
            },

        },
        computed: {
            ...mapState('paciente', ['patients_list']),
            ...mapGetters('paciente', {
                vTotRecords:'GET_PARAMETER_TOTAL_RECORDS',
                vSearch:    'GET_PARAMETERS_SEARCH',
                vFilter:    'GET_PARAMETER_FILTER',
                vCondition: 'GET_PARAMETER_CONDITION',
                vPatients:  'GET_PATIENTS_LIST',
                vSave:      'GET_RESPONSE_SAVE'}),

            isMobile(){
                return (
                    (navigator.userAgent.match(/Android/i)) ||
                    (navigator.userAgent.match(/webOS/i)) ||
                    (navigator.userAgent.match(/iPhone/i)) ||
                    (navigator.userAgent.match(/iPod/i)) ||
                    (navigator.userAgent.match(/iPad/i)) ||
                    (navigator.userAgent.match(/BlackBerry/i))
                );
            },

        },
        watch: {
            patients_list(newValue, oldValue){
                // Clear the pop-up message 
                this.$toasted.clear()
                //console.log(`Updating from ${oldValue.length} to ${newValue.length}`);
                // Change the title
            },
            vSave(value) {
                //console.log("vSave --> update");
                if (value.responseSave != '') {
                    switch (value.responseSave) {
                        case 201:
                            swal.fire({
                                type: 'success',
                                title: 'Se ha grabado correctamente.',
                                showConfirmButton: false,
                                timer: 2000
                            });
                            break;
                        case 400:
                            swal.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Se ha producido un error!',
                                timer: 5000
                            });
                            break;
                        case 500:
                            swal.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Se ha producido un error!',
                                timer: 5000
                            });
                            break;
                        default:
                            break;
                    }

                    let arrFilter       = this.vFilter;
                    let parameterFilter = arrFilter['parameterFilter'];
                    let arrSearch       = this.vSearch;
                    let codeSearchFor   = arrSearch['codeSearchFor'];
                    let txtSearch       = arrSearch['txtSearch'];
                    let codePageSearch  = this.pageActive;
                    let responseSave    = '';

                    let data = {
                        codeSearchFor,
                        txtSearch,
                        parameterFilter,
                        codePageSearch,
                        responseSave
                    }
                    this.FETCH_RESPONSE_SAVE(data)
                    this.FETCH_PATIENTS_LIST(data)
                }
                
            }
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
    min-height: 60px;
}

hr.dotted {
  border-top: 2px dotted #bbb;
}
a:hover {
    text-decoration: none;
}
.btn_rounded_left {
    border-radius: 30px 0 0 30px;
    border-right: 2px solid #716ACA;
}
.btn_rounded_right {
    border-radius: 0 30px 30px 0px;
}
.btn_rounded_right_only {
    border-radius: 30px;
}

.page-container {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 30px;
    margin: 2px;
    float:right;
    width:99%;
    padding-top: 5px;
}
.clasePagina{
    background-color: yellow;
}

.page-link {
    border-radius: 30px;
    color:green;
    margin: 2px;
    width: 30px;
    text-align: center;
    padding-top: 5px;
}
.active {
  background-color: #666;
  color: white;
}

.page-previous-next {
    border-radius: 30px;
    background-color: #f3f2f7;
    color: #bdbec5;
    margin: 20px;
    width: 30px;
    text-align: center;
    padding-top: 5px;
}
.page-link-active {
  background-color: yellow;
}

::-webkit-scrollbar {
    -webkit-appearance: none;
}

::-webkit-scrollbar:vertical {
    width: 12px;
    height: auto;
}

::-webkit-scrollbar:horizontal {
    height: 12px;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .5);
    border-radius: 10px;
    border: 2px solid #ffffff;
}

::-webkit-scrollbar-track {
    border-radius: 10px;  
    background-color: #ffffff; 
}

</style>