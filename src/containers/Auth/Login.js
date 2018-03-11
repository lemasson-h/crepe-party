import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onInputChange = (key, event) => {
    this.setState({
      ...this.state,
      [key]: event.target.value,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.props.onLogin(this.state.email, this.state.password);
  }

  componentWillUnmount() {
    //Once we are authenticated, we reset the redirectTo
    this.props.onSetRedirectTo(undefined);
  }

  render() {
    if (this.props.isAuthenticated) {
      if (undefined === this.props.redirectTo) {
        return <Redirect to="/" />;
      }

      return <Redirect to={this.props.redirectTo} />;
    }

    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <form onSubmit={this.submitHandler}>
          { this.props.error ? <p className="Error">Invalid credentials</p> : null }
          <input type="email" name="email" onChange={(inputValue) => { this.onInputChange('email', inputValue) }} value={this.state.email} placeholder="E-Mail" />
          <input type="password" name="password" onChange={(inputValue) => { this.onInputChange('password', inputValue) } } value={this.state.password} placeholder="Password" />
          <button>Login</button>
        </form>
      );
    }

    return (
      <div className="Login">
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    error: state.auth.error,
    redirectTo: state.auth.redirectTo,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actionCreators.authLogin(email, password)),
    onSetRedirectTo: (redirectTo) => dispatch(actionCreators.setRedirectToAfterLogin(redirectTo)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
