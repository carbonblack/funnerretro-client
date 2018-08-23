import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { baseButton } from 'styles/button'
import colors from 'styles/colors'
import BoardsGrid from 'components/boards/BoardsGrid'
import GroupsContainer from 'containers/GroupsContainer'

const styles = {
    container: css`
        display: flex;
        margin: 0 2.6rem 2rem;

        a {
            text-decoration: none;
        }
    `,
    inner: css`
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    `,
    header: css`
        width: 100%;
        color: ${ colors.white };
        padding: 0 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        h3, p {
            font-size: 1.1rem;
        }
    `,
    headerText: css`
        color: ${ colors.orange };
        font-size: 3rem;
        margin-bottom: 0.5rem;
    `,
    action: css`
        color: ${ colors.blueTextButton };
        margin-left: 2rem;
        display: inline-block;
    `,
    activeSort: css`
        color: ${ colors.white };
    `,
    editButton: css`
        font-size: 1.1rem;
    `,
    actions: css`
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
    `
}

class Boards extends Component {
    state = {
        sortKey: 'last_update_time'
    }

    componentDidMount() {
        this.props.load('last_update_time')
    }

    handleSortChange = key => {
        if (this.state.sortKey !== key) {
            this.setState({ sortKey: key })
            this.props.load(key)
        }
    }

    render() {
        const { boards, onDelete, onEditBoards, isEditingBoards } = this.props
        const { sortKey } = this.state 

        return (
            <div className={ styles.container }>
                <GroupsContainer />
                <div className={ styles.inner }>
                    <div className={ styles.header }>
                        <h1 className={ styles.headerText }>Nic Cage</h1>
                        <div className={ styles.actions }>
                            <a className={ cx(styles.action, { [styles.activeSort]: sortKey === 'last_update_time' }) } onClick={ () => this.handleSortChange('last_update_time') }>Most Recent</a> 
                            <a className={ cx(styles.action, { [styles.activeSort]: sortKey === 'content.name' }) } onClick={ () => this.handleSortChange('content.name') }>A-Z</a>
                            <button className={ cx(styles.action, baseButton, styles.editButton) } onClick={ onEditBoards }>{ isEditingBoards ? 'Done' : 'Edit' }</button>
                        </div>
                    </div>
                    <BoardsGrid boards={ boards } onDelete={ onDelete } editing={ isEditingBoards } />
                </div>
            </div>
        )
    }
}

Boards.propTypes = {
    load: PropTypes.func.isRequired,
    boards: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onEditBoards: PropTypes.func.isRequired,
    isEditingBoards: PropTypes.bool
}

Boards.defaultProps = {
    boards: [],
    isEditingBoards: false
}

export default Boards
