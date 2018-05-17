import io from 'socket.io-client'

const socket = io(WEBSOCKET_SERVER_URI)

const messageTypes = {}

export const init = (store) => {
    Object.keys(messageTypes).forEach(type => socket.on(type, payload => store.dispatch({ type, payload })))
}
