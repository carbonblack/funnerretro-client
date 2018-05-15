import * as actionTypes from '../constants/actionTypes'
import axios from 'axios'

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
    return (dispatch) => {
        dispatch(receiveColumn({
            id: value,
            name: value,
            cards: []
        }))
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
        axios.get('/api/boards')
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
        axios.get(`/api/boards/${ boardId }`)
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
        axios.post(`/api/boards/${ getState().board.id }/nodes/${ cardId }`)
    }
}

// TODO add boardId
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
