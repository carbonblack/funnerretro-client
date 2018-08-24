import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'
import colors from 'styles/colors'
import SingleTextInputForm from 'components/shared/SingleTextInputForm'

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
        const { groups, onCreate } = this.props

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
                            <li>
                                <h3>{ group.name }</h3>
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
    onCreate: PropTypes.func.isRequired
}

export default Groups
