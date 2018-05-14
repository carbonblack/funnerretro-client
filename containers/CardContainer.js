import { connect } from 'react-redux'
import { vote, deleteCard } from '../actions/board'
import Card from '../components/Card'

const mapDispatchToProps = dispatch => ({
    onVote: (cardId) => {
        dispatch(vote(cardId))
    },
    onDelete: (cardId) => {
        dispatch(deleteCard(cardId))
    }
})

export default connect(null, mapDispatchToProps)(Card)
