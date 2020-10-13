import _ from "lodash";
import axios from "axios";
require("dotenv").config();

const URL = process.env.VUE_APP_API_URI;
const URL_USERS = process.env.VUE_APP_API_USERS;



const users = {
    namespaced: true,
    state: {
        verMessageLoginError: false,
        user_auth: {},
        users: [],
        loading_status: false,
        getValueCurrentPassword: false,
        loadingValueCurrentPassword: false,
        maintenance: false
    },
    actions: {
        CHANGE_MAINTENANCE: ( { commit }, data ) => {
            console.log(`Datos de maintenance -> ${data.maintenance}`);
            commit("SET_MAINTENANCE", data.maintenance);
        },
        LOGIN_API:({ commit }) => {
            //http://10.10.0.202:9001/api-auth/
            let datos = {
                username: 'api',
                password: 'covid@mdh2020*'
            }
            axios
                .post(URL + "/api-auth/", datos)
                .then((res) => {
                    commit("SET_LOGIN_API", res.data.token);
                })
                .catch((err) => {
                    console.log(`ERROR: ${err}`);
                });
        },
        VERIFY_CURRENT_PASSWORD: ({ commit }, datap) => {
            let data = {
                user: localStorage.getItem('user'),
                password: datap.currentPassword 
            }
            commit('SET_LOADING_VALUE_CURRENT_PASSWORD', true)
            return new Promise((resolve, reject) => {
                axios
                    .post(URL_USERS + "/users/login", data)
                    .then((res) => {
                        commit('SET_VALUE_CURRENT_PASSWORD', true)
                        commit('SET_LOADING_VALUE_CURRENT_PASSWORD', false)
                        resolve(res);
                    })
                    .catch((err) => {
                        commit('SET_VALUE_CURRENT_PASSWORD', false)
                        commit('SET_LOADING_VALUE_CURRENT_PASSWORD', false)
                        reject(err);
                    });
            });
        },
        CHANGE_PASSWORD: ({ commit }, data) => {
            let arrayProps = [];
            arrayProps.push({ 'propName': 'password', 'value': data.password })
            return new Promise((resolve, reject) => {
                axios
                    .patch(URL_USERS + "/users/" + localStorage.getItem('userid'), arrayProps)
                    .then((res) => {
                        console.log(`RESPONSE: ${res}`);
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log(`ERROR: ${err}`);
                        reject(err);
                    });
            });
        },
        LOGIN_USERS: ({ commit }, data) => {
            commit('LOADING_AUTH', true)
            return new Promise((resolve, reject) => {
                axios
                    .post(URL_USERS + "/users/login", data)
                    .then((res) => {
                        commit('LOADING_AUTH', false)
                        commit("SET_USER_AUTH", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        commit("SET_USER_AUTH_ERROR");
                        console.log(err.response.data)
                        commit('LOADING_AUTH', false)
                        reject(err);
                    });
            });
        },
        FETCH_USERS: ({ commit }) => {
            return new Promise((resolve, reject) => {
                axios
                    .get(URL_USERS + "/users/list")
                    .then((res) => {
                        commit("SET_USERS", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log(`ERROR: ${err}`);
                        reject(err);
                    });
            });
        },
        UPDATE_ACTIVE_USER: ({commit}, user) => {
            let arrayProps = [];
            arrayProps.push({ 'propName': 'active', 'value': user.active })
            return new Promise((resolve, reject) => {
                axios
                    .patch(URL_USERS + "/users/" + user.id, arrayProps)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log(`ERROR: ${err}`);
                        reject(err);
                    });
            });
        },
        SAVE_PERMISSIONS:({commit}, user) => {
            let arrayProps = [];
            arrayProps.push({ propName: "modules", value: user.permissions });
            return new Promise((resolve, reject) => {
              axios
                  .patch(URL_USERS + "/users/" + user.id, arrayProps)
                .then((res) => {
                  resolve(res);
                })
                .catch((err) => {
                  console.log(`ERROR: ${err}`);
                  reject(err);
                });
            });
        },
        UPDATE_USER: ({commit}, userUpdate) => {
            let arrayProps = [];
            arrayProps.push({ 'propName': 'name', 'value': userUpdate.name })
            arrayProps.push({ 'propName': 'lastname', 'value': userUpdate.lastname })
            arrayProps.push({ 'propName': 'user', 'value': userUpdate.user })
            arrayProps.push({ 'propName': 'profile', 'value': userUpdate.profile })
            if ( userUpdate.password != '' ){
                arrayProps.push({ 'propName': 'password', 'value': userUpdate.password })
            }
            return new Promise((resolve, reject) => {
                axios
                    .patch(URL_USERS + "/users/" + userUpdate.id, arrayProps)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log(`ERROR: ${err}`);
                        reject(err);
                    });
            });
        },
        NEW_USER: ({ commit }, user) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(URL_USERS + "/users/register", user)
                    .then((res) => {
                        commit("SET_NEW_USERS", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log(`ERROR: ${err}`);
                        reject(err);
                    });
            });
        },
        DELETE_USER: ({ commit }, userId) => {
            return new Promise((resolve, reject) => {
                axios
                    .delete(URL_USERS + "/users/" + userId)
                    .then((res) => {
                        commit("DELETE_LIST_USERS", userId);
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log(`ERROR: ${err}`);
                        reject(err);
                    });
            });
        },
    },
    mutations: {
        SET_MAINTENANCE( state, value ) {
            state.maintenance = value
        },
        SET_LOGIN_API( state, token ) {
            localStorage.setItem('token_api', token)
        },
        SET_LOADING_VALUE_CURRENT_PASSWORD(state, value){
            state.loadingValueCurrentPassword = value
        },
        SET_VALUE_CURRENT_PASSWORD(state, status){
            state.getValueCurrentPassword = status
        },
        LOADING_AUTH(state, status) {
            state.loading_status = status
        },
        SET_USER_AUTH_ERROR(state) {
            localStorage.removeItem('permissions')
            localStorage.removeItem('user')
            localStorage.removeItem('profile')
            localStorage.removeItem('name')
            state.user_auth = {}
            state.verMessageLoginError = true
        },
        SET_USER_AUTH(state, data){
            localStorage.setItem('permissions', JSON.stringify(data.modules));
            localStorage.setItem('user', data.user);
            localStorage.setItem('userid', data._id);
            localStorage.setItem('profile', data.profile);
            localStorage.setItem('name', data.name);
            state.user_auth = data
            state.verMessageLoginError = false
        },
        DELETE_LIST_USERS(state, userId) {
            let listUsers = state.users;
            _.remove(listUsers, {
                _id: userId
            });
        },
        SET_NEW_USERS(state, user) {
            state.users.push(user.createdUser)
        },
        SET_USERS(state, data) {
            state.users = data
        }
    },
    getters: {
        GET_MAINTENANCE(state){
            return state.maintenance
        },
        GET_LOADING_VALUE_CURRENT_PASSWORD(state){
            return state.loadingValueCurrentPassword
        },
        GET_VALUE_CURRENT_PASSWORD(state){
            return state.getValueCurrentPassword
        },
        GET_LOADING_STATUS(state) {
            return state.loading_status
        },
        GET_VER_MESSAGE_SIN_MODULOS_O_NOACTIVO(state) {
            if (state.user_auth.active == undefined) {
                return false;
            } else {
                if (state.user_auth.modules.length > 0 && state.user_auth.active) {
                    return false;
                } else {
                    return true;
                }
            } 
                
        },
        GET_VER_MESSAGE_LOGIN(state) {
            return state.verMessageLoginError
        },
        GET_USERS(state) {
            return state.users
        },
        GET_USER_AUTH(state){
            return localStorage.getItem('user')
        }
    },
}

export default users;