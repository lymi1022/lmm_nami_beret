import { auth } from '../api/common'
import * as types from './mutation_types'
import callApi from '../helpers/call_api'
import { setLocalAuth } from '@/helpers/local_auth'

const actions = {
  auth: ({ commit }) => {
    return auth()
      .then(res => {
        const permissions = res.permissions.reduce((result, item) => {
          return {
            ...result,
            [item.module]: item.permission
          }
        }, {})
        const user = {
          ...res.userContext,
          permissions,
        }
        try {
          setLocalAuth(user)
        } catch (error) {
          // console.log(error)
        }
        commit(types.UPDATE_USER, user)
        return user
      })
  },
  fillLogin: ({ commit, dispatch}, { formData }) => {
    return callApi(`session/login`, {
      method: 'post',
      data: formData,
      commit
    })
  },
}
export default actions