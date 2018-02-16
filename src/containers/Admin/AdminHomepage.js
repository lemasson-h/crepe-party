import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import AdminList from '../../components/Admin/AdminList';

class AdminHomepage extends Component {
  componentDidMount() {
    this.props.onLoadMenu();
  }

  deleteCrepeHandler = (crepeId) => {
    this.props.onDeleteCrepe(crepeId, this.props.token);
  }

  componentDidUpdate() {
    if (this.props.delete_finished) {
      this.props.onDeleteCrepeReset();
      this.props.onLoadMenu();
    }
  }

  render() {
      return <AdminList
          entityName="crepes"
          entityAddLink="/admin/crepes/add"
          entityList={this.props.menu}
          deleteEntity={this.deleteCrepeHandler}
          error={this.props.error}
          loading={this.props.loading} />;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    menu: state.menu.menu,
    loading: state.menu.loading,
    error: state.menu.error,
    delete_loading: state.admin.crepe.delete.loading,
    delete_finished: state.admin.crepe.delete.finished,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadMenu: () => dispatch(actionCreators.loadMenu()),
    onDeleteCrepe: (crepeId, token) => dispatch(actionCreators.adminDeleteCrepe(crepeId, token)),
    onDeleteCrepeReset: () => dispatch(actionCreators.adminDeleteCrepeReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomepage);
