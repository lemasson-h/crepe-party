import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';

class AdminNewCrepe extends Component {
  state = {
      crepe: {
        name: '',
        ingredients: [],
      }
  };

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

    this.props.onAddCrepeToMenu(this.state.crepe, this.props.token);
  }

  render() {
    return (
      <div>
        <h1>New Crepe</h1>
        <form onSubmit={this.submitFormHandler}>
          <input type="text" value={this.state.crepe.name} onChange={this.changedCrepeNameHandler} placeholder="name"/>
          <h2>Ingredients</h2>
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
    onAddCrepe: (crepe, token) => dispatch(actionCreators.addCrepeToMenu(crepe, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNewCrepe);
