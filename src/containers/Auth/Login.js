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
    name: '',
    error: undefined,
  };

  onInputChange = (key, event) => {
    this.setState({
      ...this.state,
      [key]: event.target.value,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.resetErrors();

    if (!this.props.isLogin && this.state.name.trim() === '') {
        this.setState({
          error: 'You need to provide your name.',
        });

        return;
    }

    this.props.onAuthenticate(
      this.props.isLogin,
      {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }
    );
  }

  switchLoginHandler = (event) => {
    event.preventDefault();

    this.props.onSwitchLogin();
  }

  componentWillUnmount() {
    //Once we are authenticated, we reset the redirectTo
    this.props.onSetRedirectTo(undefined);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLogin !== this.props.isLogin) {
      this.resetErrors();
    }
  }

  resetErrors = () => {
    if (this.state.error) {
      this.setState({
        error: undefined,
      });
    }

    if (this.props.error) {
      this.props.onResetError();
    }
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
      let additionalInput = null;

      if (!this.props.isLogin) {
        additionalInput = <input
          type="text"
          name="name"
          onChange={(inputValue) => { this.onInputChange('name', inputValue) } }
          value={this.state.name} placeholder="Your name" />;
      }

      form = (
        <form onSubmit={this.submitHandler}>
          {this.state.error ? <p className="Error">{this.state.error}</p> : null}
          {this.props.error ? <p className="Error">{this.props.error}</p> : null}
          <input type="email" name="email" onChange={(inputValue) => { this.onInputChange('email', inputValue) }} value={this.state.email} placeholder="E-Mail" />
          <input type="password" name="password" onChange={(inputValue) => { this.onInputChange('password', inputValue) } } value={this.state.password} placeholder="Password" />
          {additionalInput}
          <button className="ActionButton" onClick={this.switchLoginHandler}>Switch to {this.props.isLogin ? 'Sign Up' : 'Login' }</button>
          <button className="Submit">{this.props.isLogin ? 'Login' : 'Sign up' }</button>
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
    isLogin: state.auth.isLogin,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: (isLogin, formData) => dispatch(actionCreators.authenticate(isLogin, formData)),
    onSetRedirectTo: (redirectTo) => dispatch(actionCreators.setRedirectToAfterLogin(redirectTo)),
    onSwitchLogin: () => dispatch(actionCreators.switchLogin()),
    onResetError: () => dispatch(actionCreators.authResetError()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
