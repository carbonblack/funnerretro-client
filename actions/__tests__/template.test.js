import * as actions from 'actions/template'
import * as actionTypes from 'constants/actionTypes'

describe('boards synchronous actions', () => {
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
