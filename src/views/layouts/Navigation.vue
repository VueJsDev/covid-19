<template>
    <!-- BEGIN: Aside Menu -->
    <div id="m_ver_menu" class="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark " m-menu-vertical="1" m-menu-scrollable="1" m-menu-dropdown-timeout="500" style="position: relative;">
        <ul class="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
            <li v-if="GET_USER_AUTH_INGRESOS" class="m-menu__item" aria-haspopup="true">
                <a @click="pacientes()" class="m-menu__link ">
                    <i class="m-menu__link-icon la la-wheelchair fa-2x"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">Pacientes</span>
                        </span>
                    </span>
                </a>
            </li>
            <li v-if="GET_USER_AUTH_CAMAS" class="m-menu__item" aria-haspopup="true">
                <a @click="camas()" class="m-menu__link ">
                    <i class="m-menu__link-icon flaticon-diagram"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">Camas Covid19</span>
                        </span>
                    </span>
                </a>
            </li>
            <li v-if="GET_USER_AUTH_INGRESOS" class="m-menu__item" aria-haspopup="true">
                <a @click="ingresos()" class="m-menu__link ">
                    <i class="m-menu__link-icon flaticon-clipboard"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">Ingresos a la Provincia</span>
                        </span>
                    </span>
                </a>
            </li>
            <li v-if="GET_USER_AUTH_TEST" class="m-menu__item" aria-haspopup="true">
                <a @click="testCovid()" class="m-menu__link ">
                    <i class="m-menu__link-icon flaticon-edit-1"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">Test Covid19</span>
                        </span>
                    </span>
                </a>
            </li>            
            <!-- UPAC Estadísticas-->
            <li v-if="GET_USER_AUTH_UPAC" class="m-menu__item  m-menu__item--submenu" aria-haspopup="true" m-menu-submenu-toggle="hover">
                <a href="javascript:;" class="m-menu__link m-menu__toggle">
                    <i class="m-menu__link-icon fa fa-medkit"></i>
                    <span class="m-menu__link-text">UPAC Estadísticas</span>
                    <i class="m-menu__ver-arrow la la-angle-right"></i>
                </a>
                <div class="m-menu__submenu ">
                    <span class="m-menu__arrow"></span>
                    <ul class="m-menu__subnav">
                        <li class="m-menu__item  m-menu__item--parent" aria-haspopup="true">
                            <span class="m-menu__link">
                                <span class="m-menu__link-text"></span>
                            </span>
                        </li>
                        <li class="m-menu__item " aria-haspopup="true">
                            <a @click="upac()" class="m-menu__link ">
                                <i class="m-menu__link-icon fa fa-chart-bar">
                                    <span></span>
                                </i>
                                <span class="m-menu__link-text">Covid-19</span>
                            </a>
                        </li>
                        <li class="m-menu__item " aria-haspopup="true">
                            <a @click="procedencia()" class="m-menu__link ">
                                <i class="m-menu__link-icon fa fa-chart-bar">
                                    <span></span>
                                </i>
                                <span class="m-menu__link-text">Informes</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
            <!-- Fin UPAC Estadísticas-->
            <li v-if="GET_USER_AUTH_USERS" class="m-menu__item" aria-haspopup="true">
                <a @click="Users()" class="m-menu__link ">
                    <i class="m-menu__link-icon fa fa-users"></i>
                    <span class="m-menu__link-title">
                        <span class="m-menu__link-wrap">
                            <span class="m-menu__link-text">Usuarios</span>
                        </span>
                    </span>
                </a>
            </li>
        </ul>
    </div>
    <!-- END: Aside Menu -->
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data:() => {
            return {

            }
        },
        methods: {
            camas() {
                this.$router.push('/camas')
            },
            upac() {
                this.$router.push('/upac')
            },
            Users() {
                this.$router.push('/users')
            },
            procedencia() {
                this.$router.push('/informes')
            },
            testCovid(){
                this.$router.push('/testCovid')
            },
            ingresos() {
                this.$router.push('/ingresos').catch(err => {})
            },
            pacientes() {
                this.$router.push('/pacientes').catch(err => {})
            }
        },
        computed: {
            GET_USER_AUTH_UPAC(){
                let permissions = JSON.parse(localStorage.getItem("permissions"));
                let perm = false;
                permissions.forEach(permission => {
                    if (permission.code == 'upac') {
                        perm = true
                    }
                })
                return perm
            },
            GET_USER_AUTH_TEST(){
                let permissions = JSON.parse(localStorage.getItem("permissions"));
                let perm = false;
                permissions.forEach(permission => {
                    if (permission.code == 'testcovid19') {
                        perm = true
                    }
                })
                return perm
            }, 
            GET_USER_AUTH_INGRESOS(){
                let permissions = JSON.parse(localStorage.getItem("permissions"));
                let perm = false;
                permissions.forEach(permission => {
                    if (permission.code == 'ingresos') {
                        perm = true
                    }
                })
                return perm
            }, 
            GET_USER_AUTH_CAMAS(){
                let permissions = JSON.parse(localStorage.getItem("permissions"));
                let perm = false;
                permissions.forEach(permission => {
                    if (permission.code == 'camascovid19') {
                        perm = true
                    }
                })
                return perm
            },
            GET_USER_AUTH_USERS(){
                let profile = localStorage.getItem("profile");
                let perm = false
                if (profile == 'Administrador' || profile == 'Desarrollador') {
                    perm = true
                } else {
                    perm = false
                }
                return perm
            },
        }
    }

</script>