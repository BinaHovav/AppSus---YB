import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const PAGE_SIZE = 5
const KEEP_KEY = 'keepDB'

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
    getEmptyNewKeep
  
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



function getEmptyKeep(title, txt, color, pin) {
    console.log('getEmptyKeep')
    const date = new Date()
    return { id: '',
            createdAt: date,
            type: 'TextNote',
            isPinned: pin,
            style: { backgroundColor: '#'+color },
            info: { title, txt}        
            }
}

function getEmptyNewKeep() {
    console.log('getEmptyNewKeep')
    const date = new Date()
    return { id: '',
            createdAt: date,
            type: '',
            isPinned: false,
            style: { backgroundColor: 'var(--blue4)' },
            info: { }        
            }
}

// function getEmptyImgKeep(title, img='imgs/2.jpg') {
//     const date = new Date()
//     return { id: '',
//             createdAt: date,
//             type: 'ImgNote',
//             isPinned: false,
//             style: { backgroundColor: 'var(--clr2)' },
//             info: { title, img}        
//             }
// }


function _createKeep(title, txt , color, pin) {
    const keep = getEmptyKeep(title, txt, color, pin)
    keep.id = utilService.makeId()
    // console.log('keep from _createKeep',keep)
    return keep
}



function _createKeeps() {
    let keeps = utilService.loadFromStorage(KEEP_KEY)
    
    if (!keeps || !keeps.length) {
        // keeps = []    
        // for (var i=0;i<10;i++)  {
        //     let color = utilService.getRandomColor()  
        //     let pin 
        //     if (Math.random()>0.7 ) pin = true
        //     else pin= false
        //     keeps.push(_createKeep('Title'+i, 'keep00'+i, color, pin))
        // }
    
        const date = new Date()
        keeps = [ 
        {id: utilService.makeId(),
            createdAt: date,
            type: 'ImgNote',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'Happy Birthday',
                    url:'https://plus.unsplash.com/premium_photo-1675881738008-c03b8380e5e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MzN8fGJpcnRoZGF5JTIwcGFydHl8ZW58MHx8fHwxNjg4ODM0NTAzfDE&ixlib=rb-4.0.3&q=80&w=1080'}
        },    
        
        {id: utilService.makeId(),
            createdAt: date,
            type: 'TextNote',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'Libi birthdaty',
                    txt: 'call her to congratulate'  }        
        },
        {id: utilService.makeId(),
            createdAt: date,
            type: 'ImgNote',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'Adopt one',
                    url:'https://plus.unsplash.com/premium_photo-1666878155781-f86514e5808b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'  }
        },
        
        {id: utilService.makeId(),
            createdAt: date,
            type: 'ListNote',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'London is waiting for us',
                    todos:[
                        {id:1, txt: 'buy insurence'} ,
                        {id:2, txt: 'packing....'} ,    
                        {id:3, txt:'invite tickets to a show'  }  ] }
        },

        {id: utilService.makeId(),
            createdAt: date,
            type: 'TextNote',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'Bake a cake',
                    txt: 'buy eggs'  }        
        },
        {id: utilService.makeId(),
            createdAt: date,
            type: 'TextNote',
            isPinned: true,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'visit grandMa',
                    txt: 'buy flowers'  }        
        },
       
        {id: utilService.makeId(),
            createdAt: date,
            type: 'ListNote',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'Go to the supermarket',
                    todos:[
                        {id:1, txt: 'buy milk'} ,  
                        {id:2, txt:'buy cherry'  }  ] }
        },

        {id: utilService.makeId(),
            createdAt: date,
            type: 'ListNote',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'Clean the house',
                    todos:[
                        {id:1, txt: 'dishes'} ,
                        {id:2, txt: 'change linen'} ,    
                        {id:3, txt:'wash the bathroom'  }  ] }
        },

        {id: utilService.makeId(),
            createdAt: date,
            type: 'ImgNote',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'Buy an umbrella',
                    url:'https://media.istockphoto.com/id/1306473687/photo/anonymous-woman-dressed-in-a-raincoat-holding-an-open-black-umbrella.jpg?s=1024x1024&w=is&k=20&c=6BkubMImaUtzsUTmosGGwhgeydVbNOvYFGkD2ZBM8-g='
                    }
        },
        
        {id: utilService.makeId(),
            createdAt: date,
            type: 'TextNote',
            isPinned: true,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'study to the test',
                    txt: 'meet with Rotem'  }        
        },
        
      
        
        {id: utilService.makeId(),
            createdAt: date,
            type: 'ImgNote',
            isPinned: false,
            style: { backgroundColor: utilService.getRandomColor() },
            info: { title: 'invite tickets',
                    url:'https://images.unsplash.com/photo-1501694159270-7b55f5eb85fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'}
        }

        
        ]

        utilService.saveToStorage(KEEP_KEY, keeps)
        }
        console.log('keeps',keeps)
}

