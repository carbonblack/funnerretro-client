import React from 'react'
import { shallow } from 'enzyme'
import ColumnForm from 'components/column/ColumnForm'

describe('ColumnForm test', () => {
    it('should render with the required props', () => {
        const component = <ColumnForm
            onSubmit={() => {}}
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
