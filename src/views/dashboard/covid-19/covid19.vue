<template>
    <div class="row">
        <encabezado-mobile v-if="GET_USER_AUTH_HEADER" />
        
        <filtro-fecha />

        <procedencias />

        <derivaciones-hisopado />

        <protocolos-activados />

        <comparacion-dia-anterior />

        <detalle-procedencia-ingresada-en-el-dia />

        <ingreso-efector-sexo />

        <ingreso-provincia />

        <comparacion-ingresos-por-semana />

        <distribucion-rango-sexo />

    </div>
</template> 

<script>
    import encabezadoMobile from '../../../components/camas/encabezado_mobile'
    import Procedencias from './procedencias'
    import DerivacionesHisopado from './derivaciones_hisopado'
    import ProtocolosActivados from './protocolos_activados'
    import ComparacionDiaAnterior from './comparacion_dia_anterior'
    import DetalleProcedenciaIngresadaEnElDia from './detalle_procedencias_ingresadas_en_el_dia'
    import IngresoEfectorSexo from './ingreso_efector_sexo'
    import IngresoProvincia from './ingreso_provincia'
    import ComparacionIngresosPorSemana from './comparacion_ingresos_semana'
    import DistribucionRangoSexo from './comparacion_rango_sexo'
    import FiltroFecha from './filtro_fecha_general';

    export default {
        data() {
            return {
                
            }
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
        },
        mounted () {
            if (localStorage.getItem('reloaded')) {
                localStorage.removeItem('reloaded');
            } else {
                localStorage.setItem('reloaded', '1');
                location.reload();
            }
        },
        components: {
            encabezadoMobile,
            Procedencias,
            DerivacionesHisopado,
            ProtocolosActivados,
            ComparacionDiaAnterior,
            DetalleProcedenciaIngresadaEnElDia,
            IngresoEfectorSexo,
            IngresoProvincia,
            ComparacionIngresosPorSemana,
            DistribucionRangoSexo,
            FiltroFecha
        }
    }
</script>