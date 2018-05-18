import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import Card from './Card'

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
		props.moveCard(dragIndex, hoverIndex);

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

class DraggableCard extends Component {
    render() {
        const { connectDragSource, connectDropTarget, isDragging, card, onDelete, onVote, onUpdateText, onEdit } = this.props
        
        return connectDragSource(connectDropTarget(
            <div>
                <Card
                    card={ card }
                    isDragging={ isDragging }
                    onDelete={ id => onDelete(id) }
                    onVote={ id => onVote(id) } 
					onTextChange={ (id, val) => onUpdateText(id, val) }
					onEdit={ id => onEdit(id) }
				/>
            </div>
        ))
    }
}

export default DropTargetConnector(DragSourceConnector(DraggableCard))
