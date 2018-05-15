import * as actions from './board'
import * as actionTypes from '../constants/actionTypes'

test('should create an action to add a card to state', () => {
    const card = { name: 'test name' }
    const columnId = '1'
    expect(actions.receiveCard(card, columnId)).toEqual({
        type: actionTypes.RECEIVE_CARD,
        card,
        columnId
    })
})

test('should create an action to add a column to state', () => {
    const column = { text: 'test name' }
    expect(actions.receiveColumn(column)).toEqual({
        type: actionTypes.RECEIVE_COLUMN,
        column
    })
})

test('should create an action to add a board to state', () => {
    
})
