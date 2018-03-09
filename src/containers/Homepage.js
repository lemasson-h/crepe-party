import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../store/actions';
import DeleteImage from '../components/UI/DeleteImage';
import EditImage from '../components/UI/EditImage';
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

    this.setState({
      showModal: false,
    });
  }

  addIngredientHandler = (event) => {
    event.preventDefault();
  }

  deleteIngredientHandler = (event) => {
    event.preventDefault();
  }

  lessIngredientHandler = (event) => {
    event.preventDefault();
  }

  moreIngredientHandler = (event) => {
    event.preventDefault();
  }

  addCrepeHandler = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Homepage">
        <Menu
        crepesLoading={this.props.crepesLoading}
        crepes={this.props.crepes}
        ingredients={this.props.ingredients}
        currentCrepe={this.props.currentCrepe}
        additionalIngredients={this.props.additionalIngredients}
        lessIngredientMethod={this.lessIngredientHandler}
        moreIngredientMethod={this.moreIngredientHandler}
        deleteIngredientMethod={this.deleteIngredientHandler}
        addIngredientMethod={this.addIngredientHandler}
        addCrepeMethod={this.addCrepeHandler}
        show={this.state.showModal}
        openModalMethod={this.openModalHandler}
        closeModalMethod={this.closeModalHandler} />
        <div className="Command">
          <h1 className="Header">My command</h1>
          <div className="Element">
            <div className="Title">Tartiflette</div>
            <div className="Content">
              <div>lardon, roblochon, onions, chives, cream</div>
              <div className="Actions">
                <button className="ImageButton"><EditImage message="Edit crepe" /></button>
                <button className="ImageButton"><DeleteImage message="Delete crepe" /></button>
              </div>
            </div>
          </div>
          <div className="LineSeparator" />
          <div className="Element">
            <div className="Title">Complete</div>
            <div className="Content">
              <div>Ham, cheese, mushroom, egg</div>
              <div className="Actions">
                <button className="ImageButton"><EditImage message="Edit crepe" /></button>
                <button className="ImageButton"><DeleteImage message="Delete crepe" /></button>
              </div>
            </div>
          </div>
        </div>
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
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadCrepes: () => dispatch(actionCreators.loadCrepes()),
    onLoadIngredients: () => dispatch(actionCreators.loadIngredients()),
    onLoadCustomizedCrepe: (crepe, ingredients) => dispatch(actionCreators.loadCustomizedCrepe(crepe, ingredients)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
