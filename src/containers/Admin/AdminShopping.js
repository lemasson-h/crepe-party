import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import FlashMessage from '../../components/UI/FlashMessage';
import flashMessageHoc from '../../hoc/FlashMessageHoc';

class AdminShopping extends Component {
    componentDidMount() {
    }

    render() {
      return (
        <div className="AdminPage">
          <h1>Shopping List</h1>
          <div className="Content" style={{marginTop: '-20px'}}>
            <FlashMessage message={this.props.flashMessage} />
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    flashMessage: state.flashMessage.message,
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(flashMessageHoc(AdminShopping));
