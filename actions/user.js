import * as actionTypes from 'constants/actionTypes'
import axios from 'axios'

export const getUser = () => dispatch => (
    axios.get('/api/v1/auth').then(response => dispatch(receiveUser(response.data.username)))
)

export const receiveUser = username => ({
    type: actionTypes.RECEIVE_USERNAME,
    username
})
