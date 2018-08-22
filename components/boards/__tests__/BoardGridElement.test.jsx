import React from 'react'
import { shallow } from 'enzyme'
import BoardGridElement from 'components/boards/BoardGridElement'

describe('BoardGridElement test', () => {
    it('should render with the required props', () => {
        const component = <BoardGridElement 
            board={ { id: 'something', content: { name: 'hello' } } }
            onDelete={ () => {} }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
