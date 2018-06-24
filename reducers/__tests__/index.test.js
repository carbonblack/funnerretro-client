import reducers from '../'

test('reducers should not be undefined nor null', () => {
    expect.anything(reducers)
})
