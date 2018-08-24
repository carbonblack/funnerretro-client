import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom' // TODO probably want to use callback refs instead
import { DragSource, DropTarget } from 'react-dnd'
import Card from 'components/card/Card'

const cardSource = {
    beginDrag(props) {
        return {
            id: props.card.id,
            index: props.index
        }
    }
}

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    }
}

const DropTargetConnector = DropTarget('card', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))

const DragSourceConnector = DragSource('card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))

const DraggableCard = ({ connectDragSource, connectDropTarget, isDragging, card, onDelete, onVote, onUpdateText, onEdit }) => (
    connectDragSource(connectDropTarget(
        <div>
            <Card
                card={ card }
                isDragging={ isDragging }
                onDelete={ id => onDelete(id) }
                onVote={ (id, votes) => onVote(id, votes) } 
                onTextChange={ (id, val, color) => onUpdateText(id, val, color) }
                onEdit={ id => onEdit(id) }
            />
        </div>
    ))
)

DraggableCard.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onVote: PropTypes.func.isRequired,
    onUpdateText: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default DropTargetConnector(DragSourceConnector(DraggableCard))
