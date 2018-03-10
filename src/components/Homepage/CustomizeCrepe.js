import React from 'react';

import DeleteImage from '../UI/DeleteImage';
import Modal from '../UI/Modal/Modal';

const customizeCrepe = (props) => {
  let currentIngredients = null;
  let additionalIngredients = null;

  if (props.crepe !== undefined) {
    currentIngredients = Object.keys(props.crepe.ingredients).map(ingredientId => {
      const ingredientFound = props.ingredients.find(ingredient => {
        return ingredient.id === ingredientId;
      });

      return (
        <div key={ingredientId} className="Ingredient">
          <div className="Name">{ingredientFound.name}</div>
          <div className="Quantity">
            <button className="QuantityButton Less" onClick={(e) => props.lessIngredientMethod(e, ingredientId)}>-</button>
            <div>{props.crepe.ingredients[ingredientId]}</div>
            <button className="QuantityButton Plus" onClick={(e) => props.moreIngredientMethod(e, ingredientId)}>+</button>
          </div>
          <button className="ImageButton" onClick={(e) => props.deleteIngredientMethod(e, ingredientId)}><DeleteImage message="Delete ingredient" /></button>
        </div>
      );
    });

    additionalIngredients = props.additionalIngredients.map(ingredient => {
      return (
        <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
      );
    });
  }

  return (
    <Modal show={props.show} closeModal={props.closeModalMethod}>
      <div className="IngredientsWrapper">
        <h1 className="Header">Customize crepe {props.crepe ? props.crepe.name : null}</h1>
        {props.modalError ? <div className="Error">{props.modalError}</div> : null}
        <div className="Ingredients">
          {currentIngredients}
        </div>
        <div className="LineSeparator"/>
        <div className="AdditionalIngredients">
          <form onSubmit={props.addIngredientMethod}>
            <select onChange={props.changeCurrentAdditionalIngredientMethod}>
              {additionalIngredients}
            </select>
            <button className="Submit" onClick={props.addIngredientMethod}>Add</button>
          </form>
        </div>
        <div className="LineSeparator"/>
        <div className="Actions">
          <button className="Submit" onClick={props.closeModalMethod}>Cancel</button>
          <button className="Submit" onClick={props.addCrepeMethod}>{props.crepe && props.crepe.uniqueId ? 'Edit' : 'Add'}</button>
        </div>
      </div>
    </Modal>
  );
}

export default customizeCrepe;
