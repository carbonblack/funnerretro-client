import * as actionTypes from '../constants/actionTypes'

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
