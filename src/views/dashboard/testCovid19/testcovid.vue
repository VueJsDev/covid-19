<template>
<div class="m-grid__item m-grid__item--fluid m-wrapper">
    <encabezado-mobile></encabezado-mobile>
    <div class="row">
        <div class="col-xl-3 col-lg-6">
            <test-acumulados></test-acumulados>
        </div>
        <div class="col-xl-4 col-lg-6">
            <test-casos-confirmados></test-casos-confirmados>
        </div>        
        <div class="col-xl-5 col-lg-12">
            <test-diarios></test-diarios>            
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <test-listado></test-listado>
        </div>
    </div>
</div>

</template>

<script>
    import encabezadoMobile from '../../../components/camas/encabezado_mobile'
    import testDiarios from './testCovidDiarios'
    import testAcumulados from './testCovidAcumulados'
    import testCasosConfirmados from './testCovidCasosConfirmados'
    import testListado from './testCovidDetallesListado'

    export default {
        components: {
            encabezadoMobile,
            testDiarios,
            testAcumulados,
            testListado,
            testCasosConfirmados
        },

        beforeCreate () {
            if (!localStorage.getItem('user')) {
                this.$router.push({ path: '/login' })
                //this.$router.push({ path: '/' })
            }
            let permissions = JSON.parse(localStorage.getItem("permissions"));
            let perm = false;
            permissions.forEach(permission => {
                if (permission.code == 'testcovid19') {
                    perm = true
                }
            })
            if (!perm) {
                this.$router.push({ path: '/404' })
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
    }
</script>