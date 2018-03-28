import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../store/actions';
import CustomizeCrepe from '../components/Homepage/CustomizeCrepe';
import flashMessageHoc from '../hoc/FlashMessageHoc';
import Menu from '../components/Homepage/Menu';
import Order from '../components/Homepage/Order';
import '../components/Homepage/Homepage.css';
import '../assets/css/shared.css';

class Homepage extends Component {
  state = {
    showModal: false,
  }

  submitOrderIfNecessary = () => {
      if (this.props.crepesLoading || !this.props.requestSendOrder || this.props.loadingOrder) {
        return ;
      }

      this.props.onSendOrder(
        this.props.token,
        this.props.userId,
        this.props.orderId,
        this.props.orders
      );
  }

  componentDidUpdate(prevProps, prevState) {
    this.submitOrderIfNecessary();

    if (prevProps.ingredients !== this.props.ingredients) {
      this.props.onLoadCrepes(this.props.ingredients);
    }
  }

  componentDidMount() {
    this.props.onLoadIngredients();
    this.submitOrderIfNecessary();
  }

  openModalHandler = (event, crepe) => {
    event.preventDefault();

    if (undefined !== crepe.uniqueId) {
      this.props.onLoadOrderCrepe(crepe, this.props.ingredients);
    } else {
      this.props.onLoadCustomizedCrepe(crepe, this.props.ingredients);
    }

    this.setState({
      showModal: true,
    });
  }

  closeModalHandler = (event) => {
    event.preventDefault();

    this.props.onResetCustomizedCrepe();

    this.setState({
      showModal: false,
    });
  }

  addIngredientHandler = (event) => {
    event.preventDefault();

    this.props.onAddIngredient(
      this.props.currentAdditonalIngredient,
      this.props.ingredients
    );
  }

  deleteIngredientHandler = (event, ingredientId) => {
    event.preventDefault();

    this.props.onRemoveIngredient(ingredientId, this.props.ingredients);
  }

  lessIngredientHandler = (event, ingredientId) => {
    event.preventDefault();

    this.props.onLessIngredient(ingredientId, this.props.ingredients);
  }

  moreIngredientHandler = (event, ingredientId) => {
    event.preventDefault();

    this.props.onMoreIngredient(ingredientId);
  }

  addCrepeHandler = (event, crepe = undefined) => {
    event.preventDefault();

    if (undefined === crepe) {
      crepe = this.props.currentCrepe;
    }

    this.props.onAddCrepe(crepe);
    if (this.state.showModal) {
      this.closeModalHandler(event);
    }
  }

  changeCurrentAdditionalIngredientHandler = (event) => {
    this.props.onChangeCurrentAdditionalIngredientHandler(event.target.value);
  }

  deleteCrepeHandler = (event, uniqueId) => {
    this.props.onRemoveCrepe(uniqueId);
  }

  sendOrderHandler = (event) => {
    event.preventDefault();

    this.props.onSendOrder(
      this.props.token,
      this.props.userId,
      this.props.orderId,
      this.props.orders
    );
  }

  render() {
    return (
      <div className="Homepage">
        <Menu
          flashMessage={this.props.flashMessage}
          crepesLoading={this.props.crepesLoading}
          crepes={this.props.crepes}
          ingredients={this.props.ingredients}
          addCrepeMethod={this.addCrepeHandler}
          show={this.state.showModal}
          openModalMethod={this.openModalHandler} />
        <Order
          orders={this.props.orders}
          ingredients={this.props.ingredients}
          deleteCrepeMethod={this.deleteCrepeHandler}
          openModalMethod={this.openModalHandler}
          sendOrderMethod={this.sendOrderHandler}
          loadingOrder={this.props.loadingOrder}
          sendingOrder={this.props.sendingOrder} />
        <CustomizeCrepe
          crepe={this.props.currentCrepe}
          ingredients={this.props.ingredients}
          additionalIngredients={this.props.additionalIngredients}
          lessIngredientMethod={this.lessIngredientHandler}
          moreIngredientMethod={this.moreIngredientHandler}
          deleteIngredientMethod={this.deleteIngredientHandler}
          addIngredientMethod={this.addIngredientHandler}
          changeCurrentAdditionalIngredientMethod={this.changeCurrentAdditionalIngredientHandler}
          addCrepeMethod={this.addCrepeHandler}
          modalError={this.props.modalError}
          show={this.state.showModal}
          closeModalMethod={this.closeModalHandler}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    crepes: state.crepes.crepes,
    ingredients: state.ingredients.ingredients,
    crepesLoading: state.crepes.loading || state.ingredients.loading,
    currentCrepe: state.crepes.currentCrepe,
    additionalIngredients: state.crepes.additionalIngredients,
    modalError: state.crepes.errorModal,
    currentAdditonalIngredient: state.crepes.currentAdditonalIngredient,
    orders: state.order.orders,
    flashMessage: state.flashMessage.message,
    userId: state.auth.userId,
    token: state.auth.token,
    orderId: state.order.orderId,
    requestSendOrder: state.order.submitRequested,
    loadingOrder: state.order.loadingOrder,
    sendingOrder: state.order.loadingSend,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadCrepes: (ingredients) => dispatch(actionCreators.loadCrepes(ingredients)),
    onLoadIngredients: () => dispatch(actionCreators.loadIngredients()),
    onLoadCustomizedCrepe: (crepe, ingredients) => dispatch(actionCreators.loadCustomizedCrepe(crepe, ingredients)),
    onResetCustomizedCrepe: () => dispatch(actionCreators.resetCustomizedCrepe()),
    onMoreIngredient: (ingredientId) => dispatch(actionCreators.moreIngredientForCrepe(ingredientId)),
    onLessIngredient: (ingredientId, ingredients) => dispatch(actionCreators.lessIngredientForCrepe(ingredientId, ingredients)),
    onRemoveIngredient: (ingredientId, ingredients) => dispatch(actionCreators.removeIngredientForCrepe(ingredientId, ingredients)),
    onAddIngredient: (ingredientId, ingredients) => dispatch(actionCreators.addIngredientForCrepe(ingredientId, ingredients)),
    onChangeCurrentAdditionalIngredientHandler: (ingredientId) => dispatch(actionCreators.changeCurrentAdditionalIngredient(ingredientId)),
    onAddCrepe: (crepe) => dispatch(actionCreators.addCrepeToOrder(crepe)),
    onRemoveCrepe: (uniqueId) => dispatch(actionCreators.removeCrepeToOrder(uniqueId)),
    onLoadOrderCrepe: (crepe, ingredients) => dispatch(actionCreators.loadOrderCrepe(crepe, ingredients)),
    onSendOrder: (token, userId, orderId, orders) => dispatch(actionCreators.sendOrder(token, userId, orderId, orders)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(flashMessageHoc(Homepage));
