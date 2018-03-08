import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import * as actionCreators from '../../store/actions';
import AdminCrepeIngredients from '../../components/Admin/AdminCrepeIngredients';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../components/Admin/Admin.css';

class AdminNewCrepe extends Component {
  state = {
      ingredientsSynchronized: false,
  };

  componentWillUnmount() {
    this.props.onReset();
  }

  componentDidUpdate() {
    if (this.props.ingredients.length > 0 && !this.state.ingredientsSynchronized) {
      this.props.onInitIngredients(this.props.ingredients);

      this.setState({
        ingredientsSynchronized: true,
      });
    }
  }

  componentDidMount() {
    this.props.onLoadIngredients();
  }

  changedCrepeNameHandler = (event) => {
    this.props.onNameChanged(event.target.value);
  }

  submitFormHandler = (event) => {
    event.preventDefault();

    this.props.onAddCrepe(this.props.crepe, this.props.token);
  }

  cancelAddCrepeHandler = (event) => {
    event.preventDefault();

    this.props.history.push("/admin");
  }

  addIngredientHandler = (event, id) => {
    event.preventDefault();

    this.props.onAddIngredient(id);
  }

  removeIngredientHandler = (event, id) => {
    event.preventDefault();

    this.props.onRemoveIngredient(id);
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="AdminPage">
          <h1>Saving New crepe</h1>
          <Spinner />
        </div>
      );
    }

    if (this.props.finished) {
      return <Redirect to="/admin" />;
    }

    return (
      <div className="AdminPage">
        <h1>New Crepe</h1>
        <form onSubmit={this.submitFormHandler}>
          <input type="text" value={this.props.crepe.name} onChange={this.changedCrepeNameHandler} placeholder="name"/>
          <h2>Ingredients</h2>
          <AdminCrepeIngredients
            crepe={this.props.crepe}
            adminIngredients={this.props.ingredients}
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}/>
          <div className="FormActions">
            <button className="Submit" onClick={this.cancelAddCrepeHandler}>Cancel</button>
            <button className="Submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    crepe: state.adminCrepe.addOrEdit.currentElement,
    finished: state.adminCrepe.addOrEdit.finished,
    ingredients: state.ingredients.ingredients,
    loading: state.adminCrepe.addOrEdit.loading,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCrepe: (crepe, token) => dispatch(actionCreators.adminAddCrepe(crepe, token)),
    onAddIngredient: ingredientId => dispatch(actionCreators.adminAddIngredientToCrepe(ingredientId)),
    onInitIngredients: ingredients => dispatch(actionCreators.adminInitIngredientsToCrepe(ingredients)),
    onLoadIngredients: () => dispatch(actionCreators.loadIngredients()),
    onNameChanged: (name) => dispatch(actionCreators.adminCrepeNameChanged(name)),
    onRemoveIngredient: ingredientId => dispatch(actionCreators.adminRemoveIngredientToCrepe(ingredientId)),
    onReset: () => dispatch(actionCreators.adminAddCrepeReset()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminNewCrepe));
