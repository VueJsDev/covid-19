<template>
<div class="m-grid__item m-grid__item--fluid m-wrapper">
    <encabezado-mobile v-if="GET_USER_AUTH_HEADER"></encabezado-mobile>
    <div class="row">
        <camas-disponibles />
        <camas-moderados />
        <camas-criticos />
    </div>
</div>

</template>

<script>
    import encabezadoMobile from '../../../components/camas/encabezado_mobile'
    import CamasDisponibles from './camas_disponibles'
    import CamasModerados from './camas_moderados';
    import CamasCriticos from './camas_criticos';

    export default {
        components: {
            encabezadoMobile,
            CamasDisponibles,
            CamasModerados,
            CamasCriticos
        },

        computed: {
            GET_USER_AUTH_HEADER(){
                let permissions = JSON.parse(localStorage.getItem("permissions"));
                let perm = false;
                permissions.forEach(permission => {
                    if (permission.code == 'encabezado') {
                        perm = true
                    }
                })
                return perm
            }
        },

        beforeCreate () {
            if (!localStorage.getItem('user')) {
                this.$router.push({ path: '/login' })
                //this.$router.push({ path: '/' })
            }
            let permissions = JSON.parse(localStorage.getItem("permissions"));
            let perm = false;
            permissions.forEach(permission => {
                if (permission.code == 'camascovid19') {
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