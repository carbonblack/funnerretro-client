import React, { Component } from 'react'
import { render } from 'react-dom'
import configureStore from './store'
import { init as websocketInit } from './actions/websocket'
import RootContainer from './containers/RootContainer'

const store = configureStore()

websocketInit(store)

render (
    <RootContainer store={ store } />,
    document.getElementById('app')
)
