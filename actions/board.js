import * as actionTypes from '../constants/actionTypes'
import * as headers from '../constants/headers'
import axios from 'axios'
import { push } from 'react-router-redux'

export const createCard = (value, columnId) => {
    return (dispatch, getState) => {
        const boardId = getState().board.id
        const cardsInColumn = getState().board.columns.filter(column => column.id === columnId)[0].cards
        const parentCard = cardsInColumn[cardsInColumn.length - 1]
        axios.post(`/api/v1/boards/${ boardId }/nodes`, {
            parent_id: parentCard ? parentCard.id : columnId,
            content: {
                text: value,
                votes: 0
            }
        }, headers.json).then((response) => {
            dispatch(receiveCard({
                text: response.data.content.text,
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

// TODO change these indices to card ids
export const moveCard = (columnId, dragIndex, hoverIndex) => {
    return (dispatch, getState) => {
        const dragCardId = getState().board.columns.filter(column => column.id === columnId)[0].cards[dragIndex].id
        const hoverCardId = getState().board.columns.filter(column => column.id === columnId)[0].cards[hoverIndex].id
        // console.log(`DRAG: ${ dragIndex }, HOVER: ${ hoverIndex }`)
        // axios.put(`/api/v1/boards/${ getState().board.id }/nodes/${ dragCardId }`, {
        //     parent_id: hoverCardId
        // }, headers.json).then(response => console.log(response))
        dispatch(receiveMovedCard(columnId, dragIndex, hoverIndex))
    }
}

export const receiveMovedCard = (columnId, dragIndex, hoverIndex) => ({
    type: actionTypes.RECEIVE_MOVED_CARD,
    columnId,
    dragIndex,
    hoverIndex
})

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
                name: response.data.content.name,
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

export const vote = cardId => {
    return (dispatch, getState) => {
        axios.put(`/api/v1/boards/${ getState().board.id }/nodes/${ cardId }`, {
            field: 'votes',
            value: 1,
            operation: 'INCR'
        })
    }
}

export const successfulVote = cardId => ({
    type: actionTypes.VOTE_ON_CARD,
    cardId
})

export const getBoards = () => {
    return (dispatch) => {
        dispatch(fetchBoards())
        axios.get('/api/v1/boards').then((response) => {
            dispatch(receiveBoards(response.data.boards.map(board => ({
                name: board.content.name,
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
                name: column.content.name,
                id: column.id,
                parent: column.parent,
                child: column.child,
                orig_version: column.orig_version,
                cards: ((nodes, parent) => {
                    let cards = []
                    while(parent) {
                        const card = nodes.filter(node => node.parent === parent).map(n => ({
                            text: n.content.text,
                            id: "id" in n ? n.id : null,
                            parent: n.parent,
                            column_header: n.column_header,
                            votes: n.content.votes
                        }))[0]

                        if(!card) break

                        cards.push(card)
                        parent = cards[cards.length - 1].id
                    }

                    return cards
                })(response.data.nodes, column.id)
            })).sort((a, b) => a.orig_version > b.orig_version)

            dispatch(receiveBoard({
                name: board.content.name,
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
            .then(response => dispatch(successfulCardDelete(cardId)))
    }
}

export const successfulCardDelete = (cardId) => ({
    type: actionTypes.DELETE_CARD,
    cardId
})

export const deleteColumn = (columnId) => {
    return (dispatch, getState) => {
        axios.delete(`/api/v1/boards/${ getState().board.id }/nodes/${ columnId }`, { cascade: true }, headers.json)
            .then(response => dispatch(successfulColumnDelete(columnId)))
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
                        name: node.content.name,
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
        axios.delete(`/api/v1/boards/${ boardId }`).then((response) => {
            dispatch(successfulDeleteBoard(boardId))
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

export const getTemplates = () => {
    return (dispatch) => {
        axios.get(`/api/v1/templates`).then(response => dispatch(receiveTemplates(response.data.templates)))
    }
}

export const receiveTemplates =  templates => ({
    type: actionTypes.RECEIVE_TEMPLATES,
    templates
})
