import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';

class AdminNewIngredient extends Component {
  state = {
      ingredient: {
        name: '',
        quantity: '',
      }
  };

  changedIngredientInputHandler = (event, key) => {
    this.setState({
      crepe: {
        ...this.state.ingredient,
        [key]: event.target.value,
      }
    });
  }

  submitFormHandler = (event) => {
    event.preventDefault();

    this.props.onAddIngredient(this.state.ingredient, this.props.token);
  }

  render() {
    return (
      <div>
        <h1>New Ingredient</h1>
        <form onSubmit={this.submitFormHandler}>
          <input type="text" value={this.state.ingredient.name}
             onChange={ (event) => this.changedIngredientInputHandler(event, 'name') }
            placeholder="name"/>
          <input type="text" value={this.state.ingredient.quantity}
             onChange={ (event) => this.changedIngredientInputHandler(event, 'quantity') }
            placeholder="Quantity"/>
          <button>Add</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredient, token) => dispatch(actionCreators.adminAddIngredient(ingredient, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNewCrepe);
