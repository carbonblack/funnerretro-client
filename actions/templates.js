import * as actionTypes from 'constants/actionTypes'
import axios from 'axios'

export const getTemplates = () => dispatch => (
    axios.get('/api/v1/templates').then(response => dispatch(receiveTemplates(response.data.templates)))
)

export const receiveTemplates =  templates => ({
    type: actionTypes.RECEIVE_TEMPLATES,
    templates
})
