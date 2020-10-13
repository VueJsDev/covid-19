<template>
    <div class="m-portlet">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon m--hide">
                        <i class="la la-gear"></i>
                    </span>
                    <h3 class="m-portlet__head-text">
                        INGRESOS A LA PROVINICA
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="m-section">
                <div class="row">
                    <div class="col-md-12">
                        <span class="m-section__sub">
                            <center>
                                <div class="alturaFija">
                                    <h6>Total de ingresos a la provincia</h6>
                                </div>
                            </center>
                        </span>
                        <div class="m-section__content">
                            <center>
                                <div class="circleBlue">
                                    <h2>
                                        {{ computedTotalIncomeProvince }}
                                    </h2>
                                </div>
                                <br>
                                <button 
                                    @click="updateScreen(0)"
                                    type="button" 
                                    class="btn m-btn--pill btn-outline-info" >
                                    Ver detalles
                                </button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { mapActions, mapGetters} from 'vuex';
    
    export default {
        

        components: {
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

            updateScreen(code){
                //console.log("### UPDATE PAGE BY DATE AND CODE BY INCOME PROVINCE ###");

                if(this.GET_TOTALS.TotalIngresos === 0) return;

                // Initializing the pop-up message 
                this.$toasted.show('Actualizando lista de pacientes...', {
                        icon : 'fa-hourglass-half ',
                        theme: 'outline',
                        position: 'bottom-right'
                })

                /*
                let barChart = document.getElementById('barChart');
                barChart.scrollIntoView({block: "start", behavior: "smooth"});
                
                // Fixing position
                let positionY = window.scrollY - 75;
                window.scroll({ top: positionY, left: 0, behavior: 'smooth' });
                */
                var targetOffset = $('#barChart').offset().top - 75;
                $('html, body').animate( { scrollTop: targetOffset}, 500 );

                let arrDate = this.GET_DATE_RANGE;
                let code_active = code;
                //console.log("ExteriorTotal -> DateFrom: " + arrDate['dateFrom'] + ' and dateTo: ' + arrDate['dateTo']);

                let dateF = new Date(arrDate['dateFrom']);
                let dateT = new Date(arrDate['dateTo']);
                
                let dateFrom = `${dateF.getFullYear()}/${dateF.getMonth() + 1}/${dateF.getDate()}`;
                let dateTo   = `${dateT.getFullYear()}/${dateT.getMonth() + 1}/${dateT.getDate()}`;

                if (Date.parse(dateFrom) > Date.parse(dateTo)) {
                    //alert("La fecha hasta debe ser posterior a la fecha Desde");
                    $('#modalWindow').modal("show")
                }
                else  {
                    let data = {
                            dateFrom,
                            dateTo,
                            code_active
                        }

                    this.FETCH_TOTALS(data),
                    this.FETCH_ACTIVE_CODE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_ZONE(data),
                    this.FETCH_INCOME_PROVINCE_GRAPHIC_BY_SEX(data),
                    this.FETCH_INCOME_PATIENTS_PROVINCE_LIST(data)
                }
                
            },
        },

        computed: {
            ...mapGetters('ingreosALaProvincia', [
                'GET_TOTALS', 'GET_DATE_RANGE']),

            computedTotalIncomeProvince(){
                return isNaN(Intl.NumberFormat("de-DE").format(this.GET_TOTALS.TotalIngresos)) 
                    ? '-' 
                    : Intl.NumberFormat("de-DE").format(this.GET_TOTALS.TotalIngresos);
            },

            isDisabled() {
                if(this.GET_TOTALS.TotalIngresos === 0 || this.GET_TOTALS.TotalIngresos == "-") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }

    }
</script>

<style scoped>
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
    color: white;
    background: #36a3f7
}
.alturaFija {
    height: 25px;
}
.myHeaderTitleList {
    word-break: break-word;
    height: auto;
    min-height: 65px;
}
</style>