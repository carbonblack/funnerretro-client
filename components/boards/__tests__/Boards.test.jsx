import React from 'react'
import { shallow } from 'enzyme'
import Boards from 'components/boards/Boards'

describe('Boards test', () => {
    it('should render with the required props', () => {
        const component = <Boards 
            load={ () => {} }
            onDelete={ () => {} }
            onEditBoards={ () => {} }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
