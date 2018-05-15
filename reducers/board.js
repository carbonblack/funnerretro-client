import * as actionTypes from '../constants/actionTypes'
import update from 'immutability-helper'

const initialState = {
    name: '',
    id: '',
    isFetchingBoard: false,
    isFetchingBoards: false,
    boards: [],
    columns: []
}

let id = 7

const board = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RECEIVE_CARD:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id !== action.columnId) return column
                    return {
                        ...column,
                        cards: [...column.cards, {
                            ...action.card,
                            id: ++id // TODO remove this
                        }]
                    }
                })
            }
        case actionTypes.RECEIVE_COLUMN:
            return {
                ...state,
                columns: [...state.columns, action.column]
            }
        case actionTypes.RECEIVE_MOVED_CARD:
            return {
                ...state,
                columns: state.columns.map((column) => {
                    if(column.id !== action.columnId) return column
                    return update(column, {
                        cards: {
                            $splice: [[action.dragIndex, 1], [action.hoverIndex, 0, column.cards[action.dragIndex]]]
                        }
                    })
                })
            }
        case actionTypes.VOTE_ON_CARD:
            return {
                ...state,
                columns: state.columns.map((column) => {
                    return {
                        ...column,
                        cards: column.cards.map((card) => {
                            if(card.id !== action.cardId) return card
                            return {
                                ...card,
                                votes: card.votes + 1
                            }
                        })
                    }
                })
            }
        case actionTypes.RECEIVE_BOARDS:
            return {
                ...state,
                boards: action.boards,
                isFetchingBoards: false
            }
        case actionTypes.RECEIVE_BOARD:
            return {
                ...state,
                name: action.board.name,
                id: action.board.id,
                columns: action.board.columns,
                isFetchingBoard: false
            }
        case actionTypes.FETCH_BOARDS:
            return {
                ...state,
                isFetchingBoards: true
            }
        case actionTypes.FETCH_BOARD:
            return {
                ...state,
                isFetchingBoard: true
            }
        case actionTypes.DELETE_CARD:
            return {
                ...state,
                columns: state.columns.map((column) => {
                    const index = column.cards.map(card => card.id).indexOf(action.cardId)
                    return {
                        ...column,
                        cards: [
                            ...column.cards.slice(0, index),
                            ...column.cards.slice(index + 1)
                        ]
                    }
                })
            }
        case actionTypes.DELETE_COLUMN:
            const index = state.columns.map(column => column.id).indexOf(action.columnId)
            return {
                ...state,
                columns: [
                    ...state.columns.slice(0, index),
                    ...state.columns.slice(index + 1)
                ]
            }
        default:
            return state
    }
}

export default board
