import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logoutSuccess } from '../actions/auth'




class Navbar extends React.Component {
    state = { activeItem: 'home' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    handleLogout = () => {
        localStorage.removeItem('app_token')
        this.props.logoutSuccess()
    }


  render() {
    const { activeItem } = this.state

    return (
        <Segment inverted>
            <Menu inverted pointing secondary>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    <Link to ='/notes'>
                    FlatNote
                    </Link>
                </Menu.Item>

                <Menu.Item position ='right'
                    name='login'
                    active={activeItem === 'login'}
                    onClick={this.handleItemClick}

                >
                { this.props.auth.id 
                    ?
                    <Link className="item" to='/login' onClick = {() =>this.handleLogout()}>
                    Logout
                    </Link> 
                : 
                    <Link className="item" to='/login'>
                    LogIn
                    </Link>
                }

                </Menu.Item>

                <Menu.Item positon = 'right'
                    name='notes'
                    active={activeItem === 'notes'}
                    onClick={this.handleItemClick}
                >
                    <Link className="item" to='/notes'>
                    Notes
                    </Link>
                </Menu.Item>
                <Menu.Item positon = 'right'
                    name='new-note'
                    active={activeItem === 'new-note'}
                    onClick={this.handleItemClick}
                >
                    <Link className="item" to='/notes/new'>
                    Create Note
                    </Link>
                </Menu.Item>

            </Menu>
        </Segment> 
    );
  }

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {
    logoutSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar) ;