import * as actions from 'actions/board'
import * as actionTypes from 'constants/actionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

const mockStore = configureMockStore([thunk])

describe('boards synchronous actions', () => {
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
        const board = { name: 'test', children: [], id: 'test id' }
        expect(actions.receiveBoard(board)).toEqual({
            type: actionTypes.RECEIVE_BOARD,
            board
        })
    })

    test('should create an action to add boards to state', () => {
        const boards = [{ name: 'test', columns: [], id: 'test' }, { name: 'test2', columns: [], id: 'test2' }]
        expect(actions.receiveBoards(boards)).toEqual({
            type: actionTypes.RECEIVE_BOARDS,
            boards
        })
    })

    test('should create an action for deleting a card', () => {
        const cardId = 'skjdnfskjdnf'
        expect(actions.successfulCardDelete(cardId)).toEqual({
            type: actionTypes.DELETE_CARD,
            cardId
        })
    })

    test('should create an action for deleting a column', () => {
        const columnId = 'skjdnfskjdnf'
        expect(actions.successfulColumnDelete(columnId)).toEqual({
            type: actionTypes.DELETE_COLUMN,
            columnId
        })
    })

    test('should create an action for when we get an error fetching a board', () => {
        const error = { error: 'kjsdnfk' }
        expect(actions.getBoardError(error)).toEqual({
            type: actionTypes.FETCH_BOARD_ERROR,
            error
        })
    })

    test('should create an action for when we get an error fetching boards', () => {
        const error = { error: 'kjsdnfk' }
        expect(actions.getBoardsError(error)).toEqual({
            type: actionTypes.FETCH_BOARDS_ERROR,
            error
        })
    })

    test('should create an action for fetching a board', () => {
        expect(actions.fetchBoard()).toEqual({
            type: actionTypes.FETCH_BOARD
        })
    })

    test('should create an action for fetching boards', () => {
        expect(actions.fetchBoards()).toEqual({
            type: actionTypes.FETCH_BOARDS
        })
    })

    test('should create an action for updating a column', () => {
        const column = { name: 'hello' }
        expect(actions.successfulColumnUpdate(column)).toEqual({
            type: actionTypes.UPDATE_COLUMN,
            column
        })
    })
})

describe('boards asynchronous actions', () => {
    beforeEach(() => {
        moxios.install()
    })
    
    afterEach(() => {
        moxios.uninstall()
    })

    it('should get boards', () => {
        const expectedActions = [
            { type: actionTypes.FETCH_BOARDS },
            { type: actionTypes.RECEIVE_BOARDS, boards: [{ id: 'something', content: { name: 'hi' } }] }
        ]
        const store = mockStore({ boards: [] })
        
        moxios.stubRequest('/api/v1/boards', {
            status: 200,
            response: {
                boards: [
                    { id: 'something', content: { name: 'hi' } }
                ]
            }
        })

        return store.dispatch(actions.getBoards()).then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})
