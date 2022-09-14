import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
    onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

    render() {
        const { user } = this.props.auth;

        return (
            <nav class='navbar navbar-expand-sm bg-secondary navbar-dark'>
                <Link class='navbar-brand' to='/'>
                    Logo
                </Link>
                {this.props.auth.isAuthenticated && (
                    <ul class='navbar-nav ml-auto'>
                    <li class='nav-item dropdown'>
                        
                        <span class='nav-link dropdown-toggle' style={{cursor: 'pointer'}} data-toggle="dropdown">
                            <img src="/images/avatar.png" alt="avatar.png" className="rounded-circle" width='30px' height='30px' />
                        </span>
						<div className="dropdown-menu" style={{left: 'auto', right: '0', minWidth: '0'}}>
                            <h5 className="dropdown-header"><span className="fa fa-user-circle"></span> {user.name}</h5>
                            <span className="dropdown-item" style={{cursor: 'pointer'}} onClick={this.onLogoutClick}>Logout <i className="fa fa-sign-out"></i></span>
                        </div>
                    </li>
                </ul>
                )}
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
  )(Navbar);
