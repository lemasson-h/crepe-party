import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import AdminMenu from '../../components/Admin/AdminMenu';
import Spinner from '../../components/UI/Spinner/Spinner';

class AdminHomepage extends Component {
  componentDidMount() {
    this.props.onLoadMenu();
  }

  deleteCrepeHandler = (crepeId) => {
    this.props.onDeleteCrepe(crepeId, this.props.token);
  }

  render() {
    let content = <Spinner />

    if (!this.props.loading) {
      if (!this.props.error) {
        content = <AdminMenu menu={this.props.menu} deleteCrepe={this.deleteCrepeHandler}/>;
      } else {
        content = <div>Error</div>;
      }
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    menu: state.menu.menu,
    loading: state.menu.loading,
    error: state.menu.error,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadMenu: () => dispatch(actionCreators.loadMenu()),
    onDeleteCrepe: (crepeId, token) => dispatch(actionCreators.deleteCrepeFromMenu(crepeId, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomepage);
