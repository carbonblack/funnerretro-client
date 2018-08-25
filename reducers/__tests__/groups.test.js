import * as actions from 'constants/actionTypes'
import reducer from 'reducers/groups'

describe('groups reducers', () => {
    test('should return initial state for undefined action', () => {
        expect(reducer(undefined, {})).toEqual({
            groups: [],
            isFetching: false,
            fetchingError: null
        })
    })

    test('should handle receiving groups', () => {
        expect(reducer({}, {
            type: actions.RECEIVE_GROUPS,
            groups: [
                {
                    id: '1',
                    name: 'hi'
                }
            ]
        })).toEqual({
            groups: [
                {
                    id: '1',
                    name: 'hi'
                }
            ],
            isFetching: false,
            fetchingError: null
        })
    })

    test('should handle fetching groups', () => {
        expect(reducer({}, {
            type: actions.FETCH_GROUPS
        })).toEqual({
            isFetching: true,
            fetchingError: null
        })
    })

    test('should handle fetching groups error', () => {
        expect(reducer({}, {
            type: actions.FETCH_GROUPS_ERROR,
            error: 'error here'
        })).toEqual({
            isFetching: false,
            fetchingError: 'error here'
        })
    })

    test('should handle receiving a single group', () => {
        expect(reducer({
            groups: [
                {
                    id: '1',
                    name: 'hi'
                }
            ]
        }, {
            type: actions.RECEIVE_GROUP,
            group: {
                id: '2',
                name: 'hi there'
            }
        })).toEqual({
            groups: [
                {
                    id: '1',
                    name: 'hi'
                },
                {
                    id: '2',
                    name: 'hi there'
                }
            ]
        })
    })
})
