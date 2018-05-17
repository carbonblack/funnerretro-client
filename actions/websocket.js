import io from 'socket.io-client'
import { successfulCardUpdate, successfulCardDelete, successfulColumnDelete, successfulDeleteBoard } from './board';

const socket = io(WEBSOCKET_SERVER_URI, { transports: ['websocket'] })

export const init = (store) => {
    socket.on('node_update', (payload) => {
        payload.nodes.forEach(node => {
            switch(node.type) {
                case 'ColumnHeader':
                    dispatch(successfulCardUpdate(node))
                    break
                case 'Board':
                    // currently not a thing
                    break
                case 'ContentNode':
                    dispatch(successfulCardUpdate(node))
                    break
            }
        })
    })

    socket.on('node_del', (payload) => {
        payload.nodes.forEach(node => {
            switch(node.type) {
                case 'ColumnHeader':
                    dispatch(successfulColumnDelete(node.id))
                    break
                case 'Board':
                    dispatch(successfulDeleteBoard(node.id))
                    break
                case 'ContentNode':
                    dispatch(successfulCardDelete(node.id))
                    break
            }
        })
    })

    socket.on('subscribe_response', (payload) => {
        console.log(`Subscribed to board: ${ payload.board_id }`)
    })

    socket.on('unsubscribe_response', (payload) => {
        console.log(`Unsubscribed to board: ${ payload.board_id }`)
    })
}

export const subscribeToBoard = boardId => {
    socket.emit('subscribe', { board_id: boardId })
}

export const unsubscribeToBoard = boardId => {
    socket.emit('unsubscribe', { board_id: boardId })
}
