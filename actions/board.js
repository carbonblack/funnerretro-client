import * as actionTypes from '../constants/actionTypes'
import * as headers from '../constants/headers'
import axios from 'axios'
import { push } from 'react-router-redux'

let columnOrder = 0

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
    return (dispatch) => {
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
        }).then(response => dispatch(successfulVote(cardId)))
    }
}

export const successfulVote = cardId => ({
    type: actionTypes.VOTE_ON_CARD,
    cardId
})

export const getBoards = () => {
    return (dispatch) => {
        dispatch(fetchBoards())
        axios.get('/api/v1/boards')
            .then((response) => {
                const boards = response.data.boards.map(board => ({
                    name: board.content.name,
                    id: board.id
                }))
                dispatch(receiveBoards(boards))
            })
            .catch(response => dispatch(getBoardsError(response.response.statusText)))
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
        axios.get(`/api/v1/boards/${ boardId }`)
            .then((response) => {
                const board = response.data.nodes.filter(node => node.id === boardId)[0]
                const columns = response.data.nodes.filter(node => node.parent === boardId).map((column) => {
                    return {
                        name: column.content.name,
                        id: column.id,
                        parent: column.parent,
                        child: column.child,
                        orig_version: column.orig_version,
                        cards: constructCards(response.data.nodes, column.id)
                    }
                }).sort((a, b) => a.orig_version > b.orig_version)

                dispatch(receiveBoard({
                    name: board.content.name,
                    id: board.id,
                    columns: columns
                }))
            })
            .catch(response => dispatch(getBoardError(response.response.statusText)))
    }
}

// TODO clean this shit up
const constructCards = (nodes, initialParent) => {
    let parent = initialParent
    let cards = []
    while(parent != null) {
        const card = nodes.filter(node => node.parent === parent).map(n => ({
            text: n.content.text,
            id: "id" in n ? n.id : null,
            parent: n.parent,
            votes: n.content.votes
        }))[0]

        if(card) {
            cards.push(card)
        } else {
            break
        }

        parent = cards[cards.length - 1].id
    }

    return cards
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
            .then(response =>  dispatch(successfulCardDelete(cardId)))
    }
}

export const successfulCardDelete = (cardId) => ({
    type: actionTypes.DELETE_CARD,
    cardId
})

export const deleteColumn = (columnId) => {
    return (dispatch, getState) => {
        axios.delete(`/api/v1/boards/${ getState().board.id }/nodes/${ columnId }`)
            .then(response => dispatch(successfulColumnDelete(columnId)))
    }
}

export const successfulColumnDelete = (columnId) => ({
    type: actionTypes.DELETE_COLUMN,
    columnId
})

export const createBoard = (board) => {
    return (dispatch) => {
        axios.post('/api/v1/boards', { name: board.name }, headers.json)
            .then((response) => {
                dispatch(receiveBoard({
                    name: response.data.content.name,
                    id: response.data.id,
                    columns: []
                }))
                dispatch(push(`/board/${ response.data.id }`))
            })
    }
}

export const deleteBoard = (boardId) => {
    return (dispatch) => {
        axios.delete(`/api/v1/boards/${ boardId }`)
            .then((response) => {
                dispatch(successfulDeleteBoard(boardId))
                dispatch(push('/'))
            })
    }
}

export const successfulDeleteBoard = (boardId) => ({
    type: actionTypes.DELETE_BOARD,
    boardId
})
