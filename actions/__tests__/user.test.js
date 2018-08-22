import * as actions from 'actions/user'
import * as actionTypes from 'constants/actionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

const mockStore = configureMockStore([thunk])

describe('username synchronous actions', () => {
    test('should create an action to add a username to state', () => {
        const username = 'jake'
        expect(actions.receiveUser(username)).toEqual({
            type: actionTypes.RECEIVE_USERNAME,
            username
        })
    })
})

describe('username async actions', () => {
    beforeEach(() => {
        moxios.install()
    })
    
    afterEach(() => {
        moxios.uninstall()
    })

    it('should receive username from a successful templates API call', () => {
        const expectedActions = [{ type: actionTypes.RECEIVE_USERNAME, username: 'jake' }]
        const store = mockStore({ username: '' })
        
        moxios.stubRequest('/api/v1/auth', {
            status: 200,
            response: {
                username: 'jake'
            }
        })

        return store.dispatch(actions.getUser()).then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})
