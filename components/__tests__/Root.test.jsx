import React from 'react'
import { shallow } from 'enzyme'
import Root from 'components/Root'
import configureStore from '../../store'

const store = configureStore()

describe('Root test', () => {
    it('should render with the required props', () => {
        const component = <Root store={ store }/>
        expect(shallow(component).exists()).toBe(true)
    })
})
