import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actionCreators from '../store/actions';

class SmartLink extends Component {
  resetRequestSendOrder = () => {
    this.props.onResetRequestSendOrder();
  }

  render() {
    const props = {
      ...this.props
    };

    delete props.onResetRequestSendOrder;

    return (
      <NavLink {...props} onClick={this.resetRequestSendOrder}>
        {props.children}
      </NavLink>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetRequestSendOrder: () => dispatch(actionCreators.resetRequestSendOrder()),
  };
}

export default connect(null, mapDispatchToProps)(SmartLink);
