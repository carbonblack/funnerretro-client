import React from 'react'
import { shallow } from 'enzyme'
import ColumnHeader from '../ColumnHeader'

describe('ColumnHeader test', () => {
    it('should render with the required props', () => {
        const component = <ColumnHeader
            id="1"
            onSave={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
