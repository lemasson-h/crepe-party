import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../store/actions';

const flashMessageHoc = (ChildComponent) => {
    const child = class extends Component {
      componentWillUnmount() {
        this.props.onResetFlashMessage();
      }

      render() {
        return <ChildComponent {...this.props} />;
      }
    };

    const mapDispatchToProps = dispatch => {
      return {
        onResetFlashMessage: () => dispatch(actionCreators.resetFlashMessage())
      }
    }

    return connect(undefined, mapDispatchToProps)(child);
}

export default flashMessageHoc;
