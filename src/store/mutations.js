import * as types from './mutation_types'
const mutations = {
  [types.UPDATE_USER](state, payload) {
    if (payload) {
      state.user = payload
    }
  }
}
export default mutations
