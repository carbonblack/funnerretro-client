import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import colors from 'styles/colors'
import SingleTextInputForm from 'components/shared/SingleTextInputForm'
import FontAwesome from 'react-fontawesome'

const styles = {
    container: css`
        margin-right: 5rem;
    `,
    headerText: css`
        color: ${ colors.orange };
        font-size: 3rem;
        margin-bottom: 1rem;
    `,
    groupsContainer: css`
        list-style-type: none;
        padding: 0;
        color: ${ colors.white };

        li {
            margin-bottom: 0.5rem;

            h3 {
                font-size: 1.4rem;
            }
        }
    `,
    group: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    deleteButton: css`
        background: transparent;
        border: 0;
        color: ${ colors.lightBlue };
        font-size: 1.25rem;
    `,
    link: css`
        color: ${ colors.lightBlue };
        
        h3 {
            font-weight: 300;
        }

        :hover, :visited, :active, :focus {
            color: ${ colors.lightBlue };
        } 
    `,
    linkActive: css`
        color: ${ colors.white };

        :hover, :visited, :active, :focus {
            color: ${ colors.white };
        } 
    `
}

class Groups extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        const { groups, onCreate, onDelete } = this.props

        return(
            <div className={ styles.container }>
                <h1 className={ styles.headerText }>Workspaces</h1>
                <SingleTextInputForm
                    onSubmit={ name => onCreate(name) }
                    submitLabel='Add'
                    errorLabel='Workspace name must not be empty'
                    label='+ Add Workspace'
                    placeholder='Workspace name'
                />
                <ul className={ styles.groupsContainer }>
                    <NavLink activeClassName={ styles.linkActive } className={ styles.link } to='/boards/0'><li><h3>My Boards</h3></li></NavLink>
                    { groups.map(group => (
                        <NavLink key={ `group-${ group.id }` } activeClassName={ styles.linkActive } className={ styles.link } to={ `/boards/${ group.id }` }>
                            <li className={ styles.group }>
                                <h3>{ group.name }</h3>
                                <button className={ styles.deleteButton } onClick={ () => onDelete(group.id) }>
                                    <FontAwesome name="trash-o" />
                                </button>
                            </li>
                        </NavLink>
                    )) }
                </ul>
            </div>
        )
    }
}

Groups.propTypes = {
    groups: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchingErrors: PropTypes.string,
    load: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Groups
