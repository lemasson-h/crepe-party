import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../assets/css/table.css';

class AdminUser extends Component {
    componentDidMount() {
      this.props.onLoadUsers(this.props.token);
    }

    render() {
      let content = <Spinner />;

      if (!this.props.loading) {
        content = (
          <table>
            <tr>
              <th>Name</th>
              <th>Number of crepes</th>
            </tr>
            { this.props.users.map(
              user => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>3</td>
                  </tr>
                );
              }
            )}
          </table>
        );
      }

      return (
        <div className="AdminPage">
            <h1>Users</h1>
            <div className="Content">
              {content}
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
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadUsers: (token) => dispatch(actionCreators.adminLoadUsers(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
