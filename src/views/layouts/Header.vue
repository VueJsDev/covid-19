<template>
    <div>
        <header id="m_header" class="m-grid__item    m-header " m-minimize-offset="200" m-minimize-mobile-offset="200">
            <div class="m-container m-container--fluid m-container--full-height">
                <div class="m-stack m-stack--ver m-stack--desktop">
                    <div class="m-stack__item m-brand  m-brand--skin-dark ">
                        <div class="m-stack m-stack--ver m-stack--general">
                            <div class="m-stack__item m-stack__item--middle m-brand__logo">
                                <a href="#" class="m-brand__logo-wrapper">
                                    <img alt="" src="assets/images/logo.png" />
                                </a>
                            </div>
                            <div class="m-stack__item m-stack__item--middle m-brand__tools">

                                <!-- BEGIN: Left Aside Minimize Toggle -->
                                <a href="javascript:;" id="m_aside_left_minimize_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block  ">
                                    <span></span>
                                </a>

                                <!-- END -->

                                <!-- BEGIN: Responsive Aside Left Menu Toggler -->
                                <a href="javascript:;" id="m_aside_left_offcanvas_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block">
                                    <span></span>
                                </a>

                                <!-- END -->

                                <!-- BEGIN: Responsive Header Menu Toggler -->
                                <a id="m_aside_header_menu_mobile_toggle" href="javascript:;" class="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block">
                                    <span></span>
                                </a>

                                <!-- END -->

                                <!-- BEGIN: Topbar Toggler -->
                                <a id="m_aside_header_topbar_mobile_toggle" href="javascript:;" class="m-brand__icon m--visible-tablet-and-mobile-inline-block">
                                    <i class="flaticon-more"></i>
                                </a>

                                <!-- BEGIN: Topbar Toggler -->
                            </div>
                        </div>
                    </div>
                    <!-- Sección para cambio de datos y logout -->
                    <div class="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
                        <div id="m_header_topbar" class="m-topbar  m-stack m-stack--ver m-stack--general m-stack--fluid">
                            <encabezado v-if="GET_USER_AUTH_HEADER"></encabezado>
                            <div class="m-stack__item m-topbar__nav-wrapper">
                                <ul class="m-topbar__nav m-nav m-nav--inline">
                                    <li class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" m-dropdown-toggle="click">
                                        <a href="#" class="m-nav__link m-dropdown__toggle">
                                            <span class="m-topbar__userpic">
                                                <img src="assets/app/media/img/users/user.png" class="m--img-rounded m--marginless" alt="" />
                                            </span>
                                            <span class="m-topbar__username m--hide">{{ user }}</span>
                                        </a>
                                        <div class="m-dropdown__wrapper">
                                            <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
                                            <div class="m-dropdown__inner">
                                                <div class="m-dropdown__header m--align-center" style="background: url(assets/app/media/img/misc/user_profile_bg.jpg); background-size: cover;">
                                                    <div class="m-card-user m-card-user--skin-dark">
                                                        <div class="m-card-user__pic">
                                                            <img src="assets/app/media/img/users/user.png" class="m--img-rounded m--marginless" alt="" />
                                                        </div>
                                                        <div class="m-card-user__details">
                                                            <span class="m-card-user__name m--font-weight-500">{{ user }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="m-dropdown__body">
                                                    <div class="m-dropdown__content">
                                                        <ul class="m-nav m-nav--skin-light">
                                                            <li class="m-nav__section m--hide">
                                                                <span class="m-nav__section-text">Section</span>
                                                            </li>
                                                            <li class="m-nav__item">
                                                                <a @click="changePassword" class="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">Cambiar contraseña</a>
                                                            </li> <br>
                                                            <li class="m-nav__item">
                                                                <a @click="logout()" class="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">Salir</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Fin Sección para cambio de datos y logout -->
                </div>
            </div>
        </header>
        <div class="modal fade" id="modalChangePassword" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Cambiar contraseña</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form class="m-form m-form--fit">
                            <div class="m-portlet__body">
                                <div class="form-group m-form__group">
                                    <div v-if="show_message_reset" class="m-alert m-alert--outline alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>¡Contraseña cambiada!</strong> Se cerrará sessión en 3seg.
                                    </div>
                                </div>
                                <div class="m-form__section m-form__section--first">
                                    <div class="form-group m-form__group">
                                        <label :class="{'text-danger': !GET_VALUE_CURRENT_PASSWORD, 'text-success': GET_VALUE_CURRENT_PASSWORD}">Contraseña actual</label>
                                        <div class="m-input-icon m-input-icon--left" :class="{'m-loader m-loader--primary m-loader--right': GET_LOADING_VALUE_CURRENT_PASSWORD}">
                                            <input id="idCurrentPassword" type="password" class="form-control m-input" v-model="currentPassword" @keyup="veryfyCurrentPassword" placeholder="contraseña actual">
                                            <span class="m-input-icon__icon m-input-icon__icon--left">
                                                <span>
                                                    <i class="la la-key"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <div v-if="!GET_VALUE_CURRENT_PASSWORD" class="form-control-feedback text-danger">ingrese su contraseña actual</div>
                                        <div v-else class="form-control-feedback text-success">contraseña correcta</div>
                                    </div>
                                    <div class="form-group m-form__group">
                                        <label :class="{'text-danger': validation.hasError('password')}">Nueva contraseña</label>
                                        <div class="m-input-icon m-input-icon--left">
                                            <input :disabled="getValueCurrentPass" type="password" class="form-control m-input" v-model="password" placeholder="nueva contraseña">
                                            <span class="m-input-icon__icon m-input-icon__icon--left">
                                                <span>
                                                    <i class="la la-key"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <div class="form-control-feedback" :class="{'text-danger': validation.hasError('password')}">mínimo, 6 carácteres</div>
                                    </div>
                                    <div class="form-group m-form__group">
                                        <label :class="{'text-danger': validation.hasError('repeat')}">Repetir contraseña</label>
                                        <div class="m-input-icon m-input-icon--left">
                                            <input :disabled="getValueCurrentPass" type="password" v-model="repeat" class="form-control m-input" placeholder="repetir contraseña">
                                            <span class="m-input-icon__icon m-input-icon__icon--left">
                                                <span>
                                                    <i class="la la-key"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <div v-if="validation.hasError('repeat')" class="form-control-feedback" :class="{'text-danger': validation.hasError('repeat')}">no coincide</div><br>
                                        <p><b>ATENCIÓN:</b> La clave deberá poseer al menos 6 caracteres, combinando números, minúsculas y mayúsculas. Para fortalecer su seguridad, recomendamos el uso de símbolos como !@#~&"^%*_?.</p>
                                    </div>
                                </div>
                                <div class="m-form__seperator m-form__seperator--dashed"></div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" :disabled="getValueCurrentPass" @click="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions, mapState, mapGetters} from 'vuex';
    import SimpleVueValidation from 'simple-vue-validator';
    const Validator = SimpleVueValidation.Validator;
    Vue.use(SimpleVueValidation);
    
    import encabezado from '../../components/camas/encabezado'
    import { mixUser }  from '../../mixins/user';

    export default {
        mixins: [ mixUser ],
        data(){
            return{
                currentPassword:'',
                password: '',
                repeat: '',
                submitted: false,
                show_message_reset: false
             }
        },
        components: {
            encabezado
        },
        validators: {
            password: function (value) {
                return Validator.value(value).required().minLength(6);
            },
            'repeat, password': function (repeat, password) {
                if (this.submitted || this.validation.isTouched('repeat')) {
                    return Validator.value(repeat).required().match(password);
                }
            }
        },
        computed: {
            ...mapGetters('users', ['GET_VALUE_CURRENT_PASSWORD', 'GET_LOADING_VALUE_CURRENT_PASSWORD']),
            getValueCurrentPass(){
                if (!this.GET_VALUE_CURRENT_PASSWORD) {
                    return 'disabled'
                } else {
                    return false
                }
            },
            GET_USER_AUTH_HEADER(){
                let permissions = JSON.parse(localStorage.getItem("permissions"));
                let perm = false;
                permissions.forEach(permission => {
                    if (permission.code == 'encabezado') {
                        perm = true
                    }
                })
                return perm
            },
            user(){
                return localStorage.getItem('user')
            },
            name(){
                return localStorage.getItem('name')
            },

        },
        methods:{
            ...mapActions('users', ['CHANGE_PASSWORD', 'VERIFY_CURRENT_PASSWORD', 'VERIFY_CURRENT_PASSWORD']),
            veryfyCurrentPassword(){
                let data = {
                    currentPassword: this.currentPassword
                }
                this.VERIFY_CURRENT_PASSWORD(data)
            },
            changePassword() {
                $("#modalChangePassword").on("shown.bs.modal", function () { 
                    $(this).find('#idCurrentPassword').focus();
                }).modal('show');
            },
            changePasswordVuex(){
                let data = {
                    password: this.password
                }
                this.CHANGE_PASSWORD(data).then( res => {
                    this.show_message_reset = true
                    setTimeout(() => {
                        $('#modalChangePassword').modal('hide')
                        this.show_message_reset = false
                        this.logout()                        
                    }, 4000);

                })
                .catch(err => {
                    console.log(`ERROR: ${err}`)
                })
            },
            submit: function () {
                this.submitted = true;
                var self = this
                this.$validate()
                .then(function(success) {
                    if (success) {
                        self.changePasswordVuex()
                    } else {
                        console.log(`Hubo un error..`)
                    }
                });
            },
            
        }        
    }
</script>