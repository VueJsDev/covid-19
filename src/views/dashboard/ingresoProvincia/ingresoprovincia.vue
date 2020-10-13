<template>
<div class="m-grid__item m-grid__item--fluid m-wrapper">
    <encabezado-mobile></encabezado-mobile>
    <div class="row"> <!-- Date filter -->
        <div class="col-md-12">
            <div class="m-portlet">
                <div class="m-portlet__body">
                    <div class="form-group m-form__group row">
                        <div class="container-fluid">
                            <div class="form-group m-form__group row row2">
                                <div class="col-sm-4 col-md-2 lbDate">
                                    <label class="col-form-label"><strong>Fecha Desde</strong></label>
                                </div>
                                <div class="col-sm-4 col-md-2">
                                    <datepicker format="dd/MM/yyyy" 
                                        placeholder="fecha desde" 
                                        @selected="checkDateSelected($event, 'from')"
                                        :language="es"  
                                        :value="currentDate" 
                                        :disabledDates="disabledDates"
                                        v-model="dateFrom" 
                                        bootstrap-styling clear-button>
                                    </datepicker>
                                </div>
                                <div class="col-sm-4 col-md-2 lbDate">
                                    <label class="col-form-label"><strong>Fecha Hasta</strong></label>
                                </div>
                                <div class="col-sm-4 col-md-2">
                                    <datepicker format="dd/MM/yyyy" 
                                        placeholder="fecha hasta" 
                                        @selected="checkDateSelected($event, 'to')"
                                        :language="es"  
                                        :value="currentDate" 
                                        :disabledDates="disabledDates"
                                        v-model="dateTo" 
                                        bootstrap-styling clear-button>
                                    </datepicker>
                                </div>
                                <div class="col-sm-4 col-md-4">
                                    <a 
                                        @click="getValueByDateBtn()" 
                                        class="btn m-btn--pill btn-outline-warning"
                                        style="width:100px;">
                                        <span>
                                            <i class="fa flaticon-search"></i>
                                            Buscar
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row"> <!-- Totals -->
        <div class="col-sm-6 col-md-4"> <!-- Income to province total -->
            <ingresos-provincia-total></ingresos-provincia-total>
        </div>
        <div class="col-sm-6 col-md-4"> <!-- Income to aboard -->
            <ingresos-exterior-total></ingresos-exterior-total>
        </div>
        <div class="col-sm-6 col-md-4"> <!-- Income to within country -->
            <ingresos-interior-pais-total></ingresos-interior-pais-total>
        </div>
    </div>
    <div id="barChart" class="row"> <!-- Graphics -->
        <div class="col-sm-12 col-md-8">
            <grafico-ingresos-provincia></grafico-ingresos-provincia>
        </div>
        <div class="col-sm-12 col-md-4">
            <grafico-ingresos-sexo></grafico-ingresos-sexo>
        </div>
    </div>
    <div id="listPatient" class="row"> <!-- Details of patients -->
        <div class="col-sm-12 col-md-12">
            <ingreso-detalle-listado></ingreso-detalle-listado>
        </div>
    </div>
    <!-- DETALLE DE PACIENTES TEST -->
    <div class="modal fade" id="modalWindow" tabindex="-1" role="dialog" aria-labelledby="idNamePatient" aria-hidden="true">
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
                                    <span style="margin-left: 45px">ERROR EN EL RANGO DE FECHAS</span>
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
                            <label for="txtDate"
                                class="col-sm-12 col-form-label">
                                La fecha hasta debe ser posterior a la fecha Desde
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>

</template>

<script>
    import apexchart from 'vue-apexcharts'
    var esApex = require("apexcharts/dist/locales/es.json")

    import Datepicker from 'vuejs-datepicker'
    import {es} from 'vuejs-datepicker/dist/locale'
    
    import { mapActions, mapState, mapGetters} from 'vuex';

    // Modules //
    import encabezadoMobile from '../../../components/camas/encabezado_mobile'
    import ingresosProvinciaTotal from './ingresosProvinciaTotal'
    import ingresosExteriorTotal from './ingresosExteriorTotal'
    import ingresosInteriorPaisTotal from './ingresosInteriorPaisTotal'
    import graficoIngresosProvincia from './graficoIngresosProvincia'
    import graficoIngresosSexo from './graficoIngresosSexo'
    import ingresoDetalleListado from './ingresoDetalleListado'

    export default {

        data() {
            return {
                dateFrom: new Date(),
                dateTo: new Date(),
                es: es,
                currentDate: new Date(),
                selectOpcion: 0,
                selectOculto: true,
                polling: null,
                disabledDates: {
                    from: new Date(Date.now())
                }
            }
        },
        
        beforeDestroy () {
            clearInterval(this.polling)
        },
        
        created () {
            this.pollData()
        },

        components: {
            encabezadoMobile,
            ingresosProvinciaTotal,
            ingresosExteriorTotal,
            ingresosInteriorPaisTotal,
            graficoIngresosProvincia,
            graficoIngresosSexo,
            ingresoDetalleListado,
            Datepicker,
            apexchart
        },

        beforeCreate () {
            if (!localStorage.getItem('user')) {
                //this.$router.push({ path: '/login' })
                this.$router.push({ path: '/login' }).catch(()=>{});
                //this.$router.push({ path: '/' })
            }
            let permissions = JSON.parse(localStorage.getItem("permissions"));
            let perm = false;
            permissions.forEach(permission => {
                if (permission.code == 'ingresos') {
                    perm = true
                }
            })
            if (!perm) {
                this.$router.push({ path: '/404' }).catch(()=>{});
            }
        },

        mounted () {
            if (localStorage.getItem('reloaded')) {
                localStorage.removeItem('reloaded');
            } else {
                localStorage.setItem('reloaded', '1');
                location.reload();
            }

            this.fetchInitialValues();
            
            /*
            var self = this;
            setInterval(function(){
                self.fetchInitialValues();
            }, 60 * 5000);
            */
        },

        

        methods: {
            ...mapActions('ingreosALaProvincia', [
                'FETCH_TOTALS', 
                'FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE', 
                'FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX',
                'FETCH_INCOME_PATIENTS_PROVINCE_LIST',
                'FETCH_DATE_RANGE', 
                'FETCH_ACTIVE_CODE'
            ]),

            pollData () {
                this.polling = setInterval(() => {
                    let arrDate = this.GET_DATE_RANGE;
                    let arrCode = this.GET_ACTIVE_CODE;
                    let code_active = arrCode['code_active'];
                    //console.log("ExteriorTotal -> DateFrom: " + arrDate['dateFrom'] + ' and dateTo: ' + arrDate['dateTo']);

                    let dateF = new Date(arrDate['dateFrom']);
                    let dateT = new Date(arrDate['dateTo']);
                    
                    let dateFrom = `${dateF.getFullYear()}/${dateF.getMonth() + 1}/${dateF.getDate()}`;
                    let dateTo   = `${dateT.getFullYear()}/${dateT.getMonth() + 1}/${dateT.getDate()}`;

                    let data = {
                            dateFrom,
                            dateTo,
                            code_active
                        }

                    this.FETCH_TOTALS(data),
                    this.FETCH_ACTIVE_CODE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX(data),
                    this.FETCH_INCOME_PATIENTS_PROVINCE_LIST(data);
                    //console.log("update from pollData");
                }, 5000)
            },

            fetchInitialValues(){
                let dateF = this.dateFrom;
                let dateT = this.dateTo;

                // I load the code active
                let arrCode = this.GET_ACTIVE_CODE;
                let code_active = 0;
                isNaN(Intl.NumberFormat("de-DE").format(arrCode['code_active'])) 
                    ? 0 
                    : arrCode['code_active'];
                //console.log("initial values -> " +  code_active);

                let dateFrom = `${dateF.getFullYear()}/${dateF.getMonth() + 1}/${dateF.getDate()}`;
                let dateTo   = `${dateT.getFullYear()}/${dateT.getMonth() + 1}/${dateT.getDate()}`;

                let data = {
                    dateFrom,
                    dateTo,
                    code_active
                }

                this.FETCH_TOTALS(data),
                this.FETCH_DATE_RANGE(data),
                this.FETCH_ACTIVE_CODE(data)
            },
            
            checkDateSelected: function(myDate, myFrom) {
                // Initializing the pop-up message 
                this.$toasted.show('Actualizando lista de ingresos...', {
                        icon : 'fa-hourglass-half ',
                        theme: 'outline',
                        position: 'bottom-right'
                })
                
                let dateF = this.dateFrom;
                let dateT = this.dateTo;
                let arrCode = [];

                // I load the code active
                arrCode = this.GET_ACTIVE_CODE;
                let code_active = arrCode['code_active'];

                // I load the correct values
                myFrom === 'from' ? dateF = myDate : dateT = myDate;

                let dateFrom = `${dateF.getFullYear()}/${dateF.getMonth() + 1}/${dateF.getDate()}`;
                let dateTo   = `${dateT.getFullYear()}/${dateT.getMonth() + 1}/${dateT.getDate()}`;
                
                if (Date.parse(dateFrom) > Date.parse(dateTo)) {
                    // Something wrong
                    //$('#modalWindow').modal("show")
                    swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'La fecha hasta debe ser posterior a la fecha Desde.',
                        timer: 3000
                    });
                }
                else {
                    let data = {
                        dateFrom,
                        dateTo,
                        code_active
                    }

                    this.FETCH_TOTALS(data);
                    this.FETCH_ACTIVE_CODE(data);
                    this.FETCH_DATE_RANGE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX(data),
                    this.FETCH_INCOME_PATIENTS_PROVINCE_LIST(data)
                }
            },

            getValueByDateBtn(){
                //console.log("### UPDATE PAGE BY DATE ###")
                let dateF = this.dateFrom;
                let dateT = this.dateTo;
                let arrCode = [];

                // I load the code active
                arrCode = this.GET_ACTIVE_CODE;
                let code_active = arrCode['code_active'];
                
                let dateFrom = `${dateF.getFullYear()}/${dateF.getMonth() + 1}/${dateF.getDate()}`;
                let dateTo   = `${dateT.getFullYear()}/${dateT.getMonth() + 1}/${dateT.getDate()}`;
                
                if (Date.parse(dateFrom) > Date.parse(dateTo)) {
                    $('#modalWindow').modal("show")
                }
                else {
                    let data = {
                        dateFrom,
                        dateTo,
                        code_active
                    }

                    this.FETCH_TOTALS(data);
                    this.FETCH_DATE_RANGE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX(data),
                    this.FETCH_INCOME_PATIENTS_PROVINCE_LIST(data)
                }
            },
        },

        computed: {
            ...mapGetters('ingreosALaProvincia', [
                'GET_TOTALS', 
                'GET_ACTIVE_CODE', 
                'GET_DATE_RANGE'
            ]),
            computedTotalIncomeWithinCountry(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.recuperados)) 
                    ? '-' 
                    : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.recuperados);
            }
        }
    }
</script>

<style scoped>
.lbDate {
    text-align: right;
}
.header_color {
    background-color: #E0E0E0;
}
.circleBlue {
    height: 80px;
    width: 80px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    background: #bad6ff
}
.circleGreen {
    height: 80px;
    width: 80px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    background: #cdffcf
}
.circleViolet {
    height: 80px;
    width: 80px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    background: #b4a7d6
}
.alturaFija {
    height: 25px;
}
</style>