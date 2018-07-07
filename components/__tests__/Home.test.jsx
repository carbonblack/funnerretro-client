import React from 'react'
import { shallow } from 'enzyme'
import Home from 'components/Home'

describe('Home test', () => {
    it('should render with the required props', () => {
        const component = <Home />
        expect(shallow(component).exists()).toBe(true)
    })
})
