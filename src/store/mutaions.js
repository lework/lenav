import * as types from './mutation-types'

const matutaions = {
    [types.SET_USED_LIST] (state, list) {
        state.usedList = list
    },
    [types.SET_FAVORITE_LIST] (state, list) {
        state.favoriteList = list
    }
}

export default matutaions
