import React from 'react'
import { shallow } from 'enzyme'
import BoardsGrid from 'components/boards/BoardsGrid'

describe('BoardsGrid test', () => {
    it('should render with the required props', () => {
        const component = <BoardsGrid 
            boards={ [] }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
