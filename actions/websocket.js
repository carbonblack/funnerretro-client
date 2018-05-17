import io from 'socket.io-client'
import { successfulCardUpdate, successfulCardDelete, successfulColumnDelete, successfulDeleteBoard, successfulColumnUpdate, receiveColumn } from './board';

const socket = io(WEBSOCKET_SERVER_URI, { transports: ['websocket'] })

export const init = (store) => {
    // TODO maybe check orig_version === version to see if create or not
    socket.on('node_update', (payload) => {
        console.log(`UPDATE: ${JSON.stringify(payload)}`)
        payload.nodes.forEach(node => {
            switch(node.type) {
                case 'ColumnHeader':
                    if(node.orig_version === node.version) {
                        store.dispatch(receiveColumn({
                            id: node.id,
                            name: node.content.name,
                            parent_id: node.parent,
                            orig_version: node.orig_version,
                            cards: []
                        }))
                    } else {
                        store.dispatch(successfulColumnUpdate(node))
                    }
                    break
                case 'Board':
                    // currently not a thing
                    break
                case 'Content':
                    store.dispatch(successfulCardUpdate(node))
                    break
            }
        })
    })

    socket.on('node_del', (payload) => {
        console.log(`DELETE: ${JSON.stringify(payload)}`)
        payload.nodes.forEach(node => {
            switch(node.type) {
                case 'ColumnHeader':
                    store.dispatch(successfulColumnDelete(node.id))
                    break
                case 'Board':
                    store.dispatch(successfulDeleteBoard(node.id))
                    break
                case 'Content':
                    store.dispatch(successfulCardDelete(node.id))
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
