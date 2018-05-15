import * as actionTypes from '../constants/actionTypes'
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

export const vote = cardId => ({
    type: actionTypes.VOTE_ON_CARD,
    cardId
})

export const getBoards = () => {
    return (dispatch) => {
        dispatch(fetchBoards())
        dispatch(receiveBoards({ boards: [] }))
    }
}

export const fetchBoards = () => ({
    type: actionTypes.FETCH_BOARDS
})

export const receiveBoards = (boards) => ({
    type: actionTypes.RECEIVE_BOARDS,
    boards
})

export const getBoard = () => {
    return (dispatch) => {
        dispatch(fetchBoard())
        dispatch(receiveBoard({
            name: '',
            id: '',
            columns: []
        }))
    }
}

export const fetchBoard = () => ({
    type: actionTypes.FETCH_BOARD
})

export const receiveBoard = (board) => ({
    type: actionTypes.RECEIVE_BOARD,
    board
})

export const deleteCard = (cardId) => {
    return (dispatch) => {
        dispatch(successfulCardDelete(cardId))
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
        dispatch(receiveBoard({
            ...board,
            id: ++tmp // TODO change
        }))
        dispatch(push(`/board/${ tmp }`)) // TODO change
    }
}
