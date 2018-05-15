import * as actionTypes from '../constants/actionTypes'
import update from 'immutability-helper'

const initialState = {
    name: '',
    id: '',
    isFetchingBoard: false,
    boardError: false,
    isFetchingBoards: false,
    boardsError: false,
    boards: [],
    columns: []
}

const board = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RECEIVE_CARD:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id !== action.columnId) return column
                    return {
                        ...column,
                        cards: [...column.cards, action.card]
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
                isFetchingBoards: false,
                boardsError: false
            }
        case actionTypes.RECEIVE_BOARD:
            return {
                ...state,
                name: action.board.content.name,
                id: action.board.id,
                columns: action.board.children,
                isFetchingBoard: false,
                boardError: false
            }
        case actionTypes.FETCH_BOARDS_ERROR:
            return {
                ...state,
                isFetchingBoards: false,
                boardsError: action.error
            }
        case actionTypes.FETCH_BOARDS:
            return {
                ...state,
                isFetchingBoards: true,
                boardsError: false
            }
        case actionTypes.FETCH_BOARD:
            return {
                ...state,
                isFetchingBoard: true,
                boardError: false
            }
        case actionTypes.FETCH_BOARD_ERROR:
            return {
                ...state,
                isFetchingBoard: false,
                boardError: action.error
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
        case actionTypes.DELETE_BOARD:
            return {
                ...state,
                id: '',
                name: '',
                columns: []
            }
        default:
            return state
    }
}

export default board
