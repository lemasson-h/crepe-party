import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class AdminEditIngredient extends Component {
  state = {
      ingredientLoaded: false,
  };

  // Ensure we reset some data in redux for the current Form and redirection on finished action
  componentWillUnmount() {
    this.props.onReset();
  }

  // Ensure we wait the ingredient to be loaded before enabling the edit
  componentDidUpdate() {
    if (this.props.ingredient.id !== null
      && !this.state.ingredientLoaded
    ) {
      this.setState({
        ingredientLoaded: true,
      });
    }
  }

  componentDidMount() {
      this.props.onLoadIngredient(this.props.match.params.ingredientId);
  }

  submitFormHandler = (event) => {
    event.preventDefault();

    this.props.onEditIngredient(this.props.ingredient, this.props.token);
  }

  changedIngredientNameHandler = (event) => {
    this.props.onIngredientNameChanged(event.target.value);
  }

  changedIngredientQuantityHandler = (event) => {
    this.props.onIngredientQuantityChanged(event.target.value);
  }

  cancelEditIngredientHandler = (event) => {
    event.preventDefault();

    this.props.history.push('/admin/ingredients');
  }

  render() {
    //Initialization of the element we want to edit
    if (!this.state.ingredientLoaded) {
      return (
        <div className="AdminPage">
          <h1>Loading ingredient</h1>
          <Spinner />
        </div>
      );
    } else if (this.props.loading) {
      return (
        <div className="AdminPage">
          <h1>Saving ingredient</h1>
          <Spinner />
        </div>
      );
    }

    if (this.props.finished) {
      return <Redirect to="/admin/ingredients" />;
    }

    return (
        <div className="AdminPage">
          <h1>Edit Ingredient</h1>
          <form onSubmit={this.submitFormHandler}>
            <input type="text" value={this.props.ingredient.name} onChange={this.changedIngredientNameHandler} placeholder="name"/>
            <input type="text" value={this.props.ingredient.quantity} onChange={this.changedIngredientQuantityHandler} placeholder="quantity"/>
            <div className="Actions">
              <button className="Submit" onClick={this.cancelEditIngredientHandler}>Cancel</button>
              <button className="Submit">Save</button>
            </div>
          </form>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredient: state.adminIngredient.addOrEdit.currentElement,
    token: state.auth.token,
    loading: state.adminIngredient.addOrEdit.loading,
    finished: state.adminIngredient.addOrEdit.finished
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReset: () => dispatch(actionCreators.adminAddIngredientReset()),
    onLoadIngredient: (ingredientId) => dispatch(actionCreators.adminLoadIngredient(ingredientId)),
    onEditIngredient: (ingredient, token) => dispatch(actionCreators.adminEditIngredient(ingredient, token)),
    onIngredientNameChanged: (name) => dispatch(actionCreators.adminIngredientNameChanged(name)),
    onIngredientQuantityChanged: (quantity) => dispatch(actionCreators.adminIngredientQuantityChanged(quantity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditIngredient);
