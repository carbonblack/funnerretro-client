import * as actions from 'actions/templates'
import * as actionTypes from 'constants/actionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

const mockStore = configureMockStore([thunk])

describe('templates synchronous actions', () => {
    test('should create an action to add a card to state', () => {
        const templates = [
            { something: 'else' },
            { blah: 'blah' }
        ]
        expect(actions.receiveTemplates(templates)).toEqual({
            type: actionTypes.RECEIVE_TEMPLATES,
            templates
        })
    })
})

describe('templates async actions', () => {
    beforeEach(() => {
        moxios.install()
    })
    
    afterEach(() => {
        moxios.uninstall()
    })

    it('should receive templates from a successful templates API call', () => {
        const expectedActions = [{ type: actionTypes.RECEIVE_TEMPLATES, templates: ['do something'] }]
        const store = mockStore({ templates: [] })
        
        moxios.stubRequest('/api/v1/templates', {
            status: 200,
            response: {
                templates: ['do something']
            }
        })

        return store.dispatch(actions.getTemplates()).then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})