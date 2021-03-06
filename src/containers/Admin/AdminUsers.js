import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import FlashMessage from '../../components/UI/FlashMessage';
import flashMessageHoc from '../../hoc/FlashMessageHoc';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../assets/css/table.css';

class AdminUser extends Component {
    componentDidMount() {
      this.props.onLoadUsers(this.props.token);
    }

    submitResetOrder = (e) => {
      e.preventDefault();

      this.props.onResetOrders(this.props.token);
    }

    render() {
      let content = <Spinner />;
      let actions = <Spinner small/>;

      if (!this.props.loading) {
        content = (
          <table className="TableBorder">
            <thead>
              <tr>
                <th>Name</th>
                <th>Number of crepes</th>
              </tr>
            </thead>
            <tbody>
              { this.props.users.map(
                user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.crepes}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        );
      }

      if (!this.props.resetLoading) {
        actions = (
          <button disabled={this.props.loading}
            className="Submit"
            style={{marginTop: '20px'}}
            onClick={this.submitResetOrder}>Reset orders</button>
        );
      }

      return (
        <div className="AdminPage">
            <h1>Users</h1>
            <div className="Content" style={{marginTop: '-20px'}}>
              <FlashMessage message={this.props.flashMessage} />
              {content}
              {actions}
            </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.adminUser.loading,
    users: state.adminUser.users,
    flashMessage: state.flashMessage.message,
    resetLoading: state.adminUser.resetLoading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadUsers: (token) => dispatch(actionCreators.adminLoadUsers(token)),
    onResetOrders: (token) => dispatch(actionCreators.adminResetOrders(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(flashMessageHoc(AdminUser));
