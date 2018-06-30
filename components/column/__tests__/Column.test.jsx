import React from 'react'
import { shallow } from 'enzyme'
import Column from 'components/column/Column'

describe('Column test', () => {
    it('should render with the required props', () => {
        const component = <Column
            onNameChange={() => {}}
            onNewCard={() => {}}
            moveCard={() => {}}
            onDelete={() => {}}
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
