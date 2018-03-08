import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import AdminList from '../../components/Admin/AdminList';

class AdminIngredients extends Component {
  componentDidMount() {
    this.props.onLoadIngredients();
  }

  editIngredientHandler = (ingredientId) => {
    this.props.history.push('/admin/ingredients/' + ingredientId + '/edit');
  }

  deleteIngredientHandler = (ingredientId) => {
    this.props.onDeleteIngredient(ingredientId, this.props.token);
  }

  componentDidUpdate() {
    if (this.props.delete_finished) {
      this.props.onDeleteIngredientReset();
      this.props.onLoadIngredients();
    }
  }

  render() {
    return (
      <AdminList
        entityName='ingredients'
        entityAddLink="/admin/ingredients/add"
        editEntity={this.editIngredientHandler}
        deleteEntity={this.deleteIngredientHandler}
        entityList={this.props.ingredients}
        loading={this.props.loading}
        error={this.props.error} />
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.ingredients.ingredients_loading,
    ingredients: state.ingredients.ingredients,
    error: state.ingredients.ingredients_error,
    delete_finished: state.adminIngredient.delete.finished,
    token: state.auth.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadIngredients: () => dispatch(actionCreators.loadIngredients()),
    onDeleteIngredient: (ingredientId, token) => dispatch(actionCreators.adminDeleteIngredient(ingredientId, token)),
    onDeleteIngredientReset: () => dispatch(actionCreators.adminDeleteIngredientReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminIngredients);
