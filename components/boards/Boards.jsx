import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import colors from 'styles/colors'
import BoardsGrid from 'components/boards/BoardsGrid'
import GroupsContainer from 'containers/GroupsContainer';

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

        p {
            font-size: 1.2rem;
        }
    `,
    headerText: css`
        color: ${ colors.logoOrange };
        font-size: 3rem;
        margin-bottom: 1rem;
    `,
    sorting: css`
        color: ${ colors.blueTextButton };

        span {
            padding-left: 1rem;
        }
    `
}

class Boards extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        const { boards } = this.props

        return (
            <div className={ styles.container }>
                <GroupsContainer />
                <div className={ styles.inner }>
                    <div className={ styles.header }>
                         <h1 className={ styles.headerText }>Nic Cage</h1>
                    </div>
                    <div className={ styles.header }>
                        <p>Boards</p>
                        <p className={ styles.sorting }>Most Recent <span>A-Z</span></p>
                    </div>
                    <BoardsGrid boards={ boards } />
                </div>
            </div>
        )
    }
}

Boards.propTypes = {
    load: PropTypes.func.isRequired,
    boards: PropTypes.array
}

Boards.defaultProps = {
    boards: []
}

export default Boards
