import React from 'react'
import { shallow } from 'enzyme'
import TopNavigation from 'components/navigation/TopNavigation'

describe('TopNavigation test', () => {
    it('should render with the required props', () => {
        const component = <TopNavigation />
        expect(shallow(component).exists()).toBe(true)
    })
})
