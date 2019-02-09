import * as actionTypes from 'constants/actionTypes'
import axios from 'axios'

export const getGroups = () => dispatch => {
    dispatch(fetchGroups())
    return axios.get('/api/v1/groups').then(response => {
        dispatch(receiveGroups(response.data.groups.map(group => ({ ...group }))))
    }).catch(response => dispatch(getGroupsError(response.response.statusText)))
}

export const fetchGroups = () => ({
    type: actionTypes.FETCH_GROUPS
})

export const receiveGroups = groups => ({
    type: actionTypes.RECEIVE_GROUPS,
    groups
})

export const getGroupsError = error => ({
    type: actionTypes.FETCH_GROUPS_ERROR,
    error
})

export const createGroup = name => dispatch => (
    axios.post('/api/v1/groups', { name }).then(response => {
        dispatch(receiveGroup({ ...response.data.group }))
    })
)

export const receiveGroup = group => ({
    type: actionTypes.RECEIVE_GROUP,
    group
})

export const deleteGroup = id => dispatch => (
    axios.delete(`/api/v1/groups/${ id }`).then(() => dispatch(getGroups()))
)
