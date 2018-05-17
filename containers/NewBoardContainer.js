import { connect } from 'react-redux'
import NewBoard from '../components/board/NewBoard'
import { createBoard } from '../actions/board';

const mapDispatchToProps = dispatch => ({
    onSubmit: (boardName) => {
        dispatch(createBoard({ name: boardName }))
    }
})

export default connect(null, mapDispatchToProps)(NewBoard)
