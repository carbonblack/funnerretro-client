import React from 'react'
import { render } from 'react-dom'
import configureStore from 'store'
import { init as websocketInit } from 'actions/websocket'
import Root from 'components/Root'

const store = configureStore()

websocketInit(store)

render(
    <Root store={ store } />,
    document.getElementById('app')
)
