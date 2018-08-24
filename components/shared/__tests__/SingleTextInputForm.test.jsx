import React from 'react'
import { shallow } from 'enzyme'
import { SingleTextInputForm } from 'components/shared/SingleTextInputForm'

describe('SingleTextInputForm test', () => {
    it('should render with the required props', () => {
        const component = <SingleTextInputForm
            onSubmit={ () => {} }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
