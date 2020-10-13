<template>
    <div  class="col-xl-4">
        <div>
            <div class="m-portlet">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <h3 class="m-portlet__head-text">
                                Camas para pacientes leves y moderados
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="m-portlet__body">
                    <div class="m-section">
                        <span class="m-section__sub">
                            <center>
                                <h5>Total de camas para pacientes leves y moderados</h5>
                            </center>
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circleBlue">
                                    <h1>{{ GET_TOTALS.leveModerado.total }}</h1>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-portlet">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <h3 class="m-portlet__head-text">
                                Camas pacientes leves y moderados
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="m-portlet__body">

                    <!--begin::Section-->
                    <div class="m-section">
                        <span class="m-section__sub">
                            Totales según el estado
                        </span>
                        <div class="m-section__content">
                            <table width='100%'>
                                <tr>
                                    <td>
                                        <center>
                                            <div class="circleYellow">
                                                <h1>{{ GET_TOTALS.leveModerado.ocupadas }}</h1>
                                            </div><br>
                                            <button v-if="GET_TOTALS.leveModerado.ocupadas == 0"  type="button" class="btn btn-outline-metal" disabled>Ocupadas</button>
                                            <button v-else  @click="fetchCamasOcupadasLevesModerados(1)" type="button" class="btn btn-outline-info">Ocupadas</button>
                                        </center>
                                    </td>
                                    <td>
                                        <center>
                                            <div class="circleGreen">
                                                <h1>{{ GET_TOTALS.leveModerado.libres }}</h1>
                                            </div><br>
                                            <button @click="fetchCamasOcupadasLevesModerados(0)" type="button" class="btn btn-outline-info">Libres</button>
                                        </center>
                                    </td>
                                </tr>
                            </table>
                            
                        </div>
                    </div>
                    <a name="camasOcupadasYLibres"></a>    
                    <!--end::Section-->
                    <div class="m-separator m-separator--dashed"></div>
                    <span class="m-section__sub">
                        Detalles de los estados de las camas por efectores <br><br>
                        <div class="row">
                            <div class="col-md-6">
                                <h5>CAMAS: {{ textoCamasModerado }}</h5>
                            </div>
                            <div class="col-md-6">
                                    <a @click="viewModalHistoryBeds()"  class="btn btn-outline-info m-btn m-btn--icon m-btn--icon-only m-btn--pill float-right">
                                        <i class="fa flaticon-calendar"></i>
                                    </a>
                                    <a style="margin-right: 10px" @click="fetchCamasOcupadasLevesModerados()" class="btn btn-outline-brand m-btn m-btn--icon m-btn--icon-only m-btn--pill float-right">
                                        <i class="fa flaticon-refresh"></i>
                                    </a>
                            </div>
                        </div>
                    </span><br>
                    <div class="m-input-icon m-input-icon--right">
                        <input v-model="filterEfectorModerados" type="text" class="form-control m-input" placeholder="buscar efector..">
                        <span class="m-input-icon__icon m-input-icon__icon--right">
                            <span>
                                <i class="la la-search"></i>
                            </span>
                        </span>
                    </div> <br>
                    <div class="m-section__content table-wrapper">
                        <table class="table table-striped m-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Establecimientos</th>
                                    <th>Total</th>
                                    <th>Ver</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(camasPorEstablecimiento, index) in efectoresModerados" :key="camasPorEstablecimiento.empresaId">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ camasPorEstablecimiento.efector }}</td>
                                    <td>
                                        <center>{{ camasPorEstablecimiento.total }}</center>
                                    </td>
                                    <td>
                                        <a @click="fetchPacientesLevesModerados(camasPorEstablecimiento.empresaId, camasPorEstablecimiento.efector, camasPorEstablecimiento.total)" v-if="verIconoPacientesModerado" class="btn btn-outline-info m-btn m-btn--icon m-btn--icon-only m-btn--pill">
                                            <i class="la la-user"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- BEGIN MODAL LISTADO DE PACIENTES MODERADOS -->
        <div class="modal fade" id="modalPacientesModerados" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Pacientes leves/moderados</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <h5 class="modal-title">
                                    {{ nameHospital }}
                                </h5>
                            </div>
                            <div class="col-lg-6">
                                <h5 class="modal-title float-right">
                                    {{ modalTotalPacientesModerados }} pacientes
                                </h5>
                            </div>
                        </div>
                        <br>
                            <div class="m-section__content tableFixHead table-responsive" style="height: 460px">    
                                <table class="table table-striped m-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <center>
                                                    Ingreso
                                                </center>    
                                            </th>
                                            <th>
                                                <center>
                                                DNI
                                                </center>
                                            </th>
                                            <th>Paciente</th>
                                            <th>Edad</th>
                                            <th>Dirección</th>
                                            <th>Diagnóstico</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="paciente in pacientesLevesModerados" :key="paciente.pacienteId">
                                            <td>
                                                <center>
                                                    {{ paciente.fecha }}<br>{{ paciente.hora }}
                                                </center>
                                            </td>
                                            <td>{{ paciente.numeroDocumento }}</td>
                                            <td>{{ paciente.paciente }}</td>
                                            <td>{{ paciente.edad }}</td>
                                            <td>{{ paciente.domicilio }}</td>
                                            <td>{{ paciente.diagnostico }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>    
                    </div>
                </div>
            </div>
        </div>
        <!-- END MODAL LISTADO DE PACIENTES MODERADOS -->

        <!-- MODAL HISTOTY OCCUPIED BEDS -->
		<div class="modal fade" id="modalHistoryBeds" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Historial de ocupación pacientes leves o moderados</h5>
						<button type="button" class="close" @click="cerrarModalHistoryBeds" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
                            <div class="col-md-2 mt-3">
                                <p>Rango de fechas:</p>
                            </div>
							<div class="col-md-3">
                                <div class="float-left">
                                    <datepicker
                                        @input="onChangeStartDate" 
                                        :disabled="checkFiltroPorDia" 
                                        format="dd/MM/yyyy" 
                                        placeholder="fecha desde" 
                                        :language="es"  
                                        :value="currentDate" 
                                        v-model="fechaDesde" 
                                        :bootstrap-styling="true" 
                                        clear-button>
                                    </datepicker>
                                    <div v-if="showAlertStartDate" class="m--font-danger">No corresponde</div>
                                </div>
							</div>
							<div class="col-md-3">
								<datepicker
                                    @input="onChangeEndDate" 
                                    :disabled="checkFiltroPorDia" 
                                    format="dd/MM/yyyy" 
                                    placeholder="fecha hasta" 
                                    :language="es" 
                                    :value="currentDate" 
                                    v-model="fechaHasta" 
                                    bootstrap-styling 
                                    clear-button>
                                </datepicker>
                                <div v-if="showAlertEndDate" class="m--font-danger">No corresponde</div>
							</div>
							<div class="col-md-4">
								<div class="input-group">
                                    <basic-select 
                                        :options="efectoresParaModalHistorial"
                                        :disabled="disabledBtnSearch"
                                        placeholder="Efector"
                                        :selected-option="itemEfector"
                                        @select="onSelectEfector"
                                        >
                                    </basic-select>    
									<!--select v-model="selectEfector"  class="form-control m-input" id="listadoCboEfectores">
									    <option value="-1">Todos</option>
									    <option v-for="item in efectoresParaModalHistorial" :key="item.hospitalId" :value="item">{{ item.efector }}</option>
								    </select -->
									<div class="input-group-append">
										<button :disabled="disabledBtnSearch" @click="getPacientesPorEfector()" class="btn btn-outline-info m-btn m-btn--icon">
											<span>
												<i class="fa flaticon-search"></i>
											</span>
										</button>
									</div>
								</div>
								
							</div>
						</div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <label class="m-checkbox m-checkbox--state-brand float-right">
                                    <input v-model="checkFiltroPorDia" @change="updateDatesParams" type="checkbox"> Ver sólo los ingresos del día
                                    <span></span>
                                </label>
                            </div>
                        </div>
						<div class="m-separator m-separator--dashed"></div>
						<div class="row">
							<div class="col-md-12">
								<h6>Total de pacientes atendidos: {{ totalPacientesAtendidosModerados }}</h6>
							</div>
						</div>
						<div class="m-separator m-separator--dashed"></div>
						<div>
							<apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
						</div>
						<div class="m-separator m-separator--dashed"></div>
						<div class="row">
							<div class="col-md-6"><h6>{{ nameHospitalModal }}</h6></div>
							<div class="col-md-6"><h6 class="float-right">Cantidad: {{ pacientesParaGraficaModerados.length }}</h6></div>
						</div>
						<div class="m-separator m-separator--dashed"></div>
						<div class="m-section__content table-wrapper">
							<table class="table m-table">
								<thead>
									<tr>
										<th><center>Fecha</center></th>
										<th><center>DNI</center></th>
										<th><center>Pacientes</center></th>
										<th><center>Edad</center></th>
										<th><center>Dirección</center></th>
										<th><center>Diagnóstico Ingreso</center></th>
										<th><center>Diagnóstico Principal</center></th>
										<th v-if="isTodos"><center>Hospital</center></th>
									</tr>
								</thead>
								<tbody>
									<tr :class="[paciente.alta ? 'altaClass' : '', paciente.pase ? 'paseClass' : '']" v-for="(paciente, index) in pacientesParaGraficaModerados" :key="index">
										<td><center>{{ paciente.fecha }} {{ paciente.hora }}</center></td>
										<td><center>{{ paciente.numeroDocumento }}</center></td>
										<td><center>{{ paciente.apellido }}, {{ paciente.nombre }}</center></td>
										<td><center>{{ paciente.edad }}</center></td>
										<td><center>{{ paciente.domicilio }}</center></td>
										<td><center>{{ paciente.diagnosticoIngreso }}</center></td>
										<td><center>{{ paciente.diagnosticoAlta }}</center></td>
										<td v-if="isTodos"><center>{{ paciente.hospital }}</center></td>
									</tr>
								</tbody>
							</table>
						</div>
                        <br>
                        <div class="row col-md-12">
                            <h6 style="margin-right: 10px">Referencias: </h6>
                            <span style="margin-right: 5px" class="m-badge altaClass"></span> <span style="margin-right: 15px">Paciente con alta hospitalaria</span>
                            <span style="margin-right: 5px" class="m-badge paseClass"></span> Paciente con pase a sala común
                        </div>
					</div>
				</div>
			</div>
		</div>
		<!-- MODAL HISTOTY ACCUPIED BEDS -->
    </div>
</template>

<script>

import apexchart from 'vue-apexcharts'
import Datepicker from 'vuejs-datepicker';
import { BasicSelect } from 'vue-search-select'
import { es } from 'vuejs-datepicker/dist/locale'
var esApex = require("apexcharts/dist/locales/es.json")

import { mapActions, mapState, mapGetters} from 'vuex';

export default {
    data () {
        return {
            isTodos: false,
            es: es,
            filterEfector: '',
            filterEfectorModerados: '',
            textoCamasModerado: "TODAS",
            establecimientoLeveModerado:"",
            verIconoPacientesModerado: false,
            verListadoPacientesModerado: false,
            nameHospital: "",
            fechaDesde: new Date(),
            fechaHasta: new Date(),
            currentDate: new Date(),
            nameHospitalModal: 'Efector',
            modalTotalPacientesModerados: 0,
            checkFiltroPorDia: false,
            itemEfector: {
                value: '-1',
                text: 'Todos'
            },
            showAlertStartDate: false,
            showAlertEndDate: false
        }
    },

    created () {
        this.getDatos();
        
        var self = this;
        setInterval(function(){
            self.getDatos();
        }, 60 * 5000);

    },
    
    methods: {
        ...mapActions('totals', ['FETCH_TOTALS']),
        ...mapActions('lists', [
			'FECTH_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS',
            'FECTH_PACIENTES_CAMAS_LEVES_MODERADAS',
            'FETCH_EFECTORES_PARA_MODAL_HISTORIAL',
            'FETCH_PACIENTES_MODERADOS_PARA_GRAFICA',
            'FETCH_PACIENTES_LISTADO_MODERADOS_PARA_GRAFICA'
        ]),
        updateDatesParams(){
            if (this.checkFiltroPorDia) {
                this.fechaDesde = new Date()
                this.fechaHasta = new Date()
            }
        },
        onChangeStartDate(){
            let fechaDesde = this.fechaDesde
            let fechaHasta = this.fechaHasta
            if ( fechaDesde > fechaHasta ) {
                this.showAlertStartDate = true
            } else {
                this.showAlertStartDate = false
                this.showAlertEndDate = false
            }
        },
        onChangeEndDate(){
            let fechaDesde = new Date(this.fechaDesde).getTime().toString()
            fechaDesde = fechaDesde.substring(0, 7);
            let fechaHasta = new Date(this.fechaHasta).getTime().toString()
            fechaHasta = fechaHasta.substring(0, 7);

            if ( parseInt(fechaHasta) < parseInt(fechaDesde) ) {
                this.showAlertEndDate = true
            } else {
                this.showAlertStartDate = false
                this.showAlertEndDate = false
            }
        },
        onSelectEfector (item) {
            this.itemEfector = item
        },
        getDatos() {
            
            this.FETCH_TOTALS()
            this.FECTH_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS()
            this.FETCH_EFECTORES_PARA_MODAL_HISTORIAL()
            this.verIconoPacientesModerado = false

        },
        getPacientesPorEfector() {
            let fechaDesde = `${this.fechaDesde.getFullYear()}/${this.fechaDesde.getMonth() + 1}/${this.fechaDesde.getDate()}`;
            let fechaHasta = `${this.fechaHasta.getFullYear()}/${this.fechaHasta.getMonth() + 1}/${this.fechaHasta.getDate()}`;

            this.nameHospitalModal = this.itemEfector.text
            let efid = this.itemEfector.value;
            let checkFiltroPorDia = this.checkFiltroPorDia
            
            this.isTodos = ( efid == -1 ) ? true : false;
            let efectorId = ( efid == -1 ) ? 0 : this.itemEfector.value

            
            let datos = {
                fechaDesde,
                fechaHasta,
                efectorId,
                checkFiltroPorDia
            } 
            this.FETCH_PACIENTES_MODERADOS_PARA_GRAFICA(datos)
            this.FETCH_PACIENTES_LISTADO_MODERADOS_PARA_GRAFICA(datos)
        },
        fetchCamasOcupadasLevesModerados(ocupadas) {
            var targetOffset = $('a[name="camasOcupadasYLibres"]').offset().top;
            $('html, body').animate( { scrollTop: targetOffset}, 500 );
			if (ocupadas == 1) {
                this.verIconoPacientesModerado = true
				this.textoCamasModerado = "OCUPADAS"
			} else if (ocupadas == 0) {
                this.textoCamasModerado = "LIBRES"
                this.verIconoPacientesModerado = false
                this.verListadoPacientesModerado = false
            } else {
                this.textoCamasModerado = "TODAS"
                this.verIconoPacientesModerado = false
                this.verListadoPacientesModerado = false
            }
            this.FETCH_TOTALS()
			this.FECTH_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS(ocupadas)
        },
        fetchPacientesLevesModerados(hospitalId, nameEfector, totalPacientes) {
            this.verListadoPacientesModerado = true
            this.nameHospital = nameEfector
            this.modalTotalPacientesModerados = totalPacientes
			this.FECTH_PACIENTES_CAMAS_LEVES_MODERADAS(hospitalId)
            $('#modalPacientesModerados').modal('show')
            /*$('html,body').animate({scrollTop: document.body.scrollHeight},"low");
            this.verListadoPacientesModerado = true
			this.nameHospital = nameEfector
			this.FECTH_PACIENTES_CAMAS_LEVES_MODERADAS(hospitalId)*/
        },
        viewModalHistoryBeds(){
            this.fechaDesde = new Date()
            this.fechaHasta = new Date()
            let fechaD = new Date()
            let fechaH = new Date()
            let fechaDesde = `${fechaD.getFullYear()}/${fechaD.getMonth() + 1}/${fechaD.getDate()}`;
            let fechaHasta = `${fechaH.getFullYear()}/${fechaH.getMonth() + 1}/${fechaH.getDate()}`;

            this.nameHospitalModal = 'Efector'
            this.itemEfector = {
                value: '-1',
                text: 'Todos'
            }
            let efid = -1;
            let checkFiltroPorDia = this.checkFiltroPorDia = false
            
            this.isTodos = ( efid == -1 ) ? true : false;
            let efectorId = ( efid == -1 ) ? 0 : this.itemEfector.value

            
            let datos = {
                fechaDesde,
                fechaHasta,
                efectorId,
                checkFiltroPorDia
            } 
            this.FETCH_PACIENTES_MODERADOS_PARA_GRAFICA(datos)
            this.FETCH_PACIENTES_LISTADO_MODERADOS_PARA_GRAFICA(datos)
            $('#modalHistoryBeds').modal('show')
        },
        cerrarModalHistoryBeds(){
            this.showAlertStartDate = false
            this.showAlertEndDate = false
            $('#modalHistoryBeds').modal('hide')
        }
    },

    components: {
        apexchart,
        Datepicker,
        BasicSelect
    },

    computed: {
            ...mapGetters('totals', ['GET_TOTALS']),
            ...mapGetters('lists', {
                camasPorEstablecimientoLeveModerado: 'GET_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS',
                pacientesLevesModerados: 'GET_PACIENTES_LEVES_MODERADOS',
                efectoresParaModalHistorialTmp: 'GET_EFECTORES_PARA_MODAL_HISTORIAL',
                datosParaGraficaModerados: 'GET_DATOS_PARA_PARA_GRAFICA_MODERADOS',
                pacientesParaGraficaModerados: 'GET_PACIENTES_LISTADO_MODERADOS_PARA_GRAFICA',
                totalPacientesAtendidosModerados: 'GET_TOTALPACIENTES_ATENDIDOS_MODERADOS_PARA_GRAFICA',
            }),
            disabledBtnSearch(){
                if ( this.showAlertStartDate || this.showAlertEndDate ) {
                    return 'disabled'
                } else {
                    return null;
                }
            },
            efectoresParaModalHistorial(){
                let efectoresTmp = this.efectoresParaModalHistorialTmp
                let arrEfectores = [ { text: "Todos", value: -1 } ]
                for (const item in efectoresTmp) {
                    arrEfectores.push( { text: efectoresTmp[item].efector, value: efectoresTmp[item].hospitalId } )
                }
                return arrEfectores
            },
            series() {
                let ser = [{
					name: 'Masculino',
					data: this.datosParaGraficaModerados.masculinos
				}, {
					name: 'Femenino',
					data: this.datosParaGraficaModerados.femeninos
				}]
                return ser;
            },
            chartOptions() {
                return {
					colors:['#5dbfe3', '#f589d6',],
					chart: {
						locales: [esApex],
   						defaultLocale: 'es',
						type: 'bar',
						height: 330,
                        stacked: true,
                        events: {
                            click: function(event, chartContext, config) {
                                console.log(config);                                
                            },
                            legendClick: function(chartContext, seriesIndex, config) {
                                console.log(seriesIndex); 
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        offsetY: 0,
                        offsetX: +30,
                        style: {
                        fontSize: '14px',
                        colors: ["#304758"]
                        },
                        formatter: function(value, { seriesIndex, dataPointIndex, w}) {
                        let indices = w.config.series.map((item, i) => i);
                        indices = indices.filter(i => !w.globals.collapsedSeriesIndices.includes(i) && _.get(w.config.series, `${i}.data.${dataPointIndex}`) > 0);
                        if (seriesIndex == _.max(indices))
                            return w.globals.stackedSeriesTotals[dataPointIndex];
                        return '';
                        }
                    },
					plotOptions: {
						bar: {
                            horizontal: true,
                            dataLabels: {
                                position: 'top'
                            } 
						},
					},
					stroke: {
						width: 0,
						colors: ['#fff']
					},
					xaxis: {
						categories: this.datosParaGraficaModerados.hospitales,
					},
					yaxis: {
						title: {
							text: undefined
						},
					},
					tooltip: {
						y: {
							formatter: function (val) {
							return val + " pacientes"
							}
                        },
                        
					},
					fill: {
						opacity: 1
					},
					legend: {
						position: 'top',
						horizontalAlign: 'left',
						offsetX: 40
					},
				}
            },
            efectoresModerados () {
                return this.filterEfectorModerados
                    ? this.camasPorEstablecimientoLeveModerado.filter(item => item.efector.toLowerCase().includes(this.filterEfectorModerados.toLowerCase()))
                    : this.camasPorEstablecimientoLeveModerado
            },
        },
}
</script>

<style  scoped>
.altaClass{
    background-color:#baffad
}
.paseClass{
    background-color:#faffad
}
.circleYellow
    {
		height: 100px;
		width: 100px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
		background: #ffe285;

    }
.circleGreen
    {
		height: 100px;
		width: 100px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
		background: #9df3a4

    }

	.circlePurple
    {
		height: 100px;
		width: 100px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
		background: #decff7

    }

.circleBlue
    {
		height: 100px;
		width: 100px;
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-radius: 50%;
		background: #bad6ff

    }
.tableFixHead { overflow-y: auto; height: 100px;  overflow-x: auto;}
.tableFixHead thead th { position: sticky; top: 0; }

/* Just common table stuff. Really. */
.tableFixHead table  { border-collapse: collapse; width: 100%; }
.tableFixHead table th { background:#eee }

.table-wrapper
{
    height: 300px;
    overflow: auto;
}

.table-wrapper-efectores
{
    height: 830px;
    overflow: auto;
}
.middle { margin-bottom:2px; }
.ui.fluid.dropdown{
    display: block;
    width:256px;
    min-width:0
}
.errorStartDate{
        border-color: #a94442;
    }
    
</style>