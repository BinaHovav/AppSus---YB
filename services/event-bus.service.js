'use strict'

function createEventEmitter(defaultHandler = null){
    const listenersMap = {}

    return {
        on(evName, listener){
            listenersMap[evName] = listenersMap[evName] ? [ ...listenersMap[evName], listener ] : [ listener ]
            return () => listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
        },
        emit(evName, payload){
            if(listenersMap[evName]) listenersMap[evName].forEach(listener => listener(payload))
            else if(defaultHandler) defaultHandler()
        }
    }
}
export const eventBus = createEventEmitter(() => console.log('No handler associated with this event...'))


export function showUserMsg(msg) {
    eventBus.emit('show-msg', msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({txt, type: 'success'})
}
export function showErrorMsg(txt) {
    showUserMsg({txt, type: 'error'})
}