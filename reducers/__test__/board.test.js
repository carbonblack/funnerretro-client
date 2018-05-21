import * as actions from '../../constants/actionTypes'
import reducer from '../board'

describe('board reducers', () => {
    test('should return initial state for undefined action', () => {
        expect(reducer(undefined, {})).toEqual({
            content: {},
            id: '',
            isFetchingBoard: false,
            boardError: null,
            isFetchingBoards: false,
            boardsError: null,
            boards: [],
            columns: [],
            templates: []
        })
    })

    test('should handle receiving templates', () => {
        expect(reducer({}, {
            type: actions.RECEIVE_TEMPLATES,
            templates: [
                {
                    id: '1',
                    name: 'hi',
                    description: 'hello there',
                    columns: ['one', 'two']
                }
            ]
        })).toEqual({
            templates:[
                {
                    id: '1',
                    name: 'hi',
                    description: 'hello there',
                    columns: ['one', 'two']
                }
            ]
        })
    })

    test('should update column with given id to have new information', () => {
        expect(reducer({
            columns: [
                {
                    id: 'hello',
                    content: {
                        name: 'name'
                    },
                    parent: 'hello-parent',
                    child: 'hello-child'
                },
                {
                    id: 'hellothere',
                    content: {
                        name: 'other name'
                    },
                    parent: 'hellothere-parent',
                    child: 'hellothere-child'
                }
            ]
        }, {
            type: actions.UPDATE_COLUMN,
            column: {
                id: 'hello',
                content: {
                    name: 'hello changed name'
                },
                parent: 'hello-parent-changed',
                child: 'hello-child-changed'
            }
        })).toEqual({
            columns: [
                {
                    id: 'hello',
                    content: {
                        name: 'hello changed name'
                    },
                    parent: 'hello-parent-changed',
                    child: 'hello-child-changed'
                },
                {
                    id: 'hellothere',
                    content: {
                        name: 'other name'
                    },
                    parent: 'hellothere-parent',
                    child: 'hellothere-child'
                }
            ]
        })
    })

    test('should reset board content if the board is deleted', () => {
        expect(reducer({
            id: 'board-id',
            content: {
                name: 'hello'
            },
            columns: [
                {
                    id: 'hellothere',
                    content: {
                        name: 'other name'
                    },
                    parent: 'hellothere-parent',
                    child: 'hellothere-child'
                }
            ]
        }, {
            type: actions.DELETE_BOARD
        })).toEqual({
            id: '',
            content: {},
            columns: []
        })
    })

    test('should update card with given id to have new information', () => {
        expect(reducer({
            columns: [
                {
                    id: 'hello',
                    content: {
                        name: 'name'
                    },
                    parent: 'hello-parent',
                    child: 'hello-child',
                    cards: [
                        {
                            id: 'hellocard1',
                            content: {
                                text: 'wooo'
                            },
                            parent: 'hellothere',
                            child: 'lalala',
                            column_header: 'hello'
                        },
                        {
                            id: 'hellocard2',
                            content: {
                                text: 'wooo2'
                            },
                            parent: 'hellothere2',
                            child: 'lalala2',
                            column_header: 'hello'
                        }
                    ]
                }
            ]
        }, {
            type: actions.UPDATE_CARD,
            card: {
                id: 'hellocard2',
                content: {
                    text: 'wooo-changed'
                },
                parent: 'changed',
                child: 'changed',
                column_header: 'changed'
            }
        })).toEqual({
            columns: [
                {
                    id: 'hello',
                    content: {
                        name: 'name'
                    },
                    parent: 'hello-parent',
                    child: 'hello-child',
                    cards: [
                        {
                            id: 'hellocard1',
                            content: {
                                text: 'wooo'
                            },
                            parent: 'hellothere',
                            child: 'lalala',
                            column_header: 'hello'
                        },
                        {
                            id: 'hellocard2',
                            content: {
                                text: 'wooo-changed'
                            },
                            parent: 'changed',
                            child: 'changed',
                            column_header: 'changed'
                        }
                    ]
                }
            ]
        })
    })

    test('should update fetching flags when fetching boards', () => {
        expect(reducer({}, {
            type: actions.FETCH_BOARDS
        })).toEqual({
            isFetchingBoards: true,
            boardsError: null
        })
    })

    test('should update fetching flags when fetching a board', () => {
        expect(reducer({}, {
            type: actions.FETCH_BOARD
        })).toEqual({
            isFetchingBoard: true,
            boardError: null
        })
    })

    test('should set board error', () => {
        expect(reducer({}, {
            type: actions.FETCH_BOARD_ERROR,
            error: 'hello'
        })).toEqual({
            boardError: 'hello',
            isFetchingBoard: false
        })
    })

    test('should set boards error', () => {
        expect(reducer({}, {
            type: actions.FETCH_BOARDS_ERROR,
            error: 'hello'
        })).toEqual({
            boardsError: 'hello',
            isFetchingBoards: false
        })
    })

    test('should receive boards', () => {
        expect(reducer({}, {
            type: actions.RECEIVE_BOARDS,
            boards: [
                {
                    id: '1',
                    name: 'hi1',
                    columns: []
                },
                {
                    id: '2',
                    name: 'hi2',
                    columns: []
                }
            ]
        })).toEqual({
            boards: [
                {
                    id: '1',
                    name: 'hi1',
                    columns: []
                },
                {
                    id: '2',
                    name: 'hi2',
                    columns: []
                }
            ],
            isFetchingBoards: false,
            boardsError: null
        })
    })

    test('should receive board', () => {
        expect(reducer({}, {
            type: actions.RECEIVE_BOARD,
            board: {
                id: '1',
                content: {
                    name: 'hi1'
                },
                columns: []
            }
        })).toEqual({
            id: '1',
            content: {
                name: 'hi1'
            },
            columns: [],
            isFetchingBoard: false,
            boardError: null
        })
    })
})
