import { connect } from 'react-redux'
import { vote, deleteCard, updateCard } from '../actions/board'
import DraggableCard from '../components/card/DraggableCard'

const mapDispatchToProps = dispatch => ({
    onVote: (cardId) => {
        dispatch(vote(cardId))
    },
    onDelete: (cardId) => {
        dispatch(deleteCard(cardId))
    },
    onUpdateText: (cardId, text) => {
        dispatch(updateCard(cardId, {
            field: 'text',
            value: text,
            operation: 'SET'
        }))
    }
})

export default connect(null, mapDispatchToProps)(DraggableCard)
