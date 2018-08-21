import React from 'react'
import { shallow } from 'enzyme'
import Groups from 'components/groups/Groups'

describe('Groups test', () => {
    it('should render with the required props', () => {
        const component = <Groups 
            groups={ [] }
            load={ () => {} }
            isFetching={ false }
            fetchingError={ null }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
