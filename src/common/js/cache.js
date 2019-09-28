import Cookies from 'js-cookie'

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

const USED_KEY = '__used__'
const USED_MAX_LEN = 200

function insertArray (arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
        arr.forEach(item => {
            if (item.link === val.link && val.num) {
                item.num += 1
            }
        })
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

function deleteFromArray (arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
    }
}

export function loadFavorite () {
    const value = Cookies.getJSON(FAVORITE_KEY)
    return value || []
}

export function saveFavorite (url) {
    let urls = loadFavorite()
    insertArray(urls, url, (item) => {
        return item.link === url.link
    }, FAVORITE_MAX_LEN)
    Cookies.set(FAVORITE_KEY, urls)
    return urls
}

export function deleteFavorite (url) {
    let urls = loadFavorite()
    deleteFromArray(urls, (item) => {
        return item.link === url.link
    })
    Cookies.set(FAVORITE_KEY, urls)
    return urls
}

export function removeFavorite () {
    Cookies.remove(FAVORITE_KEY)
    return []
}

export function loadUsed () {
    const value = Cookies.getJSON(USED_KEY)
    return value || []
}

export function saveUsed (url) {
    url.num = 1
    let urls = loadUsed()
    insertArray(urls, url, (item) => {
        return url.link === item.link
    }, USED_MAX_LEN)
    Cookies.set(USED_KEY, urls)
    return urls
}

export function deleteUsed (url) {
    let urls = loadUsed()
    deleteFromArray(urls, (item) => {
        return item.link === url.link
    })
    Cookies.set(USED_KEY, urls)
    return urls
}

export function removeUsed () {
    Cookies.remove(USED_KEY)
    return []
}
