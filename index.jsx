import React, { Component } from 'react'
import { render } from 'react-dom'
import configureStore from './store'
import RootContainer from './containers/RootContainer'

const store = configureStore()

render (
    <RootContainer store={ store } />,
    document.getElementById('app')
)
