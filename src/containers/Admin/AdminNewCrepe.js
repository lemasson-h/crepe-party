import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../components/Admin/Admin.css';

class AdminNewCrepe extends Component {
  state = {
      crepe: {
        name: '',
        ingredients: [],
      }
  };

  componentWillUnmount() {
    this.props.onReset();
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddCrepe: (crepe, token) => dispatch(actionCreators.adminAddCrepe(crepe, token)),
    onReset: () => dispatch(actionCreators.adminAddCrepeReset()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminNewCrepe));
