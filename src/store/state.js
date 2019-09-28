import {loadUsed, loadFavorite} from '@/common/js/cache'

const state = {
    usedList: loadUsed(),
    favoriteList: loadFavorite()
}

export default state
