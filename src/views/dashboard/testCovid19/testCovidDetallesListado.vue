<template>
    <div>
        <div class="m-portlet">
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text" id="">
                            {{ tituloListado }}
                        </h3>
                    </div>
                </div>
                <div v-if="getCodePatientes" class="m-portlet__head-tools">
                    
                    <label  class="m-checkbox m-checkbox--state-brand">
                        <input @change="filterCasosActivos" type="checkbox" v-model="checkCasosActivos"> Ver sólo casos activos
                        <span></span>
                    </label>
                </div>
            </div>
            <div class="m-portlet__body">
                <h5 v-if="filterSelected != -1" style="margin-right: 15px">Total: <b>{{ patients.length }}</b> {{ descripcionFilter }} </h5>
                <h5 v-if="checkCasosActivos" style="margin-right: 15px">Total: <b>{{ GET_TOTALS.activos }}</b> pacientes activos </h5>
                <div v-if="checkCasosActivos" class="m-separator m-separator--dashed"></div>
                <div v-if="filterSelected != -1" class="m-separator m-separator--dashed"></div>
                <table class="table table-striped- table-bordered table-hover table-checkable" id="tableDetallesListado">
                    <thead>
                        <tr>
                            <th><center>N°</center></th>
                            <th v-if="GET_CODE_PATIENTS == 8"><center>Fecha Alta</center></th>
                            <th v-else><center>Turno</center></th>
                            <th><center>Documento</center></th>
                            <th><center>Paciente</center></th>
                            <th><center>Sexo</center></th>
                            <th><center>Edad</center></th>
                            <th><center>Domicilio</center></th>
                            <th><center>Cant. de Test</center></th>
                            <th><center>Acción</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            :class="[
                                GET_CODE_PATIENTS != 1 && GET_CODE_PATIENTS != 8 && patient.Positivo == 1 ? 'testPositivos' : '', 
                                GET_CODE_PATIENTS == 6 && patient.recuperado == 1 ? 'resultadosRecuperados' : '',
                                GET_CODE_PATIENTS == 7 && patient.recuperado == 1 ? 'resultadosRecuperados' : '', 
                                GET_CODE_PATIENTS != 1 && GET_CODE_PATIENTS != 8 && patient.Positivo > 1 ? 'rehisopadosCasosConfirmados' : '', 
                                patient.ResultadoPendiente ==1 ? 'resultadosPendientes' : ''
                            ]" 
                            :id="`pat-${patient.pacienteID}`" v-for="(patient, index) in patients" :key="index">
                            <td><center>{{ index + 1 }}</center></td>
                            <td v-if="GET_CODE_PATIENTS == 8"><center>{{ patient.fechaAlta }}</center></td>
                            <td v-else><center>{{ patient.FechaTurno }}</center></td>
                            <td><center>{{ patient.numeroDocumento }}</center></td>
                            <td><center>{{ patient.apellido }}, {{ patient.nombre }}</center></td>
                            <td v-if="patient.sexo == 'M'"><center>Masculino</center></td>
                            <td v-else><center>Femenino</center></td>
                            <td><center>{{ patient.edad }}</center></td>
                            <td><center>{{ patient.barrio }} {{ patient.domicilio }}</center></td>
                            <td><center>{{ patient.cantidadHisopado }} test</center></td>
                            <td>
                                <center>
                                    <a @click="verDetallesDelPaciente(patient.pacienteID, patient.apellido, patient.nombre)" class="btn btn-outline-primary m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                                        <i class="la la-info-circle"></i>
                                    </a>
                                </center>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="m-portlet__body">
                <div class="row">
                    <div class="row col-md-12">
                        <span style="margin-right: 5px" class="m-badge testPositivos"></span> <span style="margin-right: 15px">Test confirmados</span>
                        <span style="margin-right: 5px" class="m-badge resultadosRecuperados"></span><span style="margin-right: 15px"> Recuperado</span>
                        <span style="margin-right: 5px" class="m-badge rehisopadosCasosConfirmados"></span><span style="margin-right: 15px"> Rehisopados casos confirmados</span>
                        <span style="margin-right: 5px" class="m-badge resultadosPendientes"></span><span style="margin-right: 15px"> Resultados pendientes</span>
                        <span style="margin-right: 5px" class="m-badge descartados"></span> Test Negativos
                    </div>
                </div>
            </div>
        </div>
        <!-- DETALLE DE PACIENTES TEST -->
        <div class="modal fade" id="modalTestDetailsPatient" tabindex="-1" role="dialog" aria-labelledby="idNamePatient" aria-hidden="true">

            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">

                <div class="modal-content">

                    <div class="modal-header">

                        <h5 class="modal-title" id="idNamePatient">Apellido, nombre</h5>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">

                            <span aria-hidden="true">&times;</span>

                        </button>

                    </div>

                    <div class="modal-body">

                       
                        <div class="m-section__content table-wrapper">
							<table class="table m-table">
								<thead>
									<tr>
										<th><center>Nº Test</center></th>
										<th><center>Fecha del turno Test</center></th>
										<th><center>Efector que deriva</center></th>
										<th><center>Fecha del resultado</center></th>
										<th><center>Resultado</center></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(patient, index) in GET_DETAIL_PATIENT" :key="index">
										<td><center>{{ index + 1 }}</center></td>
										<td><center>{{ patient.FechaHoraToma }}</center></td>
										<td><center>{{ patient.EfectorProcedencia }}</center></td>
										<td><center>{{ patient.FechaCargaResultado }}</center></td>
										<td><center>{{ patient.Resultado == null ? 'PENDIENTE' :  patient.Resultado }}</center></td>
									</tr>
								</tbody>
							</table>
						</div>


                    </div>

                    <!--div class="modal-footer">

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                        <button type="button" class="btn btn-primary">Send message</button>

                    </div -->

                </div>

            </div>

        </div>
    </div>

</template>

<script>
    import { mapActions, mapState, mapGetters} from 'vuex';
    export default {
        data: () => ({
            checkCasosActivos: false,
            filterSelected: -1,
            descripcionFilter: "Todos"
        }),
        created () {
            this.$nextTick(() => {
                $("#tableDetallesListado").DataTable({
                    "retrieve": true,
                    "ordering": false,
                    "language": {
                        "emptyTable": "No hay registros para mostrar."
                    }
                })
                this.loadSelectEstados()
            }) 
        },
        methods: {
            ...mapActions('testcovid19', ['FETCH_DATA_DETAIL_PATIENT', 'FETCH_PATIENTS']),
            loadPacientesPorEstados: function(event){
                console.log("Cargo el estado");
            },
            loadToasted(){
                this.$toasted.show('Actualizando lista de pacientes...', {
                        icon : 'fa-hourglass-half ',
                        theme: 'outline',
                        position: 'bottom-right'
                })
            },
            loadSelectEstados(){
                const self = this
                if (this.GET_CODE_PATIENTS == 6) {
                    $('#tableDetallesListado_filter').append('<label id="labelSelectEstados" style="margin-left: 30px;"><select class="form-control form-control-sm" id="estadoHisopado"><option hidden selected>Estados</option><option '+ printSelectedFilter(-1) +' value="-1">Todos</option><option '+ printSelectedFilter(1) +' value="1">Resultados Pendientes</option><option '+ printSelectedFilter(2) +' value="2">Test Negativos</option><option '+ printSelectedFilter(3) +' value="3">Rehisopados Confirmados</option></select></label>')

                    $("#estadoHisopado").on('change', function(event){
                        self.loadToasted()
                        self.filterSelected = event.target.value
                        if ( event.target.value == 1 ){
                            self.descripcionFilter = 'resultados pendientes'
                        } else if ( event.target.value == 2 ) {
                            self.descripcionFilter = 'test negativos'
                        } else if ( event.target.value == 3 ) {
                            self.descripcionFilter = 'rehisopados confirmados'
                        }
                        let data = {
                            code: 6,
                            codeSelect: event.target.value
                        }
                        self.FETCH_PATIENTS(data)
                    });
                    
                    function printSelectedFilter(value){
                        if (value == self.filterSelected){
                            return 'selected'
                        } else if ( value == self.filterSelected ) {
                            return 'selected'
                        } else if ( value == self.filterSelected ) {
                            return 'selected'
                        } else if ( value == self.filterSelected ) {
                            return 'selected'
                        }
                        return ''
                    }
                }
            },
            
            filterCasosActivos(){
                if (this.checkCasosActivos) {
                    let data = {
                        code: 9
                    }
                    this.FETCH_PATIENTS(data)
                } else {
                    let data = {
                        code: 7
                    }
                    this.FETCH_PATIENTS(data)
                }
            },
            verDetallesDelPaciente(idPatient, lastname, name){
                let data = {
                    idPatient
                }
                this.FETCH_DATA_DETAIL_PATIENT( data ).then( res => {
                    $('#idNamePatient').text(`${lastname}, ${name}`)
                    $('#modalTestDetailsPatient').modal("show")
                }) 
            }
        },
        computed: {
            ...mapState('testcovid19', ['patients']),
            ...mapGetters('testcovid19', ['GET_DETAIL_PATIENT', 'GET_CODE_PATIENTS', 'GET_TOTALS']),
            getCodePatientes(){
                if (this.GET_CODE_PATIENTS == 7 || this.GET_CODE_PATIENTS == 9) {
                    return true
                } else {
                    this.checkCasosActivos = false
                    return false
                }
            },
            tituloListado(){
                if(this.GET_CODE_PATIENTS == 1){
                    return "Listado de pacientes del día"
                } else if (this.GET_CODE_PATIENTS == 6) {

                    return "Listado de pacientes - Total test realizados"
                } else if (this.GET_CODE_PATIENTS == 7){
                    return "Listado de pacientes - Total test confirmados"
                } else if (this.GET_CODE_PATIENTS == 8){
                    return "Listado de pacientes - Total trecuperados"
                } else if (this.GET_CODE_PATIENTS == 9){
                    return "Listado de pacientes - Total casos activos"    
                } else if (this.GET_CODE_PATIENTS == 2){
                    return "Listado de pacientes - Test confirmados"
                } else if (this.GET_CODE_PATIENTS == 3){
                    return "Listado de pacientes - Rehisopados casos confirmados"
                } else if (this.GET_CODE_PATIENTS == 5){
                    return "Listado de pacientes - Resultados pendientes"
                } else if (this.GET_CODE_PATIENTS == 4){
                    return "Listado de pacientes - Test negativos"
                }

            }
        },
        watch: {
            patients(newValue, oldValue){
                this.$toasted.clear()
                $('#tableDetallesListado').DataTable().destroy();
               this.$nextTick(() => {
                $("#tableDetallesListado").DataTable({
                    "retrieve": true,
                    "ordering": false,
                    "language": {
                        "emptyTable": "No hay registros para mostrar."
                    }
                })
                this.loadSelectEstados()
                
            }) 
            }
        }
    }
</script>
<style scoped>
.testPositivos{
    background-color:#ffa3a3
}
.rehisopadosCasosConfirmados{
    background-color:#faffad
}
.resultadosPendientes{
    background-color:#FFB357
}
.resultadosRecuperados{
    background-color:#cdffcf
}
.descartados{ 

    background-color:#c5c5c5
}

</style>