import * as actionTypes from '../constants/actionTypes'
import * as headers from '../constants/headers'
import axios from 'axios'
import { push } from 'react-router-redux'

let tmp = 0

export const createCard = (value, columnId) => {
    return (dispatch) => {
        dispatch(receiveCard({
            id: value,
            text: value,
            votes: 0   
        }, columnId))
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
                cards: []
            }))
        })
    }
}

export const receiveColumn = column => ({
    type: actionTypes.RECEIVE_COLUMN,
    column
})

// TODO also make API request to update card
export const vote = cardId => ({
    type: actionTypes.VOTE_ON_CARD,
    cardId
})

export const getBoards = () => {
    return (dispatch) => {
        dispatch(fetchBoards())
        axios.get('/api/v1/boards')
            .then((response) => {
                const boards = response.data.boards.map(board => {
                    return {
                        name: board.content.name,
                        id: board.id
                    }
                })
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
            .then(response => dispatch(receiveBoard(response.data.nodes[0])))
            .catch(response => dispatch(getBoardError(response.response.statusText)))
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
    }
}

export const successfulCardDelete = (cardId) => ({
    type: actionTypes.DELETE_CARD,
    cardId
})

export const deleteColumn = (columnId) => {
    return (dispatch) => {
        dispatch(successfulColumnDelete(columnId))
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
                dispatch(receiveBoard(response.data))
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
