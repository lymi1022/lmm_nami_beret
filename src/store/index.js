import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import landingPage from '../views/landing_page/vuex_module'
Vue.use(Vuex)

const state = {
  
}

const modules = {
  landingPage
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules
})