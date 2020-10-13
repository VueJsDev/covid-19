<template>
<div class="m-grid__item m-grid__item--fluid m-wrapper">
    <encabezado-mobile></encabezado-mobile>
    <div class="row"> <!-- Date filter -->
        <div class="col-sm-12 col-md-6"> <!-- Income to province total -->
            <patient-search></patient-search>
        </div>
        <div class="col-sm-12 col-md-6"> <!-- Income to province total -->
            <patient-filter></patient-filter>
        </div>
    </div>
    <div id="listPatient" class="row"> <!-- Details of patients -->
        <div class="col-md-12">
            <patient-list></patient-list>
        </div>
    </div>
</div>

</template>

<script>
    import apexchart from 'vue-apexcharts'
    
    var esApex = require("apexcharts/dist/locales/es.json")

    import { mapActions, mapState, mapGetters} from 'vuex';

    // Modules //
    import encabezadoMobile from '../../../components/camas/encabezado_mobile'
    import patientSearch from './patientSearch'
    import patientFilter from './patientFilter'
    import patientList from './patientList'
    

    export default {
        components: {
            encabezadoMobile,
            patientSearch,
            patientFilter,
            patientList
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
        },

        data() {
            return {
            }
        },

        methods: {
            ...mapActions('paciente', [
                'FETCH_PARAMETERS_SEARCH',
                'FETCH_PARAMETER_FILTER',
                'FETCH_PATIENTS_LIST',
            ]),

            fetchInitialValues(){
                // Send initial values
                let codeSearchFor = 2;
                let txtSearch = '';
                let parameterFilter = 1;

                let data = {
                    codeSearchFor,
                    txtSearch,
                    parameterFilter
                }

                this.FETCH_PARAMETER_FILTER(data),
                this.FETCH_PARAMETERS_SEARCH(data),
                this.FETCH_PATIENTS_LIST(data)
            },
        },

        computed: {
            ...mapGetters('paciente', [
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
.alturaFija {
    height: 25px;
}
</style>