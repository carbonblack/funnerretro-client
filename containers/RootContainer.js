import { connect } from 'react-redux'
import Root from '../components/Root'

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(Root)
