import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Profile.css';
import '../../assets/css/form.css';

class Profile extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    this.setState({
      name: this.props.name
    });
  }

  render() {
    return (
      <div className="Profile">
        <h1 className="Header">Your profile</h1>
        <div className="Form">
          <form>
            <input type="text" name="name" value={this.state.name} placeholder="Your name" />
            <button className="Submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.auth.username,
  }
};

export default connect(mapStateToProps)(Profile);
