import { connect } from 'react-redux'
import { getUser } from 'actions/user'
import Routes from 'components/Routes'

const mapStateToProps = state => ({
    username: state.user.username
})

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(getUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
