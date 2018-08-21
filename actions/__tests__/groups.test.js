import * as actions from 'actions/groups'
import * as actionTypes from 'constants/actionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

const mockStore = configureMockStore([thunk])

describe('groups synchronous actions', () => {
    test('should create an action to receive groups', () => {
        const groups = [
            { content: { name: 'name here' }, id : 'hi' }
        ]
        expect(actions.receiveGroups(groups)).toEqual({
            type: actionTypes.RECEIVE_GROUPS,
            groups
        })
    })

    test('should create an action to fetch groups', () => {
        expect(actions.fetchGroups()).toEqual({
            type: actionTypes.FETCH_GROUPS
        })
    })

    test('should create an action to fetch groups', () => {
        const error = 'some error'

        expect(actions.getGroupsError(error)).toEqual({
            type: actionTypes.FETCH_GROUPS_ERROR,
            error
        })
    })
})

describe('groups async actions', () => {
    beforeEach(() => {
        moxios.install()
    })
    
    afterEach(() => {
        moxios.uninstall()
    })

    it('should receive groups from a successful groups API call', () => {
        const groups = [
            { content: { name: 'do something' }, id : 'hi' }
        ]
        const expectedActions = [
            { type: actionTypes.FETCH_GROUPS },
            { type: actionTypes.RECEIVE_GROUPS, groups }
        ]
        const store = mockStore({ groups: [], isFetching: false, fetchingError: null })
        
        moxios.stubRequest('/api/v1/groups', {
            status: 200,
            response: {
                groups
            }
        })

        return store.dispatch(actions.getGroups()).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    it('should error if the API request errors', () => {
        const expectedActions = [
            { type: actionTypes.FETCH_GROUPS },
            { type: actionTypes.FETCH_GROUPS_ERROR, error: 'error' }
        ]
        const store = mockStore({ groups: [], isFetching: false, fetchingError: null })
        
        moxios.stubRequest('/api/v1/groups', {
            status: 500,
            statusText: 'error'
        })

        return store.dispatch(actions.getGroups()).then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})
