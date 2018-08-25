import React from 'react'
import { shallow } from 'enzyme'
import { CardForm } from 'components/card/CardForm'

describe('CardForm test', () => {
    it('should render with the required props', () => {
        const component = <CardForm
            onSubmit={ () => {} }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
