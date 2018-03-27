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
    }

    render() {
      let content = <Spinner />;

      if (!this.props.loading) {
        content = (
          <table>
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

      return (
        <div className="AdminPage">
            <h1>Users</h1>
            <div className="Content" style={{marginTop: '-20px'}}>
              <FlashMessage message={this.props.flashMessage} />
              {content}
              <button className="Submit" style={{marginTop: '20px'}} onClick={this.submitResetOrder}>Reset orders</button>
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
    flashMessage: state.flashMessage.message
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadUsers: (token) => dispatch(actionCreators.adminLoadUsers(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(flashMessageHoc(AdminUser));
