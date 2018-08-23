import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getGroups, createGroup } from 'actions/groups'
import Groups from 'components/groups/Groups'

const mapStateToProps = state => ({
    groups: state.groups.groups,
    isFetching: state.groups.isFetching,
    fetchingError: state.groups.fetchingError
})

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(getGroups()),
    onCreate: name => dispatch(createGroup(name))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Groups))
