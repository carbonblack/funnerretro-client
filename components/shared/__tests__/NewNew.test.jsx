import React from 'react'
import { shallow } from 'enzyme'
import New from 'components/shared/NewNew'

describe('NewNew test', () => {
    it('should render with the required props', () => {
        const component = <New
            onSubmit={ () => {} }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
