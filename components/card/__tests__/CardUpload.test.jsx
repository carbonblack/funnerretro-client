import React from 'react'
import { shallow } from 'enzyme'
import CardUpload from 'components/card/CardUpload'

describe('CardUpload test', () => {
    it('should render with the required props', () => {
        const component = <CardUpload
            onUpload={ () => {} }
            processingImage={ false }
        />
        expect(shallow(component).exists()).toBe(true)
    })
})
