import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import AdminList from '../../components/Admin/AdminList';

class AdminCrepes extends Component {
  componentDidMount() {
    this.props.onLoadCrepes();
  }

  deleteCrepeHandler = (crepeId) => {
    this.props.onDeleteCrepe(crepeId, this.props.token);
  }

  componentDidUpdate() {
    if (this.props.delete_finished) {
      this.props.onDeleteCrepeReset();
      this.props.onLoadCrepes();
    }
  }

  render() {
      return <AdminList
          entityName="crepes"
          entityAddLink="/admin/crepes/add"
          entityList={this.props.crepes}
          deleteEntity={this.deleteCrepeHandler}
          error={this.props.error}
          loading={this.props.loading} />;
  }
}

const mapStateToProps = state => {
  return {
    crepes: state.crepes.crepes,
    delete_loading: state.admin.crepe.delete.loading,
    delete_finished: state.admin.crepe.delete.finished,
    error: state.crepes.error,
    loading: state.crepes.loading,
    token: state.auth.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteCrepe: (crepeId, token) => dispatch(actionCreators.adminDeleteCrepe(crepeId, token)),
    onDeleteCrepeReset: () => dispatch(actionCreators.adminDeleteCrepeReset()),
    onLoadCrepes: () => dispatch(actionCreators.loadCrepes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCrepes);
