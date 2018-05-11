import io from 'socket.io-client'

const socket = io(WEBSOCKET_SERVER_URI)

const messageTypes = [
    'CREATE_COLUMN',
    'CREATE_CARD',
    'CREATE_BOARD'
]

export const init = (store) => {
    Object.keys(messageTypes).forEach( type => socket.on(type, payload => store.dispatch({ type, payload })))
}

export const emit = (type, payload) => socket.emit(type, payload)
