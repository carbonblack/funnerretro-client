import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { createCard, moveCard } from '../actions/board'
import Column from '../components/Column';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onNewCard: (value) => {
        dispatch(createCard(value, ownProps.column.id))
    },
    moveCard: (columnId, dragIndex, hoverIndex) => {
        dispatch(moveCard(columnId, dragIndex, hoverIndex))
    }
})

export default DragDropContext(HTML5Backend)(connect(null, mapDispatchToProps)(Column))
