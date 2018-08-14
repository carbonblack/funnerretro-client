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

    it('should call onDelete when clicking button', () => {
        const func = jest.fn()
        const component = shallow(<BoardsTable
            boards={ [{ id: 'board_id', content:{ name: 'hi board' } }] }
            onDelete={ func }
        />)
        component.find('button').simulate('click')
        expect(func).toBeCalledWith('board_id')
    })
})
