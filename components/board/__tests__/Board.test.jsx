import React from 'react'
import { shallow } from 'enzyme'
import Board from 'components/board/Board'

describe('Board test', () => {
    it('should render with the required props', () => {
        const component = <Board 
            load={ () => {} }
            unload={ () => {} }
            id='1'
            onColumnForm={ () => {} }
            onDelete={ () => {} }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
