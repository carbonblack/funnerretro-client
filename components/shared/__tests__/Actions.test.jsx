import React from 'react'
import { shallow } from 'enzyme'
import { Actions } from '../Actions'

describe('Actions test', () => {
    it('should render with the required props', () => {
        const component = <Actions />
        expect(shallow(component).exists()).toBe(true)
    })
})
