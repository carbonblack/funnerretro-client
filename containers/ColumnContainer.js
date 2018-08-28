import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { createCard, moveCard, deleteColumn, updateColumn } from 'actions/board'
import Column from 'components/column/Column'
import { uploadCards } from 'actions/board'

const mapStateToProps = state => ({
    processingImage: state.board.processingImage
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNewCard: (value, color) => dispatch(createCard(value, ownProps.column.id, color)),
    moveCard: (columnId, dragIndex, hoverIndex) => dispatch(moveCard(columnId, dragIndex, hoverIndex)),
    onDelete: columnId => dispatch(deleteColumn(columnId)),
    onNameChange: (columnId, name) => {
        dispatch(updateColumn(columnId, {
            operations: [
                {
                    field: 'name',
                    value: name,
                    operation: 'SET'
                }
            ]
        }))
    },
    onUpload: (columnId, file) => dispatch(uploadCards(file, columnId))
})

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(Column))
