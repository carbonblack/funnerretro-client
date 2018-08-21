import { connect } from 'react-redux'
import { getGroups } from 'actions/groups'
import Groups from 'components/groups/Groups'

const mapStateToProps = state => ({
    groups: state.groups.groups,
    isFetching: state.groups.isFetching,
    fetchingError: state.groups.fetchingError
})

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(getGroups())
})

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
