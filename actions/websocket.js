import io from 'socket.io-client'

const socket = io(WEBSOCKET_SERVER_URI, { transports: ['websocket'] })

export const init = (store) => {
    socket.on('node_update', (payload) => {
        store.dispatch({
            type: 'HELLO_FROM_WS',
            payload
        })
    })

    socket.on('node_del', (payload) => {
        store.dispatch({
            type: 'HELLO_FROM_WS',
            payload
        })
    })

    socket.on('subscribe_response', (payload) => {
        console.log(`Subscribed to ${ payload.board_id }`)
    })

    socket.on('unsubscribe_response', (payload) => {
        console.log(`Unsubscribed to ${ payload.board_id }`)
    })
}

export const subscribeToBoard = boardId => {
    socket.emit('subscribe', { board_id: boardId })
}

export const unsubscribeToBoard = boardId => {
    socket.emit('unsubscribe', { board_id: boardId })
}
