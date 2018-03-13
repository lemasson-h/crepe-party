import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import './Profile.css';
import '../../assets/css/form.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Profile extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    this.setState({
      name: this.props.name
    });
  }

  componentWillUnmount() {
    this.props.onResetUpdateUsername();
  }

  submitHandler = (e) => {
    e.preventDefault();

    this.props.onUpdateUsername(this.props.userId, this.props.token, this.state.name);
  }

  changeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    let content = <Spinner />;

    if (!this.props.loading) {
      content = (
        <form onSubmit={this.submitHandler}>
          {this.props.error ? <div className="Error">{this.props.error}</div> : null}
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Your name"
            onChange={this.changeHandler} />
          <button className="Submit">Save</button>
        </form>
      );
    }

    return (
      <div className="Profile">
        <h1 className="Header">Your profile</h1>
        <div className="Form">
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    name: state.auth.username,
    loading: state.auth.profile.loading,
    error: state.auth.profile.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onResetUpdateUsername: () => dispatch(actionCreators.authResetUpdateUsername()),
    onUpdateUsername: (userId, token, name) => dispatch(actionCreators.authUpdateUsername(userId, token, name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
