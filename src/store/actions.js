import * as types from './mutation-types'

// export const saveTest = function ({commit, state}, test) {
//   commit(types.TEST_TYPE, test)
// }

export const saveRole = ({commit, state}, role) => {
  setTimeout(() => {
    commit(types.ROLE_TYPE, role)
  }, 5000)
}
