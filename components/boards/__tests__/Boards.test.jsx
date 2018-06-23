import React from 'react'
import { shallow } from 'enzyme'
import Boards from '../Boards'

describe('Boards test', () => {
    it('should render with the required props', () => {
        const component = <Boards 
            load={() => {}}
            onDelete={() => {}}
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
