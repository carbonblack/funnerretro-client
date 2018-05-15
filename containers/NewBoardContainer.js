import { connect } from 'react-redux'
import NewBoard from '../components/NewBoard'
import { createBoard } from '../actions/board';

const mapDispatchToProps = dispatch => ({
    onSubmit: (boardName) => {
        dispatch(createBoard({
            name: boardName,
            columns: []
        }))
    }
})

export default connect(null, mapDispatchToProps)(NewBoard)
