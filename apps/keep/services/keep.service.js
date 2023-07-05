import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const PAGE_SIZE = 5
const KEEP_KEY = 'kee[DB'

var gFilterBy = { }
var gSortBy = { }
var gPageIdx

_createKeeps()


export const keepService = {
    query,
    get,
    remove,
    save,
    getEmptyKeep,
    getFilterBy,
    setFilterBy,
    
  
}
window.keepService = keepService

function query() {
    return storageService.query(KEEP_KEY)
        .then(keeps => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                keeps = keeps.filter(keep => regex.test(keep.title))
            }
            // if (gFilterBy.minSpeed) {
            //     keeps = keeps.filter(keep => keep.maxSpeed >= gFilterBy.minSpeed)
            // }
            // if (gPageIdx !== undefined) {
            //     const startIdx = gPageIdx * PAGE_SIZE
            //     keeps = keeps.slice(startIdx, startIdx + PAGE_SIZE)
            // }
            // if (gSortBy.maxSpeed !== undefined) {
            //     keeps.sort((c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed)
            // } else if (gSortBy.vendor !== undefined) {
            //     keeps.sort((c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor)
            // }

            return keeps
        })
}

function get(keepId) {
    return storageService.get(KEEP_KEY, keepId)
         .then(keep => _setNextPrevKeepId(keep))
}

function remove(keepId) {
    return storageService.remove(KEEP_KEY, keepId)
}

function save(keep) {
    if (keep.id) {
        return storageService.put(KEEP_KEY, keep)
    } else {
        return storageService.post(KEEP_KEY, keep)
    }
}


function _setNextPrevKeepId(keep) {
    return storageService.query(KEEP_KEY)
        .then(keeps => {
            const keepIdx = keeps.findIndex(currkeep => currKeep.id === keep.id)
            keep.nextKeepId = keeps[keepIdx + 1] ? keeps[keepIdx + 1].id : keeps[0].id
            keep.prevKeepId = keeps[keepIdx - 1]
                ? keeps[keepIdx - 1].id
                : keeps[keeps.length - 1].id
            return keep
        })
}




function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    // if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}



function getEmptyKeep(txt='Fullstack Me Baby!') {
    const date = new Date()
    return { id: 'n101',
            createdAt: date,
            type: 'NoteTxt',
            isPinned: false,
            style: { backgroundColor: '#00d' },
            info: { txt: txt}        
            }
}

function _createKeeps() {
    let keeps = utilService.loadFromStorage(KEEP_KEY)
    if (!keeps || !keeps.length) {
        keeps = []        
        keeps.push(_createKeep('keep1'))
        keeps.push(_createKeep('keep2'))
        keeps.push(_createKeep('keep3'))
        keeps.push(_createKeep('keep4'))
        utilService.saveToStorage(KEEP_KEY, keeps)
    }
    console.log('keeps',keeps)
}

function _createKeep(txt) {
    const keep = getEmptyKeep(txt)
    keep.id = utilService.makeId()
    return keep
}