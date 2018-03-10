import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../store/actions';
import Command from '../components/Homepage/Command';
import Menu from '../components/Homepage/Menu';
import '../components/Homepage/Homepage.css';
import '../assets/css/shared.css';

class Homepage extends Component {
  state = {
    showModal: false,
  }

  componentDidMount() {
    this.props.onLoadIngredients();
    this.props.onLoadCrepes();
  }

  openModalHandler = (event, crepe) => {
    event.preventDefault();

    this.props.onLoadCustomizedCrepe(crepe, this.props.ingredients);

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

    this.props.onSetTimerFlashMessage(
      setTimeout(() => this.props.onResetFlashMessage(), 5000)
    );
  }

  changeCurrentAdditionalIngredientHandler = (event) => {
    this.props.onChangeCurrentAdditionalIngredientHandler(event.target.value);
  }

  deleteCrepeHandler = (event, uniqueId) => {
    this.props.onRemoveCrepe(uniqueId);

    this.props.onSetTimerFlashMessage(
      setTimeout(() => this.props.onResetFlashMessage(), 5000)
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
          currentCrepe={this.props.currentCrepe}
          additionalIngredients={this.props.additionalIngredients}
          lessIngredientMethod={this.lessIngredientHandler}
          moreIngredientMethod={this.moreIngredientHandler}
          deleteIngredientMethod={this.deleteIngredientHandler}
          addIngredientMethod={this.addIngredientHandler}
          changeCurrentAdditionalIngredientMethod={this.changeCurrentAdditionalIngredientHandler}
          addCrepeMethod={this.addCrepeHandler}
          modalError={this.props.modalError}
          show={this.state.showModal}
          openModalMethod={this.openModalHandler}
          closeModalMethod={this.closeModalHandler} />
        <Command
          orders={this.props.orders}
          ingredients={this.props.ingredients}
          deleteCrepeMethod={this.deleteCrepeHandler}/>
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
    flashMessage: state.order.flashMessage,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadCrepes: () => dispatch(actionCreators.loadCrepes()),
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
    onResetFlashMessage: () => dispatch(actionCreators.resetFlashMessageForOrder()),
    onSetTimerFlashMessage: (timer) => dispatch(actionCreators.setTimerFlashMessageForOrder(timer)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
