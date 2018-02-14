import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SubNavigation from './SubNavigation';

class Navigation extends Component {
  state = {
    navLinkOnFocus: null
  };

  mouseEnterHandler = (name) => {
    this.setState({
      ...this.state,
      navLinkOnFocus: name,
    });
  }

  mouseLeaveHandler = (name) => {
    this.setState({
      ...this.state,
      navLinkOnFocus: null,
    });
  }

  render() {
    let adminLink = null;
    let authLink = <div className="NavLink"><NavLink to="/login">Login</NavLink></div>;

    if (this.props.isAdmin) {
      adminLink = (
        <SubNavigation
          parentPath="/admin"
          parentName="Admin">
            <NavLink to="/admin" exact>Manage Menu</NavLink>
            <NavLink to="/admin/ingredients">Manage Ingredients</NavLink>
        </SubNavigation>
      );
    }

    if (this.props.isAuthenticated) {
      authLink = <div className="NavLink"><NavLink to="/logout">Logout</NavLink></div>;
    }

    return (
      <div className="Navigation">
        <div className="NavLink"><NavLink to="/" exact>Homepage</NavLink></div>
        <div className="NavLink"><NavLink to="/menu">Menu</NavLink></div>
        {adminLink}
        {authLink}
      </div>
    );
  }
}

export default Navigation;
