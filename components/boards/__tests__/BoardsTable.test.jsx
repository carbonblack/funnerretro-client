import React from 'react'
import { shallow } from 'enzyme'
import BoardsTable from 'components/boards/BoardsTable'

describe('BoardsTable test', () => {
    it('should render with the required props', () => {
        const component = <BoardsTable
            onDelete={() => {}}
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
