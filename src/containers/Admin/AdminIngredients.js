import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import AdminList from '../../components/Admin/AdminList';

class AdminIngredients extends Component {
  componentDidMount() {
    this.props.onLoadIngredients();
  }

  render() {
    return (
      <AdminList
        entityName='ingredients'
        entityAddLink="/admin/ingredients/add"
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
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadIngredients: () => dispatch(actionCreators.loadIngredients()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminIngredients);
