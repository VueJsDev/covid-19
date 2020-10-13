<template>
  <div class="">
		<div class="m-grid m-grid--hor m-grid--root m-page">
			<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
				<button class="m-aside-left-close  m-aside-left-close--skin-dark " id="m_aside_left_close_btn">
					<i class="la la-close"></i>
				</button>
				<div class="m-grid__item m-grid__item--fluid m-wrapper">
					<div class="m-subheader ">
						<div class="d-flex align-items-center">
							<div class="mr-auto">
								<h3 class="m-subheader__title m-subheader__title--separator">Camas Covid19</h3>
								<ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
									<li class="m-nav__item m-nav__item--home">
										<a href="#" class="m-nav__link m-nav__link--icon">
											<i class="m-nav__link-icon la la-home"></i>
										</a>
									</li>
									<li class="m-nav__separator">-</li>
									<li class="m-nav__item">
										<a href="" class="m-nav__link">
											<span class="m-nav__link-text">Inicio</span>
										</a>
									</li>
									<li class="m-nav__separator">-</li>
									<li class="m-nav__item">
										<a href="" class="m-nav__link">
											<span class="m-nav__link-text">Covid</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="m-content">
						<!-- div class="form-group m-form__group row">
							<label class="col-form-label col-sm-1"><b>Filtrar por fecha</b></label>
							<div class="col-sm-4">
								<div class="row">
									<div class="col-sm-6">
										<input  type="text" class="form-control" id="m_datepicker_1" placeholder="Elejir una fecha" />
									</div>
									<div class="col-sm-2">
										<a @click="filterDate" class="btn btn-accent m-btn m-btn--icon">
											<span>
												<i class="la la-search"></i>
												<span>Buscar</span>
											</span>
										</a>
									</div>
								</div>
							</div>
						</div -->
						<div class="row">
							<div class="col-xl-4">
								<div class="m-portlet">
									<div class="m-portlet__head">
										<div class="m-portlet__head-caption">
											<div class="m-portlet__head-title">
												<h3 class="m-portlet__head-text">
													Camas Disponibles
												</h3>
											</div>
										</div>
									</div>
									<div class="m-portlet__body">
										<div class="m-section">
											<span class="m-section__sub">
												<center>
													<h5>Total de camas de la provincia</h5>
												</center>
											</span>
											<div class="m-section__content">
												<center>
													<div class="circleBlue">
														<h1>{{ GET_TOTALS.totalCamas }}</h1>
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
													Detalles de las camas por efectores de salud
												</h3>
											</div>
										</div>
									</div>
									<div class="m-portlet__body">

										<!--begin::Section-->
										<div class="m-section">
											<div class="m-input-icon m-input-icon--right">
												<input v-model="filterEfector" type="text" class="form-control m-input" placeholder="buscar efector..">
												<span class="m-input-icon__icon m-input-icon__icon--right">
													<span>
														<i class="la la-search"></i>
													</span>
												</span>
											</div> <br>
											<div class="m-section__content table-wrapper-efectores">
												<table class="table table-striped m-table">
													<thead>
														<tr>
															<th>#</th>
															<th>Establecimientos</th>
															<th>
																<center>
																	Cantidad
																</center>
															</th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="(camasEstablecimiento, index) in efectores" :key="camasEstablecimiento.establecimiento">
															<th scope="row">{{ index + 1 }}</th>
															<td>{{ camasEstablecimiento.efector }}</td>
															<td>
																<center>
																	{{ camasEstablecimiento.total }}
																</center>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>

										<!--end::Section-->
										<div class="m-separator m-separator--dashed"></div>
									</div>
								</div>

								<!--end::Portlet-->
							</div>
							
							<div class="col-xl-4">
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
														<th>Cantidad</th>
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
															<a @click="fetchPacientesLevesModerados(camasPorEstablecimiento.empresaId, camasPorEstablecimiento.efector)" v-if="verIconoPacientesModerado" class="btn btn-outline-info m-btn m-btn--icon m-btn--icon-only m-btn--pill">
																<i class="la la-user"></i>
															</a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<template v-if="verIconoPacientesModerado">
											<div class="m-separator m-separator--dashed"></div>
											<span class="m-section__sub">
												Detalles de los pacientes según los efectores seleccionado: <br><br>
												<h5>{{ nameHospital }}</h5>
											</span>

											<div class="m-section__content">
												<table class="table table-striped m-table">
													<thead>
														<tr>
															<th>DNI</th>
															<th>Paciente</th>
															<th>Edad</th>
															<th>Dirección</th>
															<th>Diagnóstico</th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="paciente in pacientesLevesModerados" :key="paciente.pacienteId">
															<td>{{ paciente.numeroDocumento }}</td>
															<td>{{ paciente.paciente }}</td>
															<td>{{ paciente.edad }}</td>
															<td>{{ paciente.domicilio }}</td>
															<td>{{ paciente.diagnostico }}</td>
														</tr>
													</tbody>
												</table>
											</div>
										</template>
									</div>
								</div>

								<!--end::Portlet-->
							</div>
							
							<div class="col-xl-4">
								<div class="m-portlet">
									<div class="m-portlet__head">
										<div class="m-portlet__head-caption">
											<div class="m-portlet__head-title">
												<h3 class="m-portlet__head-text">
													Camas pacientes críticos
												</h3>
											</div>
										</div>
									</div>
									<div class="m-portlet__body">
										<div class="m-section">
											<span class="m-section__sub">
												<center>
													<h5>Total de camas para pacientes críticos</h5>
												</center>
											</span>
											<div class="m-section__content">
												<center>
													<div class="circleBlue">
														<h1>{{ GET_TOTALS.totalCriticos }}</h1>
													</div>
												</center>
											</div>
										</div>
									</div>
								</div>

								<!--end::Portlet-->

								<!--begin::Portlet-->
								<div class="m-portlet">
									<div class="m-portlet__head">
										<div class="m-portlet__head-caption">
											<div class="m-portlet__head-title">
												<h3 class="m-portlet__head-text">
													Camas pacientes críticos
												</h3>
											</div>
										</div>
									</div>
									<div class="m-portlet__body">

										<div class="m-section">
											<span class="m-section__sub">
												<div class="row">
													<div class="col-md-6">
														<h6>Total de camas sin respirador</h6>
													</div>
													<div class="col-md-6">
														<h6 class="float-right">{{ GET_TOTALS.criticoSinRespirador.total }}</h6>
													</div>
												</div>
											</span>
											<div class="m-separator m-separator--dashed"></div>
											<div class="m-section__content">
												<table width='100%'>
													<tr>
														<td>
															<center>
																<div class="circleYellow">
																	<h1>{{ GET_TOTALS.criticoSinRespirador.ocupadas }}</h1>
																</div><br>
																<button @click="fetchCamasOcupadasCriticos(1, 0)" type="button" class="btn btn-outline-info">Ocupados</button>
															</center>
														</td>
														<td>
															<center>
																<div class="circleGreen">
																	<h1>{{ GET_TOTALS.criticoSinRespirador.libres }}</h1>
																</div><br>
																<button @click="fetchCamasOcupadasCriticos(0, 0)" type="button" class="btn btn-outline-info">Libres</button>
															</center>
														</td>
													</tr>
												</table>
											</div>



											<div class="m-separator m-separator--dashed"></div>
											<span class="m-section__sub">
												<div class="row">
													<div class="col-md-6">
														<h6>Total de camas con respiradores</h6>
													</div>
													<div class="col-md-6">
														<h6 class="float-right">{{ GET_TOTALS.criticoConRespirador.total }}</h6>
													</div>
												</div>
											</span>
											<div class="m-separator m-separator--dashed"></div>
											<div class="m-section__content">
												<table width='100%'>
													<tr>
														<td>
															<center>
																<div class="circleYellow">
																	<h1>{{ GET_TOTALS.criticoConRespirador.ocupadas }}</h1>
																</div><br>
																<button @click="fetchCamasOcupadasCriticos(1, 1)" type="button" class="btn btn-outline-info">Ocupados</button>
															</center>
														</td>
														<td>
															<center>
																<div class="circleGreen">
																	<h1>{{ GET_TOTALS.criticoConRespirador.libres }}</h1>
																</div><br>
																<button @click="fetchCamasOcupadasCriticos(0, 1)" type="button" class="btn btn-outline-info">Libres</button>
															</center>
														</td>
													</tr>
												</table>
											</div>
										</div>

										<!--end::Section-->
										<div class="m-separator m-separator--dashed"></div>
										<span class="m-section__sub">
											Detalles de los estados de las camas por efectores <br><br>
											<div class="row">
												<div class="col-md-6">
													<h5>CAMAS: {{ textoCamasCriticas }}</h5>
												</div>
												<div class="col-md-6">
													<a @click="fetchCamasOcupadasCriticos()" class="btn btn-outline-brand m-btn m-btn--icon m-btn--icon-only m-btn--pill float-right">
														<i class="fa flaticon-refresh"></i>
													</a>
												</div>
											</div>
										</span><br>
										<div class="m-input-icon m-input-icon--right">
											<input v-model="filterEfectorCriticos" type="text" class="form-control m-input" placeholder="buscar efector..">
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
														<th>Cantidad</th>
														<th>Ver</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(camasPorEstablecimiento, index) in efectoresCriticos" :key="camasPorEstablecimiento.empresaId">
														<th scope="row">{{ index + 1 }}</th>
														<td>{{ camasPorEstablecimiento.efector }}</td>
														<td>{{ camasPorEstablecimiento.total }}</td>
														<td>
															<a v-if="verIconoPacientesCritico" @click="fetchPacientesCriticosF(camasPorEstablecimiento.empresaId, camasPorEstablecimiento.efector)" class="btn btn-outline-info m-btn m-btn--icon m-btn--icon-only m-btn--pill">
																<i class="la la-user"></i>
															</a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
										<template v-if="verIconoPacientesCritico">
											<div class="m-separator m-separator--dashed"></div>
											<span class="m-section__sub">
												Detalles de los pacientes según los efectores seleccionado: <br><br>
												<h5>{{ nameHospitalCritico }}</h5>
											</span>

											<div class="m-section__content">
												
												<table class="table table-striped m-table">
													<thead>
														<tr>
															<th>DNI</th>
															<th>Paciente</th>
															<th>Edad</th>
															<th>Dirección</th>
														</tr>
													</thead>
													<tbody>
														<tr v-for="paciente in pacientesCriticos" :key="paciente.pacienteId">
															<td>{{ paciente.numeroDocumento }}</td>
															<td>{{ paciente.paciente }}</td>
															<td>{{ paciente.edad }}</td>
															<td>{{ paciente.domicilio }}</td>
															<td>{{ paciente.diagnostico }}</td>
														</tr>
													</tbody>
												</table>
											</div>
										</template>
									</div>
								</div>

								<!--end::Portlet-->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Scroll /-->
		<!-- MODAL HISTOTY OCCUPIED BEDS -->
		<div class="modal fade" id="modalHistoryBeds" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Historial de ocupación</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-3">
								<input  type="text" class="form-control" id="m_datepicker_1" placeholder="fecha desde.." />
							</div>
							<div class="col-md-3">
								<input  type="text" class="form-control" id="m_datepicker_1" placeholder="fecha hasta.." />
							</div>
							<div class="col-md-6">
								<div class="input-group">
									<select class="form-control m-input" id="exampleSelect1">
									<option value="0">Efectores</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
									<div class="input-group-append">
										<a href="#" class="btn btn-outline-info m-btn m-btn--icon">
											<span>
												<i class="fa flaticon-search"></i>
											</span>
										</a>
									</div>
								</div>
								
							</div>
						</div>
						<div class="m-separator m-separator--dashed"></div>
						<div class="row">
							<div class="col-md-12">
								<h6>Total de pacientes atendidos: 330</h6>
							</div>
						</div>
						<div class="m-separator m-separator--dashed"></div>
						<div>
							<apexchart type="bar" height="350" :options="charSexo.chartOptions" :series="charSexo.series"></apexchart>
						</div>
						<div class="m-separator m-separator--dashed"></div>
						<div class="row">
							<div class="col-md-6"><h6>Hospital Distrital N° 8</h6></div>
							<div class="col-md-6"><h6 class="float-right">Cantidad: 170</h6></div>
						</div>
						<div class="m-separator m-separator--dashed"></div>
						<div class="m-section__content table-wrapper">
							<table class="table table-striped m-table">
								<thead>
									<tr>
										<th><center>Fecha</center></th>
										<th><center>DNI</center></th>
										<th><center>Pacientes</center></th>
										<th><center>Edad</center></th>
										<th><center>Dirección</center></th>
										<th><center>Diagnóstico Ingreso</center></th>
										<th><center>Diagnóstico Alta</center></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><center>15/05/2020</center></td>
										<td><center>30256425</center></td>
										<td><center>Aguirre Jonathan</center></td>
										<td><center>38</center></td>
										<td><center>B° Porvenir - Somacal 1265</center></td>
										<td><center>Z038 Sospecha COVID-19</center></td>
										<td><center>Z038 Sospecha COVID-19</center></td>
									</tr>
									<tr>
										<td><center>15/05/2020</center></td>
										<td><center>30256425</center></td>
										<td><center>Aguirre Jonathan</center></td>
										<td><center>38</center></td>
										<td><center>B° Porvenir - Somacal 1265</center></td>
										<td><center>Z038 Sospecha COVID-19</center></td>
										<td><center>Z038 Sospecha COVID-19</center></td>
									</tr>
								</tbody>
							</table>
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
  var es = require("apexcharts/dist/locales/es.json")

  import { mapActions, mapState, mapGetters} from 'vuex';

  export default {
	name: 'Home',
	data: () => ({
			charSexo: {
				chartOptions: {
					colors:['#5dbfe3', '#f589d6',],
					chart: {
						locales: [es],
   						defaultLocale: 'es',
						type: 'bar',
						height: 450,
						stacked: true,
					},
					plotOptions: {
						bar: {
							horizontal: true, 
						},
					},
					stroke: {
						width: 0,
						colors: ['#fff']
					},
					xaxis: {
						categories: ['Hospital Distrital Sanitario N° 8', 'Hospital Ibarreta', 'Hospital Alta Complejidad', 'Hospital las Lomitas', 'C.R. Clorinda'],
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
						}
					},
					fill: {
						opacity: 1
					},
					legend: {
						position: 'top',
						horizontalAlign: 'left',
						offsetX: 40
					},
				},
				series: [{
					name: 'Masculino',
					data: [44, 55, 41, 37, 22]
				}, {
					name: 'Femenino',
					data: [53, 32, 33, 52, 13]
				}],
			},
      verIconoPacientesModerado: false,
			verIconoPacientesCritico: false,
			textoCamasModerado: "TODAS",
			textoCamasCriticas: "TODAS",
			nameHospital: "",
			nameHospitalCritico:"",
			establecimientoLeveModerado:"",
			respirador_model: 0,
			filterEfector: '',
			filterEfectorModerados: '',
			filterEfectorCriticos: ''
        }),
    components: {
	    apexchart
	  },
	beforeCreate () {
		if (!localStorage.getItem('login')) {
			this.$router.push({ path: '/' })
		}
	},
	mounted () {
		if (localStorage.getItem('reloaded')) {
			localStorage.removeItem('reloaded');
		} else {
			localStorage.setItem('reloaded', '1');
			location.reload();
		}
	},
	created () {
		this.getDatos();
	},
	methods: {
		...mapActions('totals', ['FETCH_TOTALS']),
		...mapActions('lists', [
			'FETCH_CAMAS_ESTABLECIMIENTOS', 
			'FECTH_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS', 
			'FECTH_CAMAS_ESTABLECIMIENTOS_CRITICOS',
			'FECTH_PACIENTES_CAMAS_LEVES_MODERADAS',
			'FECTH_PACIENTES_CAMAS_CRITICOS'
		]),
		getDatos() {
			this.FETCH_TOTALS()
			this.FETCH_CAMAS_ESTABLECIMIENTOS()
			this.FECTH_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS()
			this.FECTH_CAMAS_ESTABLECIMIENTOS_CRITICOS()
		},
		filterDate() {
			let dateFil = $('#m_datepicker_1').val();
			console.log(`FECHA: ${dateFil}`);			
		},
		fetchCamasOcupadasLevesModerados(ocupadas) {
			$('html, body').animate({
                scrollTop: $(".middle").offset().top
            }, 500);
			if (ocupadas == 1) {
				this.textoCamasModerado = "OCUPADAS"
				this.verIconoPacientesModerado = true
			} else {
				this.textoCamasModerado = "LIBRES"
				this.verIconoPacientesModerado = false
			}
			this.FECTH_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS(ocupadas)
		},
		fetchCamasOcupadasCriticos(ocupadas, respirador) {
			if (respirador) {
				this.respirador_model = respirador;
			}
			$('html, body').animate({
                scrollTop: $(".middle").offset().top
            }, 500);
			if (ocupadas == 1) {
				this.textoCamasCriticas = "OCUPADAS"
				this.verIconoPacientesCritico = true
			} else {
				this.textoCamasCriticas = "LIBRES"
				this.verIconoPacientesCritico = false
			}
			let datos = { ocupadas:  ocupadas, respirador: respirador };
			this.FECTH_CAMAS_ESTABLECIMIENTOS_CRITICOS(datos)
		},
		fetchPacientesLevesModerados(hospitalId, nameEfector) {
			this.nameHospital = nameEfector
			this.FECTH_PACIENTES_CAMAS_LEVES_MODERADAS(hospitalId)
		},
		fetchPacientesCriticosF(hospitalId, nameEfector) {
			this.nameHospitalCritico = nameEfector
			var data = {hospitalId: hospitalId, respirador: this.respirador_model}
			this.FECTH_PACIENTES_CAMAS_CRITICOS(data)
		},
		viewModalHistoryBeds(){
			$('#modalHistoryBeds').modal('show')
		}
	},
	computed: {
		...mapGetters('totals', ['GET_TOTALS']),
		...mapGetters('lists', {
			camasPorEstablecimiento: 'GET_CAMAS_ESTABLECIMIENTOS',
			camasPorEstablecimientoLeveModerado: 'GET_CAMAS_ESTABLECIMIENTOS_LEVES_MODERADOS',
			camasPorEstablecimientoCriticos: 'GET_CAMAS_ESTABLECIMIENTOS_CRITICOS',
			pacientesLevesModerados: 'GET_PACIENTES_LEVES_MODERADOS',
			pacientesCriticos: 'GET_PACIENTES_CRITICOS',
		}),
		efectores () {
			return this.filterEfector
				? this.camasPorEstablecimiento.filter(item => item.efector.includes(this.filterEfector))
				: this.camasPorEstablecimiento
		},
		efectoresModerados () {
			return this.filterEfectorModerados
				? this.camasPorEstablecimientoLeveModerado.filter(item => item.efector.includes(this.filterEfectorModerados))
				: this.camasPorEstablecimientoLeveModerado
		},
		efectoresCriticos () {
			return this.filterEfectorCriticos
				? this.camasPorEstablecimientoCriticos.filter(item => item.efector.includes(this.filterEfectorCriticos))
				: this.camasPorEstablecimientoCriticos
		}
	}
  }
</script>
<style  scoped>
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

.table-wrapper
{
    height: 250px;
    overflow: auto;
}

.table-wrapper-efectores
{
    height: 830px;
    overflow: auto;
}
.middle { margin-bottom:2px; }	
</style>