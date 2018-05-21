import * as actions from '../../constants/actionTypes'
import reducer from '../board'

describe('board reducers', () => {
    test('should return initial state for undefined action', () => {
        expect(reducer(undefined, {})).toEqual({
            content: {},
            id: '',
            isFetchingBoard: false,
            boardError: false,
            isFetchingBoards: false,
            boardsError: false,
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
})
