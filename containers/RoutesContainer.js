import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUser } from 'actions/user'
import Routes from 'components/Routes'

const mapStateToProps = state => ({
    username: state.user.username
})

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(getUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
