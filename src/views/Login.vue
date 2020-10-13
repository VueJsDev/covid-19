<template>
    <div class="m-grid m-grid--hor m-grid--root m-page">
        <div class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2" id="m_login" style="background-image: url(../../../assets/app/media/img//bg/bg-3.jpg);">
            <div class="m-grid__item m-grid__item--fluid	m-login__wrapper">
                <div v-if="computedMaintenace">
                    <img class="img-fluid d-none d-md-block" src="assets/images/mantenimiento.png" alt="">
                    <img class="img-fluid d-block d-md-none" src="assets/images/mantenimiento_vertical.png" alt="">
                </div>
                <div v-else class="m-login__container">
                    <div  class="m-login__signin">
                        <div class="m-login__head">
                            <h3 class="m-login__title">Ingresar a Estadísticas MDH</h3>
                        </div>
                        <div class="alert alert-danger" v-show="GET_VER_MESSAGE_LOGIN" role="alert">
                            <center>Usuario o Password incorrectos.</center>
                        </div>
                        <div class="alert alert-danger" v-show="GET_VER_MESSAGE_SIN_MODULOS_O_NOACTIVO" role="alert">
                            <center>No tienes permisos o tu usuario está inactivo.</center>
                        </div>
                        <form class="m-login__form m-form" v-on:submit.prevent="login">
                            <div class="form-group m-form__group">
                                <input class="form-control m-input" type="text" placeholder="Usuario" v-model="user" name="email" autocomplete="off">
                            </div>
                            <div class="form-group m-form__group">
                                <input class="form-control m-input m-login__form-input--last" v-model="password" type="password" placeholder="Contraseña" name="password">
                            </div>
                            <div class="m-login__form-action">
                                <button
                                    :disabled="disabledBtnLogin"  
                                    id="m_login_signin_submit" 
                                    class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn m-login__btn--primary"
                                    :class="{'m-loader m-loader--light m-loader--left': GET_LOADING_STATUS}"
                                    >Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapState, mapGetters} from 'vuex';

    export default {
        data(){
            return{
                user: '',
                password:'',
                verAlert: false
            }
        },
        created () {
            this.loadTokenAPI()
            let maintenance = (localStorage.getItem('maintenance') == "true") ? true : false
            this.CHANGE_MAINTENANCE({ maintenance })
        },
        methods:{
            ...mapActions('users', ['LOGIN_USERS', 'LOGIN_API', 'CHANGE_MAINTENANCE']),
            loadTokenAPI(){
                this.LOGIN_API()
            },
            timeOutLogout(){
                //escala de tiempo
                //15 min = 900000 - 30 min = 1800000 - 1h = 3600000 - 2h = 7200000
                var timeout
                const self = this
                function refresh(){
                    clearTimeout(timeout)
                    timeout = setTimeout(() => {
                        //Log out the user
                        self.removeLocalStorage()
                        self.$router.push({ path: '/login' })
                    }, 7200000)
                }
                refresh()
                document.addEventListener('mousemove', refresh)
            },
            removeLocalStorage(){
                localStorage.removeItem('permissions')
                localStorage.removeItem('user')
                localStorage.removeItem('userid')
                localStorage.removeItem('name')
                localStorage.removeItem('profile')
                localStorage.removeItem('reloaded');
            },
            login() {
                let data = {
                    user: this.user,
                    password: this.password 
                }
                this.LOGIN_USERS(data).then(res => {
                    let modules = res.data.modules
                    if(modules.length > 0 && res.data.active) {
                        this.timeOutLogout()
                        //Acomodo las posiciones de ingreso
                        //Para Camas
                        let ordenModulos = ['camascovid19', 'ingresos', 'testcovid19', 'upac']
                        let corte = false
                        for (let i = 0; i < ordenModulos.length; i++) {
                            try {
                                modules.forEach( module => {
                                    if (ordenModulos[i] == module.code) {
                                        if (module.code == 'camascovid19') {
                                            corte = true
                                            this.$router.push({ path: '/camas' })
                                            throw BreakException;
                                        } else if ( module.code == 'testcovid19' ) {
                                            corte = true
                                            this.$router.push('/testCovid')
                                            throw BreakException;
                                        } else {
                                            corte = true
                                            this.$router.push({ path: '/' + module.code })
                                            throw BreakException;
                                        }
                                    }
                                    if (corte) {
                                        throw BreakException;
                                    }
                                })
                            } catch (error) {
                                throw error
                            }
                        }
                    }
                })
            }
        },

        computed:{
          ...mapGetters('users', ['GET_VER_MESSAGE_LOGIN', 'GET_VER_MESSAGE_SIN_MODULOS_O_NOACTIVO', 'GET_LOADING_STATUS', 'GET_MAINTENANCE']),
          computedMaintenace(){
              if (this.GET_MAINTENANCE){
                  return true;
              } else {
                  return false;
              }
          },
          disabledBtnLogin(){
              if (this.$route.params.maintenance){
                  return 'disabled';
              } else {
                  return null;
              }
          }

        },

        
    }
</script>

<style  scoped>

</style>