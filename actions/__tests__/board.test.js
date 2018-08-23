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

    test('should create an action for toggling editing boards', () => {
        expect(actions.toggleEditingBoards()).toEqual({
            type: actionTypes.TOGGLE_EDIT_BOARDS
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
        
        moxios.stubRequest('/api/v1/boards?sort_key=last_updated_time&sort_order=DESC', {
            status: 200,
            response: {
                boards: [
                    { id: 'something', content: { name: 'hi' } }
                ]
            }
        })

        return store.dispatch(actions.getBoards('last_updated_time')).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should error when the get boards API errors', () => {
        const expectedActions = [
            { type: actionTypes.FETCH_BOARDS },
            { type: actionTypes.FETCH_BOARDS_ERROR, error: 'error' }
        ]
        const store = mockStore({ boards: [] })
        
        moxios.stubRequest('/api/v1/boards?sort_key=last_updated_time&sort_order=DESC', {
            status: 500,
            statusText: 'error'
        })

        return store.dispatch(actions.getBoards('last_updated_time')).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should create a column', () => {
        const expectedActions = [
            {
                type: actionTypes.RECEIVE_COLUMN,
                column: {
                    id: 'column id',
                    content: { name: 'hello' },
                    parent_id: 'hi',
                    orig_version: 1,
                    cards: []
                }
            }
        ]
        const store = mockStore({ board: { id: 'hi', columns: [] } })
        
        moxios.stubRequest('/api/v1/boards/hi/nodes', {
            status: 200,
            response: {
                id: 'column id',
                content: { name: 'hello' },
                parent: 'hi',
                orig_version: 1,
                cards: []
            }
        })

        return store.dispatch(actions.createColumn('hello')).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should create a card', () => {
        const expectedActions = [
            {
                type: actionTypes.RECEIVE_CARD,
                card: {
                    id: 'card id',
                    content: { text: 'card value', votes: 0 },
                    parent: 'column id',
                    column_header: 'column id'
                },
                columnId: 'column id'
            }
        ]
        const store = mockStore({
            board: {
                id: 'hi',
                columns: [
                    { id: 'column id', parent_id: 'hi', orig_version: 1, content: { name: 'hello' }, cards: [] } 
                ]
            }
        })
        
        moxios.stubRequest('/api/v1/boards/hi/nodes', {
            status: 200,
            response: {
                id: 'card id',
                content: { text: 'card value', votes: 0 },
                parent: 'column id',
                orig_version: 1,
                column_header: 'column id'
            }
        })

        return store.dispatch(actions.createCard('card value', 'column id')).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should vote', () => {
        const expectedActions = []
        const store = mockStore({
            board: {
                id: 'hi',
                columns: [
                    {
                        id: 'column id',
                        parent_id: 'hi',
                        orig_version: 1,
                        content: { name: 'hello' },
                        cards: [
                            { id: '1', content: { text: 'hi', votes: 0 } }
                        ]
                    } 
                ]
            }
        })

        moxios.stubRequest('/api/v1/boards/hi/nodes/1', { status: 200 })

        return store.dispatch(actions.vote('1', 1)).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should delete card', () => {
        const expectedActions = [
            { type: actionTypes.DELETE_CARD, cardId: '1' }
        ]
        const store = mockStore({
            board: {
                id: 'hi',
                columns: [
                    {
                        id: 'column id',
                        parent_id: 'hi',
                        orig_version: 1,
                        content: { name: 'hello' },
                        cards: [
                            { id: '1', content: { text: 'hi', votes: 0 } }
                        ]
                    } 
                ]
            }
        })

        moxios.stubRequest('/api/v1/boards/hi/nodes/1', { status: 200 })

        return store.dispatch(actions.deleteCard('1')).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should delete column', () => {
        const expectedActions = [
            { type: actionTypes.DELETE_COLUMN, columnId: 'columnid' }
        ]
        const store = mockStore({
            board: {
                id: 'hi',
                columns: [
                    {
                        id: 'columnid',
                        parent_id: 'hi',
                        orig_version: 1,
                        content: { name: 'hello' },
                        cards: [
                            { id: '1', content: { text: 'hi', votes: 0 } }
                        ]
                    } 
                ]
            }
        })

        moxios.stubRequest('/api/v1/boards/hi/nodes/columnid?cascade=true', { status: 200 })

        return store.dispatch(actions.deleteColumn('columnid')).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should delete board', () => {
        const expectedActions = [
            { type: actionTypes.FETCH_BOARDS }
        ]
        const store = mockStore({
            board: {
                id: 'hi',
                columns: [
                    {
                        id: 'columnid',
                        parent_id: 'hi',
                        orig_version: 1,
                        content: { name: 'hello' },
                        cards: [
                            { id: '1', content: { text: 'hi', votes: 0 } }
                        ]
                    } 
                ]
            }
        })

        moxios.stubRequest('/api/v1/boards/hi', { status: 200 })

        return store.dispatch(actions.deleteBoard('hi')).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should update column', () => {
        const expectedActions = [
            { type: actionTypes.UPDATE_COLUMN, column: { id: 'columnid', content: { name: 'hi' } } }
        ]
        const store = mockStore({
            board: {
                id: 'hi',
                columns: [
                    {
                        id: 'columnid',
                        parent_id: 'hi',
                        orig_version: 1,
                        content: { name: 'hello' },
                        cards: [
                            { id: '1', content: { text: 'hi', votes: 0 } }
                        ]
                    } 
                ]
            }
        })

        moxios.stubRequest('/api/v1/boards/hi/nodes/columnid', {
            status: 200,
            response: {
                id: 'columnid',
                content: {
                    name: 'hi'
                }
            }
        })

        return store.dispatch(actions.updateColumn('columnid', { operations: [{ field: 'name', value: 'hi', operation: 'SET' }] })).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should update card', () => {
        const expectedActions = [
            { type: actionTypes.UPDATE_CARD, card: { id: '1', content: { text: 'hi there' } } }
        ]
        const store = mockStore({
            board: {
                id: 'hi',
                columns: [
                    {
                        id: 'columnid',
                        parent_id: 'hi',
                        orig_version: 1,
                        content: { name: 'hello' },
                        cards: [
                            { id: '1', content: { text: 'hi', votes: 0 } }
                        ]
                    } 
                ]
            }
        })

        moxios.stubRequest('/api/v1/boards/hi/nodes/1', {
            status: 200,
            response: {
                id: '1',
                content: {
                    text: 'hi there'
                }
            }
        })

        return store.dispatch(actions.updateCard('1', { operations: [{ field: 'text', value: 'hi there', operation: 'SET' }] })).then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})
