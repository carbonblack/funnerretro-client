import { connect } from 'react-redux'
import { vote, deleteCard } from '../actions/board'
import DraggableCard from '../components/card/DraggableCard'

const mapDispatchToProps = dispatch => ({
    onVote: (cardId) => {
        dispatch(vote(cardId))
    },
    onDelete: (cardId) => {
        dispatch(deleteCard(cardId))
    }
})

export default connect(null, mapDispatchToProps)(DraggableCard)
