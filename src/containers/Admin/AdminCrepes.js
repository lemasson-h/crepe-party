import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import AdminList from '../../components/Admin/AdminList';

class AdminCrepes extends Component {
  componentDidMount() {
    this.props.onLoadIngredients();
  }

  editCrepeHandler = (crepeId) => {
    this.props.history.push('/admin/crepes/' + crepeId + '/edit');
  }

  deleteCrepeHandler = (crepeId) => {
    this.props.onDeleteCrepe(crepeId, this.props.token);
  }

  componentDidUpdate(prevProps) {
    if (this.props.delete_finished) {
      this.props.onDeleteCrepeReset();
      this.props.onLoadCrepes(this.props.ingredients);
    } else if(prevProps.ingredientsLoading === true
      && this.props.ingredientsLoading === false
    ) {
      this.props.onLoadCrepes(this.props.ingredients);
    }
  }

  render() {
      return <AdminList
          entityName="crepes"
          entityAddLink="/admin/crepes/add"
          entityList={this.props.crepes}
          editEntity={this.editCrepeHandler}
          deleteEntity={this.deleteCrepeHandler}
          error={this.props.error}
          loading={this.props.loading} />;
  }
}

const mapStateToProps = state => {
  return {
    crepes: state.crepes.crepes,
    delete_loading: state.adminCrepe.delete.loading,
    delete_finished: state.adminCrepe.delete.finished,
    error: state.crepes.error,
    ingredientsLoading: state.ingredients.loading,
    loading: state.ingredients.loading || state.crepes.loading,
    token: state.auth.token,
    ingredients: state.ingredients.ingredients,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteCrepe: (crepeId, token) => dispatch(actionCreators.adminDeleteCrepe(crepeId, token)),
    onDeleteCrepeReset: () => dispatch(actionCreators.adminDeleteCrepeReset()),
    onLoadCrepes: (ingredients) => dispatch(actionCreators.loadCrepes(ingredients)),
    onLoadIngredients: () => dispatch(actionCreators.loadIngredients()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCrepes);
