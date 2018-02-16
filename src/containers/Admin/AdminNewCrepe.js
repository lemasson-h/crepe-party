import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import * as actionCreators from '../../store/actions';
import AdminCrepeIngredients from '../../components/Admin/AdminCrepeIngredients';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../components/Admin/Admin.css';

class AdminNewCrepe extends Component {
  state = {
      crepe: {
        name: '',
        ingredients: {},
      },
      ingredients_synchronized: false,
  };

  componentWillUnmount() {
    this.props.onReset();
  }

  componentDidUpdate() {
    if (this.props.ingredients.length > 0 && !this.state.ingredients_synchronized) {
      const updatedIngredients = {};
      this.props.ingredients.forEach(
        ingredient => {
          updatedIngredients[ingredient.id] =  0;
        }
      );

      this.setState({
        crepe: {
          ...this.state.crepe,
          ingredients: updatedIngredients,
        },
        ingredients_synchronized: true,
      });
    }
  }

  componentDidMount() {
    this.props.onLoadIngredients();
  }

  changedCrepeNameHandler = (event) => {
    this.setState({
      crepe: {
        ...this.state.crepe,
        name: event.target.value,
      }
    });
  }

  submitFormHandler = (event) => {
    event.preventDefault();

    this.props.onAddCrepe(this.state.crepe, this.props.token);
  }

  cancelAddCrepeHandler = (event) => {
    event.preventDefault();

    this.props.history.push("/admin");
  }

  addIngredientHandler = (event, id) => {
    event.preventDefault();

    if (undefined === this.state.crepe.ingredients[id]) {
      return ;
    }

    this.setState({
      crepe: {
        ...this.state.crepe,
        ingredients: {
          ...this.state.crepe.ingredients,
          [id]: this.state.crepe.ingredients[id] + 1,
        }
      }
    });
  }

  removeIngredientHandler = (event, id) => {
    event.preventDefault();

    if (undefined === this.state.crepe.ingredients[id] || this.state.crepe.ingredients[id] < 1) {
      return ;
    }

    this.setState({
      crepe: {
        ...this.state.crepe,
        ingredients: {
          ...this.state.crepe.ingredients,
          [id]: this.state.crepe.ingredients[id] - 1,
        }
      }
    });
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
          <input type="text" value={this.state.crepe.name} onChange={this.changedCrepeNameHandler} placeholder="name"/>
          <h2>Ingredients</h2>
          <AdminCrepeIngredients
            crepe={this.state.crepe}
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
    finished: state.admin.crepe.add.finished,
    loading: state.admin.crepe.add.loading,
    token: state.auth.token,
    ingredients: state.ingredients.ingredients,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCrepe: (crepe, token) => dispatch(actionCreators.adminAddCrepe(crepe, token)),
    onLoadIngredients: () => dispatch(actionCreators.loadIngredients()),
    onReset: () => dispatch(actionCreators.adminAddCrepeReset()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminNewCrepe));
