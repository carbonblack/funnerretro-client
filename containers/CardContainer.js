import { connect } from 'react-redux'
import { vote, deleteCard, updateCard } from 'actions/board'
import DraggableCard from 'components/card/DraggableCard'

const mapStateToProps = state => ({
    username: state.user.username
})

const mapDispatchToProps = dispatch => ({
    onVote: (cardId, votes) => dispatch(vote(cardId, votes)),
    onDelete: cardId => dispatch(deleteCard(cardId)),
    onUpdateText: (cardId, text, color) => {
        dispatch(updateCard(cardId, {
            operations: [
                {
                    field: 'text',
                    value: text,
                    operation: 'SET'
                },
                {
                    field: 'blur',
                    value: false,
                    operation: 'SET'
                },
                {
                    field: 'color',
                    value: color,
                    operation: 'SET'
                }
            ]
        }))
    },
    onEdit: cardId => {
        dispatch(updateCard(cardId, {
            operations: [
                {
                    field: 'blur',
                    value: true,
                    operation: 'SET'
                }
            ]
        }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DraggableCard)
