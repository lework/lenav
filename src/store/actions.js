import * as types from './mutation-types'
import {saveFavorite, deleteFavorite, removeFavorite, saveUsed, deleteUsed, removeUsed} from '@/common/js/cache'

export const saveFavoriteList = function ({commit}, url) {
    commit(types.SET_FAVORITE_LIST, saveFavorite(url))
}

export const deleteList = function ({commit}, url) {
    if (url.num) {
        commit(types.SET_USED_LIST, deleteUsed(url))
    } else {
        commit(types.SET_FAVORITE_LIST, deleteFavorite(url))
    }
}

export const saveUsedList = function ({commit}, url) {
    commit(types.SET_USED_LIST, saveUsed(url))
}

export const removeUsedList = function ({commit}) {
    commit(types.SET_USED_LIST, removeUsed())
}

export const removeFavoriteList = function ({commit}) {
    commit(types.SET_FAVORITE_LIST, removeFavorite())
}
