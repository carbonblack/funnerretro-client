import React from 'react'
import { shallow } from 'enzyme'
import Card from 'components/card/Card'

describe('Card test', () => {
    it('should render with the required props', () => {
        const component = <Card
            card={ { content:{ blur: true } } }
            onTextChange={ () => {} }
            isDragging={ false }
            onDelete={ () => {} }
            onVote={ () => {} }
            onEdit={ () => {} }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
