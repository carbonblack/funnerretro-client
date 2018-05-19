import io from 'socket.io-client'
import { successfulCardUpdate, successfulCardDelete, successfulColumnDelete, successfulDeleteBoard, successfulColumnUpdate, receiveColumn, receiveCard, reevaluateColumn } from './board'

const socket = io(location.protocol + '//' + document.domain + ':5124/websocket', { transports: ['websocket'] })

export const init = (store) => {
    socket.on('node_update', (payload) => {
        payload.nodes.forEach(node => {
            switch(node.type) {
            case 'ColumnHeader':
                if(node.orig_version === node.version) {
                    store.dispatch(receiveColumn({
                        id: node.id,
                        content: node.content,
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
                        content: node.content,
                        id: node.id,
                        parent: node.parent,
                        column_header: node.column_header,
                        orig_version: node.orig_version
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
    })
}

export const subscribeToBoard = boardId => {
    socket.emit('subscribe', { board_id: boardId })
}

export const unsubscribeToBoard = boardId => {
    socket.emit('unsubscribe', { board_id: boardId })
}
