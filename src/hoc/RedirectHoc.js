import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../store/actions';

const redirectHoc = (ChildComponent) => {
    const child = class extends Component {
      componentDidUpdate() {
        if (undefined !== this.props.globalRedirectTo) {
          this.props.onSetRedirectTo();
        }
      }

      render() {
        if (undefined !== this.props.globalRedirectTo) {
          return <Redirect to={this.props.globalRedirectTo} />;
        }

        return <ChildComponent {...this.props} />;
      }
    };

    const mapStateToProps = state => {
      return {
        globalRedirectTo: state.globalRedirect.redirectTo,
      };
    }

    const mapDispatchToProps = dispatch => {
      return {
        onSetRedirectTo: () => dispatch(actionCreators.setGlobalRedirectTo())
      }
    }

    return withRouter(connect(mapStateToProps, mapDispatchToProps)(child));
}

export default redirectHoc;
