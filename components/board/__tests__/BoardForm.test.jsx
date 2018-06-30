import React from 'react'
import { shallow } from 'enzyme'
import BoardForm from 'components/board/BoardForm'

describe('BoardForm test', () => {
    it('should render with the required props', () => {
        const component = <BoardForm 
            load={() => {}}
            onSubmit={() => {}}
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
