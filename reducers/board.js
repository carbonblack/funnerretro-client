import * as actionTypes from '../constants/actionTypes'
import update from 'immutability-helper'

const initialState = {
    name: '',
    columns: [
        {
            id: "1",
            name: "column 1",
            cards: [
                {
                    id: "1",
                    text: "Hello",
                    votes: 2
                },
                {
                    id: "2",
                    text: "Hello 2",
                    votes: 5
                },
                {
                    id: "3",
                    text: "Hello 3",
                    votes: 6
                } 
            ]
        },
        {
            id: "2",
            name: "column 2",
            cards: [
                {
                    id: "4",
                    text: "Hello",
                    votes: 2
                },
                {
                    id: "5",
                    text: "Hello 2",
                    votes: 5
                },
                {
                    id: "6",
                    text: "Hello 3",
                    votes: 6
                } 
            ]
        }
    ]
}

const board = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.RECEIVE_CARD:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id != action.columnId) return column
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
                    if(column.id != action.columnId) return column
                    return update(column, {
                        cards: {
                            $splice: [[action.dragIndex, 1], [action.hoverIndex, 0, column.cards[action.dragIndex]]]
                        }
                    })
                })
            }
    }
    return state
}

export default board
