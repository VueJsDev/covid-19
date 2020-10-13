import Vue from 'vue'
import Vuex from 'vuex'

import state     from './state'
import actions   from './actions'
import mutations from './mutations'
import getters   from './getters'

const ingreosALaProvincia = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}

export default ingreosALaProvincia;