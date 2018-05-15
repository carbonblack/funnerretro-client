import React, { Component } from 'react'
import { connect } from 'react-redux'
import { css } from 'react-emotion'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import FontAwesome from 'react-fontawesome'
import colors from '../styles/colors'
import { vote } from '../actions/board'

const cardContainer = isDragging => css`
    background: ${ colors.white };
    margin-bottom: 1rem;
    padding: 0.5rem;
    cursor: move;
    opacity: ${ isDragging ? 0 : 1 };
`

const text = css`
    margin-bottom: 0.25rem;
`

const votes = css`
    margin-left: 0.25rem;
`

const button = css`
    font-size: 0.9rem;
    color: ${ colors.mediumGray };
    border: 0;

    &:active, :focus, :visited {
        outline: none;
    }

    &:hover {
        color: ${ colors.darkGray };
    }
`

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
	},
}

const DropTargetConnector = DropTarget('card', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))

const DragSourceConnector = DragSource('card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))

class Card extends Component {
    render() {
        const { connectDragSource, connectDropTarget, isDragging, card } = this.props
        
        return connectDragSource(
            connectDropTarget(
                <div className={ cardContainer(isDragging) }>
                    <p className={ text }>{ card.text }</p>
                    <button className={ button } onClick={ () => this.props.onVote(card.id) }>
                        <FontAwesome name="thumbs-o-up" />
                        <span className={ votes }>{ card.votes }</span>
                    </button>
                    <button onClick={ () => this.props.onDelete(card.id) } className={ button }>
                        <FontAwesome name="trash-o" />
                    </button>
                </div>
            )
        )
    }
}

export default DropTargetConnector(DragSourceConnector(Card))
