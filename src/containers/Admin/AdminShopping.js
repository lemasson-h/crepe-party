import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import FlashMessage from '../../components/UI/FlashMessage';
import flashMessageHoc from '../../hoc/FlashMessageHoc';
import Spinner from '../../components/UI/Spinner/Spinner';

class AdminShopping extends Component {
    componentDidMount() {
      this.props.onLoadShopping(this.props.token);
    }

    render() {
      let content = <Spinner />;

      if (!this.props.loading) {
        content = Object.keys(this.props.shoppingList).map(ingredientName => {
          return (
            <tr className="ShoppingItem"
              key={ingredientName}>
              <td>{ingredientName}</td>
              <td>{this.props.shoppingList[ingredientName]}</td>
            </tr>
          );
        });
      }

      return (
        <div className="AdminPage">
          <h1>Shopping List</h1>
          <div className="Content" style={{marginTop: '-10px'}}>
            <FlashMessage message={this.props.flashMessage} />
            <table className="ShoppingList List">
              {content}
            </table>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    flashMessage: state.flashMessage.message,
    shoppingList: state.adminShopping.list,
    loading: state.adminShopping.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadShopping: (token) => dispatch(actionCreators.loadShopping(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(flashMessageHoc(AdminShopping));
