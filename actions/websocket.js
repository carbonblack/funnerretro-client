import io from 'socket.io-client'
import { successfulCardUpdate, successfulCardDelete, successfulColumnDelete, successfulDeleteBoard, successfulColumnUpdate, receiveColumn, receiveCard, reevaluateColumn } from './board';

const socket = io(WEBSOCKET_SERVER_URI, { transports: ['websocket'] })

export const init = (store) => {
    socket.on('node_update', (payload) => {
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
                case 'Content':
                    if(node.orig_version === node.version) {
                        store.dispatch(receiveCard({
                            text: node.content.text,
                            id: node.id,
                            parent: node.parent,
                            column_header: node.column_header,
                            votes: 0
                        }, node.column_header))
                    } else {
                        store.dispatch(successfulCardUpdate(node))
                    }
                    break
            }
        })

        payload.nodes.map(node => node.column_header).forEach((columnId) => {
            store.dispatch(reevaluateColumn(columnId))
        })
    })

    socket.on('node_del', (payload) => {
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

        payload.nodes.filter(node => node.type === 'Content').map(node => node.column_header).forEach(columnId => store.dispatch(reevaluateColumn(columnId)))
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
