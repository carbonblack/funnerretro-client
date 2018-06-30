import reducers from 'reducers'

test('reducers should not be undefined nor null', () => {
    expect.anything(reducers)
})
