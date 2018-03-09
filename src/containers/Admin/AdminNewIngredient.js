import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../components/Admin/Admin.css';

class AdminNewIngredient extends Component {
  state = {
      ingredient: {
        name: '',
        quantity: '',
      }
  };

  componentWillUnmount() {
    this.props.onReset();
  }

  changedIngredientInputHandler = (event, key) => {
    this.setState({
      ingredient: {
        ...this.state.ingredient,
        [key]: event.target.value,
      }
    });
  }

  submitFormHandler = (event) => {
    event.preventDefault();

    this.props.onAddIngredient(this.state.ingredient, this.props.token);
  }

  cancelAddIngredientHandler = (event) => {
    event.preventDefault();

    this.props.history.push("/admin/ingredients");
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="AdminPage">
          <h1>Saving New ingredient</h1>
          <Spinner />
        </div>
      );
    }

    if (this.props.finished) {
      return <Redirect to="/admin/ingredients" />;
    }

    return (
      <div className="AdminPage">
        <h1>New Ingredient</h1>
        <form onSubmit={this.submitFormHandler}>
          <input type="text" value={this.state.ingredient.name}
             onChange={ (event) => this.changedIngredientInputHandler(event, 'name') }
            placeholder="name"/>
          <input type="text" value={this.state.ingredient.quantity}
             onChange={ (event) => this.changedIngredientInputHandler(event, 'quantity') }
            placeholder="Quantity"/>
          <div className="Actions">
            <button className="Submit" onClick={this.cancelAddIngredientHandler}>Cancel</button>
            <button className="Submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    finished: state.adminIngredient.addOrEdit.finished,
    loading: state.adminIngredient.addOrEdit.loading,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredient, token) => dispatch(actionCreators.adminAddIngredient(ingredient, token)),
    onReset: () => dispatch(actionCreators.adminAddIngredientReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNewIngredient);
