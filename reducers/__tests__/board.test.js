import * as actions from 'constants/actionTypes'
import reducer from 'reducers/board'

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

    test('should receive card if the card doesn\'t exist', () => {
        expect(reducer({
            columns: [
                {
                    id: '1',
                    cards: []
                }
            ]
        }, {
            type: actions.RECEIVE_CARD,
            columnId: '1',
            card: {
                id: 'hi',
                content: {
                    text: 'gjgjg'
                }
            }
        })).toEqual({
            columns: [
                {
                    id: '1',
                    cards: [
                        {
                            id: 'hi',
                            content: {
                                text: 'gjgjg'
                            }
                        }
                    ]
                }
            ]
        })
    })

    test('should not change the card if receiving a card that already exists', () => {
        expect(reducer({
            columns: [
                {
                    id: '1',
                    cards: [
                        {
                            id: 'hi',
                            content: {
                                text: 'gjgjg'
                            }
                        }
                    ]
                }
            ]
        }, {
            type: actions.RECEIVE_CARD,
            columnId: '1',
            card: {
                id: 'hi',
                content: {
                    text: 'different text'
                }
            }
        })).toEqual({
            columns: [
                {
                    id: '1',
                    cards: [
                        {
                            id: 'hi',
                            content: {
                                text: 'gjgjg'
                            }
                        }
                    ]
                }
            ]
        })
    })

    test('should not receive the card if columnId does not exist', () => {
        expect(reducer({
            columns: [
                {
                    id: '12',
                    cards: []
                }
            ]
        }, {
            type: actions.RECEIVE_CARD,
            columnId: '1',
            card: {
                id: 'hi',
                content: {
                    text: 'different text'
                }
            }
        })).toEqual({
            columns: [
                {
                    id: '12',
                    cards: []
                }
            ]
        })
    })

    test('should receive column if it doesn\'t exist', () => {
        expect(reducer({
            columns: []
        }, {
            type: actions.RECEIVE_COLUMN,
            column: {
                id: '11',
                content: {
                    text: 'hello'
                },
                cards: []
            }
        })).toEqual({
            columns: [
                {
                    id: '11',
                    content: {
                        text: 'hello'
                    },
                    cards: []
                }
            ]
        })
    })

    test('should not change column if receiving a column that already exists', () => {
        expect(reducer({
            columns: [
                {
                    id: '11',
                    content: {
                        text: 'hello'
                    },
                    cards: []
                }
            ]
        }, {
            type: actions.RECEIVE_COLUMN,
            column: {
                id: '11',
                content: {
                    text: 'different text'
                },
                cards: []
            }
        })).toEqual({
            columns: [
                {
                    id: '11',
                    content: {
                        text: 'hello'
                    },
                    cards: []
                }
            ]
        })
    })

    test('should delete column with given id', () => {
        expect(reducer({
            columns: [
                {
                    id: '12'
                },
                {
                    id: '13'
                },
                {
                    id: '14'
                },
                {
                    id: '15'
                }
            ]
        }, {
            type: actions.DELETE_COLUMN,
            columnId: '14'
        })).toEqual({
            columns: [
                {
                    id: '12'
                },
                {
                    id: '13'
                },
                {
                    id: '15'
                }
            ]
        })
    })

    test('should leave board unchanged when deleting a column that does not exist', () => {
        expect(reducer({
            columns: [
                {
                    id: '12'
                },
                {
                    id: '13'
                }
            ]
        }, {
            type: actions.DELETE_COLUMN,
            columnId: 'random'
        })).toEqual({
            columns: [
                {
                    id: '12'
                },
                {
                    id: '13'
                }
            ]
        })
    })

    test('should delete card with given id', () => {
        expect(reducer({
            columns: [
                {
                    id: '1',
                    cards: [
                        {
                            id: 'a',
                        },
                        {
                            id: 'b',
                        },
                        {
                            id: 'c',
                        },
                        {
                            id: 'd',
                        }
                    ]
                }
            ]
        }, {
            type: actions.DELETE_CARD,
            cardId: 'b'
        })).toEqual({
            columns: [
                {
                    id: '1',
                    cards: [
                        {
                            id: 'a',
                        },
                        {
                            id: 'c',
                        },
                        {
                            id: 'd',
                        }
                    ]
                }
            ]
        })
    })

    test('should leave column unchanged when deleting a card that does not exist in the column', () => {
        expect(reducer({
            columns: [
                {
                    id: '1',
                    cards: [
                        {
                            id: 'a',
                        },
                        {
                            id: 'b',
                        }
                    ]
                }
            ]
        }, {
            type: actions.DELETE_CARD,
            cardId: 'random'
        })).toEqual({
            columns: [
                {
                    id: '1',
                    cards: [
                        {
                            id: 'a',
                        },
                        {
                            id: 'b',
                        }
                    ]
                }
            ]
        })
    })
})
