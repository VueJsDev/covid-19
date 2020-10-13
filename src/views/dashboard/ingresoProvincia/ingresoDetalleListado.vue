<template>
    <div>
        <div class="m-portlet">
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <span class="m-portlet__head-icon m--hide">
                            <i class="la la-gear"></i>
                        </span>
                        <h3 id="titleListDetail" class="m-portlet__head-text">
                            LISTADO DE LAS PERSONAS INGRESADAS A LA PROVINCIA
                        </h3>
                    </div>
                </div>
                <div class="col-sm-2" style="padding-top: 14px; margin-left: 30px;">
                    <button type="button" 
                        @click="btnUpadteList()" 
                        class="btn m-btn--pill btn-outline-brand">
                        ACTUALIZAR
                    </button>
                </div>
            </div>
            <div class="m-portlet__body" style="overflow-x:auto">
                <h5  style="margin-right: 15px">Total de ingresos: <b>{{ totalCases }} </b></h5>
                <div class="m-separator m-separator--dashed"></div>
                <div style='width:98%'>
                    <table class="table m-table m-table--head-separator-primary table-hover table-striped table-checkable" 
                        id="tableDetallesListado">
                        <thead>
                            <tr>
                                <th style="width:8%"><center>Fecha de ingreso</center></th>
                                <th style="width:8%"><center>DNI</center></th>
                                <th style="width:10%"><center>Paciente</center></th>
                                <th style="width:6%"><center>Edad</center></th>
                                <th style="width:10%"><center>Carácter</center></th>
                                <th style="width:10%"><center>Derivado</center></th>
                                <th style="width:8%"><center>Zona de Ingreso</center></th>
                                <th style="width:6%"><center>Hisopado</center></th>
                                <th style="width:8%"><center>Realizó el hisopado</center></th>
                                <th style="width:10%"><center>Centro de aislamiento</center></th>
                                <th style="width:8%"><center>Presentó síntomas</center></th>
                                <th style="width:8%"><center>Efector que generó el turno</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                :id="`pat-${patient.TurnoCOVID}`" v-for="(patient, index) in vPatients" :key="index">
                                <td><center>{{ patient.FechaIngreso }}</center></td>
                                <td><center>{{ patient.NumeroDocumento }}</center></td>
                                <td><center>{{ patient.Paciente }}</center></td>
                                <td><center>{{ patient.edad }}</center></td>
                                <td><center>{{ patient.Caracter }}</center></td>
                                <td><center>{{ patient.Derivado }}</center></td>
                                <td><center>{{ patient.ZonaIngreso }}</center></td>
                                <td><center>{{ patient.Hisopado }}</center></td>
                                <td><center>{{ patient.RealizoHisopado }}</center></td>
                                <td><center>{{ patient.CentroAislamiento }}</center></td>
                                <td>
                                    <center v-if="patient.Sintomas == 'Si'">
                                        <span style="vertical-align: 4px">
                                            {{ patient.Sintomas }}
                                        </span>
                                        <a @click="seeSymptoms(patient.NumeroDocumento, patient.Paciente, patient.Cansancio, patient.DifRespiratoria, patient.Tos, patient.Fiebre, patient.Flema)">
                                            <span style="color:Tomato; margin-left: 10px;">
                                                <i class="fas fa-info-circle fa-2x"></i>
                                            </span>
                                        </a>
                                    </center>
                                    <center v-else>
                                        <span style="vertical-align: 4px">
                                            {{ patient.Sintomas }}
                                        </span>
                                    </center>
                                </td>
                                <td><center>{{ patient.Efector }}</center></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="m-separator m-separator--dashed"></div>
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
        <div class="modal fade" id="modalTestDetailsPatient" tabindex="-1" role="dialog" aria-labelledby="idNamePatient" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <span style="color: #ff6600;"><i class="fas fa-exclamation-triangle fa-2x"></i></span>
                            <span style="margin-left: 10px;">SÍNTOMAS DEL PACIENTE</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="m-section__content table-wrapper">
                            <div id="idNamePatient">SÍNTOMAS QUE PRESENTÓ</div>
                            <div class="m-separator m-separator--dashed"></div>
                            <div id="idBodySymptoms">
                                <!-- Details of symptoms -->
                            </div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { mapActions, mapState, mapGetters} from 'vuex';

    export default {
        data: () => ({
            checkCasosActivos: false
        }),
        created () {
            this.getData();

            this.$nextTick(() => {
                $("#tableDetallesListado").DataTable({
                    "retrieve": true,
                    "ordering": false,
                    "language": {
                        "emptyTable": "No hay registros para mostrar."
                    }
                })
            }) 
        },
        methods: {
            ...mapActions('ingreosALaProvincia', [
                'FETCH_TOTALS', 
                'FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE', 
                'FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX',
                'FETCH_INCOME_PATIENTS_PROVINCE_LIST', 
                'FETCH_DATE_RANGE', 
                'FETCH_ACTIVE_CODE']),
            
            getData() {
                let dateF = new Date()
                let dateT = new Date()
                let code_active = 0
                let dateFrom = `${dateF.getFullYear()}/${dateF.getMonth() + 1}/${dateF.getDate()}`;
                let dateTo   = `${dateT.getFullYear()}/${dateT.getMonth() + 1}/${dateT.getDate()}`;
                let data = {
                            dateFrom,
                            dateTo,
                            code_active
                        }

                this.FETCH_INCOME_PATIENTS_PROVINCE_LIST(data)
            },

            btnUpadteList() {
                // Initializing the pop-up message 
                this.$toasted.show('Actualizando lista de ingresos...', {
                        icon : 'fa-hourglass-half ',
                        theme: 'outline',
                        position: 'bottom-right'
                })

                // Get Date updated
                let arrDataDate = this.vDate;
                let dateF = new Date(arrDataDate['dateFrom']);
                let dateT = new Date(arrDataDate['dateTo']);

                let dateFrom = `${dateF.getFullYear()}/${dateF.getMonth() + 1}/${dateF.getDate()}`;
                let dateTo   = `${dateT.getFullYear()}/${dateT.getMonth() + 1}/${dateT.getDate()}`;

                // Get Code updated
                let arrDataCode = this.vCode;
                let code_active = arrDataCode['code_active'];

                // I checked dates
                if (Date.parse(dateFrom) > Date.parse(dateTo)) {
                    alert("La fecha hasta debe ser posterior a la fecha Desde");
                }
                else  {
                    let data = {
                            dateFrom,
                            dateTo,
                            code_active
                        }
                    
                    //console.log("Updating patients list");
                    this.FETCH_TOTALS(data);
                    this.FETCH_ACTIVE_CODE(data);
                    this.FETCH_DATE_RANGE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX(data),
                    this.FETCH_INCOME_PATIENTS_PROVINCE_LIST(data)

                }
            },

            seeSymptoms(idPatient, fullName, vFatigue, vDifficultToBreathe, vCough, vFever, vPhlegm){
                let data = {
                    idPatient
                }
                $('#idNamePatient').html(`SÍNTOMAS QUE PRESENTÓ <b>${fullName}</b>`)
                let positveSymptom = '<span style="color:Tomato;"><i class="far fa-check-circle fa-2x"></i></span>';
                let strSymptoms = '';
                    vFatigue            == true ? strSymptoms += positveSymptom + '<span style="vertical-align: 4px; margin-left: 10px">CANSANCIO</span><br/><br/>' : '';
                    vDifficultToBreathe == true ? strSymptoms += positveSymptom + '<span style="vertical-align: 4px; margin-left: 10px">DIFICULTAD PARA RESPIRAR</span><br/><br/>' : '';
                    vCough              == true ? strSymptoms += positveSymptom + '</span><span style="vertical-align: 4px; margin-left: 10px">TOS</span><br/><br/>' : '';
                    vFever              == true ? strSymptoms += positveSymptom + '<span style="vertical-align: 4px; margin-left: 10px">FIEBRE</span><br/><br/>' : '';
                    vPhlegm             == true ? strSymptoms += positveSymptom + '<span style="vertical-align: 4px; margin-left: 10px">FLEMA</span><br/><br/>' : '';
                    strSymptoms += ''

                $('#idBodySymptoms').html(strSymptoms);
                $('#modalTestDetailsPatient').modal("show")
                //this.FETCH_DETAIL_SYMPTOMS_PATIENT( data ).then( res => {
                //    $('#idNamePatient').text(`${lastname}, ${name}`)
                //    $('#modalTestDetailsPatient').modal("show")
                //}) 
            }
        },
        computed: {
            ...mapState('ingreosALaProvincia', ['income_patients_province_list']),
            ...mapGetters('ingreosALaProvincia', {
                vCode: 'GET_ACTIVE_CODE',
                vDate: 'GET_DATE_RANGE',
                vPatients: 'GET_INCOME_PATIENTS_PROVINCE_LIST',
                dPatients: 'GET_DETAIL_SYMPTOMS_PATIENT'}),

            arrIsEmpty() {
                if(Object.entries(this.vPatients).length === 0) {
                    return true;
                }
                else {
                    return false;
                }
            },

            totalCases() {
                return Object.entries(this.vPatients).length;
            },

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
            income_patients_province_list(newValue, oldValue){
                // Clear the pop-up message 
                this.$toasted.clear()
                //console.log(`Updating from ${oldValue.length} to ${newValue.length}`);
                // Change the title
                let arrData = this.vCode;
                let filterBarChart;
                typeof arrData['patientFrom'] === 'undefined' ? filterBarChart = "" : filterBarChart = " DE " + arrData['patientFrom'];

                

                switch (arrData['code_active']) {
                    case 1:
                        $("#titleListDetail").text("LISTADO DE LAS PERSONAS INGRESADAS A LA PROVINCIA DESDE EL EXTERIOR" + filterBarChart);
                        break;
                    case 2:
                        $("#titleListDetail").text("LISTADO DE LAS PERSONAS INGRESADAS A LA PROVINCIA DESDE EL INTERIOR DEL PAIS" + filterBarChart);
                        break;
                    default:
                        $("#titleListDetail").text("LISTADO DE LAS PERSONAS INGRESADAS A LA PROVINCIA" + filterBarChart);
                        break;
                }

                $('#tableDetallesListado').DataTable().destroy();
                this.$nextTick(() => {
                    $("#tableDetallesListado").DataTable({
                        "retrieve": true,
                        "ordering": false,
                        "language": {
                            "emptyTable": "No hay registros para mostrar."
                        }
                    })
                }) 
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
    min-height: 65px;
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