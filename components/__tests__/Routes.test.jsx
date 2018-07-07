import React from 'react'
import { shallow } from 'enzyme'
import Routes from 'components/Routes'

describe('Routes test', () => {
    it('should render with the required props', () => {
        const component = <Routes location={ {} } />
        expect(shallow(component).exists()).toBe(true)
    })
})
