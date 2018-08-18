import React from 'react'
import { shallow } from 'enzyme'
import TopNavigation from 'components/navigation/TopNavigation'

describe('TopNavigation test', () => {
    it('should render null if shouldn\'t show', () => {
        const component = <TopNavigation shouldShow={ false } />
        expect(shallow(component).find('div').exists()).toBe(false)
    })

    it('should render and show the nav', () => {
        const component = <TopNavigation shouldShow={ true } />
        expect(shallow(component).find('div').exists()).toBe(true)
    })
})
