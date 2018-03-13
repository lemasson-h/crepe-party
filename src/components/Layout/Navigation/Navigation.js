import React, { Component } from 'react';

import SmartLink from '../../../hoc/SmartLink';
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
    let authLink = <div className="NavLink"><SmartLink to="/login">Login</SmartLink></div>;

    if (this.props.isAdmin) {
      adminLink = (
        <SubNavigation
          parentPath="/admin"
          parentName="Admin">
            <SmartLink to="/admin" exact>Manage Menu</SmartLink>
            <SmartLink to="/admin/ingredients">Manage Ingredients</SmartLink>
        </SubNavigation>
      );
    }

    if (this.props.isAuthenticated) {
      authLink = <div className="NavLink"><SmartLink to="/logout">Logout</SmartLink></div>;
    }

    return (
      <div className="Navigation">
        <div className="NavLink"><SmartLink to="/" exact>Homepage</SmartLink></div>
        {adminLink}
        {authLink}
      </div>
    );
  }
}

export default Navigation;
