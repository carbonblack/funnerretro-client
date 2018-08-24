import { connect } from 'react-redux'
import BoardForm from 'components/board/BoardForm'
import { createBoard } from 'actions/board'
import { getTemplates } from 'actions/templates'
import { getGroups } from 'actions/groups'

const mapStateToProps = state => ({
    templates: state.templates.templates,
    groups: state.groups.groups
})

const mapDispatchToProps = dispatch => ({
    onSubmit: (boardName, template, group) => {
        dispatch(createBoard({
            content: {
                name: boardName,
                group: group
            },
            template: template
        }))
    },
    load: () => {
        dispatch(getTemplates())
        dispatch(getGroups())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BoardForm)
