import * as actionTypes from 'constants/actionTypes'
import * as headers from 'constants/headers'
import axios from 'axios'
import { push } from 'react-router-redux'

export const createCard = (value, columnId) => {
    return (dispatch, getState) => {
        const boardId = getState().board.id
        axios.post(`/api/v1/boards/${ boardId }/nodes`, {
            parent_id: columnId,
            content: {
                text: value,
                votes: 0
            }
        }, headers.json).then((response) => {
            dispatch(receiveCard({
                content: response.data.content,
                id: response.data.id,
                parent: response.data.parent,
                column_header: response.data.column_header,
                votes: 0
            }, columnId))
        })
    }
}

export const receiveCard = (card, columnId) => ({
    type: actionTypes.RECEIVE_CARD,
    card,
    columnId
})

export const moveCard = (columnId, dragIndex, hoverIndex) => {
    return (dispatch, getState) => {
        const dragCard = getState().board.columns.filter(column => column.id === columnId)[0].cards[dragIndex]
        const hoverCard = getState().board.columns.filter(column => column.id === columnId)[0].cards[hoverIndex]

        const newParentId = dragIndex > hoverIndex ? hoverCard.parent : hoverCard.id

        axios.put(`/api/v1/boards/${ getState().board.id }/nodes/${ dragCard.id }`, {
            parent_id: newParentId
        }, headers.json)
    }
}

export const createColumn = (value) => {
    return (dispatch, getState) => {
        const boardId = getState().board.id
        axios.post(`/api/v1/boards/${ boardId }/nodes`, {
            parent_id: boardId,
            content: {
                name: value
            }
        }, headers.json).then((response) => {
            dispatch(receiveColumn({
                id: response.data.id,
                content: response.data.content,
                parent_id: response.data.parent,
                orig_version: response.data.orig_version,
                cards: []
            }))
        })
    }
}

export const receiveColumn = column => ({
    type: actionTypes.RECEIVE_COLUMN,
    column
})

export const vote = (cardId, v) => {
    return (dispatch, getState) => {
        axios.put(`/api/v1/boards/${ getState().board.id }/nodes/${ cardId }`, {
            operations: [
                {
                    field: 'votes',
                    value: v,
                    operation: 'INCR'
                }
            ]
        })
    }
}

export const getBoards = () => {
    return (dispatch) => {
        dispatch(fetchBoards())
        axios.get('/api/v1/boards').then((response) => {
            dispatch(receiveBoards(response.data.boards.map(board => ({
                content: board.content,
                id: board.id
            }))))
        }).catch(response => dispatch(getBoardsError(response.response.statusText)))
    }
}

export const fetchBoards = () => ({
    type: actionTypes.FETCH_BOARDS
})

export const receiveBoards = boards => ({
    type: actionTypes.RECEIVE_BOARDS,
    boards
})

export const getBoardsError = error => ({
    type: actionTypes.FETCH_BOARDS_ERROR,
    error
})

export const getBoard = (boardId) => {
    return (dispatch) => {
        dispatch(fetchBoard())
        axios.get(`/api/v1/boards/${ boardId }`).then((response) => {
            const board = response.data.nodes.filter(node => node.id === boardId)[0]
            const columns = response.data.nodes.filter(node => node.parent === boardId).map((column) => ({
                content: column.content,
                id: column.id,
                parent: column.parent,
                child: column.child,
                orig_version: column.orig_version,
                cards: ((nodes, parent) => {
                    let cards = []
                    while(parent) {
                        const card = nodes.filter(node => node.parent === parent).map(n => ({
                            content: n.content,
                            id: 'id' in n ? n.id : null,
                            parent: n.parent,
                            column_header: n.column_header,
                            orig_version: n.orig_version
                        }))[0]

                        if(!card) break

                        cards.push(card)
                        parent = cards[cards.length - 1].id
                    }

                    return cards
                })(response.data.nodes, column.id)
            })).sort((a, b) => a.orig_version > b.orig_version)

            dispatch(receiveBoard({
                content: board.content,
                id: board.id,
                columns: columns
            }))
        }).catch(response => dispatch(getBoardError(response.response.statusText)))
    }
}

export const fetchBoard = () => ({
    type: actionTypes.FETCH_BOARD
})

export const receiveBoard = (board) => ({
    type: actionTypes.RECEIVE_BOARD,
    board
})

export const getBoardError = error => ({
    type: actionTypes.FETCH_BOARD_ERROR,
    error
})

export const deleteCard = (cardId) => {
    return (dispatch, getState) => {
        axios.delete(`/api/v1/boards/${ getState().board.id }/nodes/${ cardId }`)
            .then(() => dispatch(successfulCardDelete(cardId)))
    }
}

export const successfulCardDelete = (cardId) => ({
    type: actionTypes.DELETE_CARD,
    cardId
})

export const deleteColumn = (columnId) => {
    return (dispatch, getState) => {
        axios.delete(`/api/v1/boards/${ getState().board.id }/nodes/${ columnId }?cascade=true`, headers.json)
            .then(() => dispatch(successfulColumnDelete(columnId)))
    }
}

export const successfulColumnDelete = (columnId) => ({
    type: actionTypes.DELETE_COLUMN,
    columnId
})

export const createBoard = (board) => {
    return (dispatch) => {
        axios.post('/api/v1/boards', board, headers.json).then((response) => {
            response.data.nodes.forEach((node) => {
                if(node.type === 'Board') {
                    dispatch(receiveBoard({
                        content: node.content,
                        id: node.id,
                        columns: []
                    }))
                }
            })
            // only care about the first board for redirecting
            if(response.data.nodes.length > 0) dispatch(push(`/board/${ response.data.nodes[0].id }`))
        })
    }
}

export const deleteBoard = (boardId) => {
    return (dispatch) => {
        axios.delete(`/api/v1/boards/${ boardId }`).then(() => {
            dispatch(getBoards())
        })
    }
}

export const successfulDeleteBoard = boardId => {
    return (dispatch) => {
        dispatch(push('/boards'))
        dispatch({
            type: actionTypes.DELETE_BOARD,
            boardId
        })
    }
}

export const updateColumn = (columnId, data) => {
    return (dispatch, getState) => {
        axios.put(`/api/v1/boards/${ getState().board.id }/nodes/${ columnId }`, data, headers.json)
            .then(response => dispatch(successfulColumnUpdate(response.data)))
    }
}

export const successfulColumnUpdate = column => ({
    type: actionTypes.UPDATE_COLUMN,
    column
})

export const updateCard = (cardId, data) => {
    return (dispatch, getState) => {
        axios.put(`/api/v1/boards/${ getState().board.id }/nodes/${ cardId }`, data, headers.json)
            .then(response => dispatch(successfulCardUpdate(response.data)))
    }
}
  
export const successfulCardUpdate = card => ({
    type: actionTypes.UPDATE_CARD,
    card
})

export const reevaluateColumn = columnId => ({
    type: actionTypes.REBUILD_COLUMN,
    columnId
})
