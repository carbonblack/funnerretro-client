import { connect } from 'react-redux'
import NewBoard from '../components/board/NewBoard'
import { createBoard, getTemplates } from '../actions/board'

const mapStateToProps = state => ({
    templates: state.board.templates
})

const mapDispatchToProps = dispatch => ({
    onSubmit: (boardName, template) => {
        dispatch(createBoard({
            name: boardName,
            template: template
        }))
    },
    load: () => {
        dispatch(getTemplates())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewBoard)
