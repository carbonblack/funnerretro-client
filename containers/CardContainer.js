import { connect } from 'react-redux'
import { vote } from '../actions/board'
import Card from '../components/Card'

const mapDispatchToProps = dispatch => ({
    onVote: (cardId) => {
        dispatch(vote(cardId))
    }
})

export default connect(null, mapDispatchToProps)(Card)
