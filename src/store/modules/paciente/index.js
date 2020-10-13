import Vue   from 'vue'
import Vuex  from 'vuex'
import axios from 'axios'

import state     from './state'
import actions   from './actions';
import mutations from './mutations'
import getters   from './getters'

const paciente = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}

export default paciente;