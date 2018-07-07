import React from 'react'
import { shallow } from 'enzyme'
import Root from 'components/Root'
import configureStore from 'redux-mock-store'

describe('Root test', () => {
    it('should render with the required props', () => {
        const component = <Root store={ configureStore()({}) } />
        expect(shallow(component).exists()).toBe(true)
    })
})
