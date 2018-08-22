import * as actions from 'constants/actionTypes'
import reducer from 'reducers/user'

describe('user reducers', () => {
    test('should return initial state for undefined action', () => {
        expect(reducer(undefined, {})).toEqual({
            username: ''
        })
    })

    test('should handle receiving username', () => {
        expect(reducer({}, {
            type: actions.RECEIVE_USERNAME,
            username: 'jake'
        })).toEqual({
            username: 'jake'
        })
    })
})
