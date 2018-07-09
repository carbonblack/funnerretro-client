import { connect } from 'react-redux'
import BoardForm from 'components/board/BoardForm'
import { createBoard } from 'actions/board'
import { getTemplates } from 'actions/template'

const mapStateToProps = state => ({
    templates: state.template.templates
})

const mapDispatchToProps = dispatch => ({
    onSubmit: (boardName, template) => {
        dispatch(createBoard({
            name: boardName,
            template: template
        }))
    },
    load: () => dispatch(getTemplates())
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardForm)
