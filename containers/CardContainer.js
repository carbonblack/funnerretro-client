import { connect } from 'react-redux'
import { upVote, downVote, deleteCard, updateCard } from '../actions/board'
import DraggableCard from '../components/card/DraggableCard'

const mapDispatchToProps = dispatch => ({
    onUpVote: (cardId) => {
        dispatch(upVote(cardId))
    },
    onDownVote: (cardId) => {
        dispatch(downVote(cardId))
    },
    onDelete: (cardId) => {
        dispatch(deleteCard(cardId))
    },
    onUpdateText: (cardId, text) => {
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
                }
            ]
        }))
    },
    onEdit: (cardId) => {
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

export default connect(null, mapDispatchToProps)(DraggableCard)
