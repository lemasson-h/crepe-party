import React from 'react';

import AddImage from '../UI/AddImage';
import Aux from '../../hoc/Aux';
import CustomizeCrepe from './CustomizeCrepe';
import EditImage from '../UI/EditImage';
import Spinner from '../UI/Spinner/Spinner';

const menu = (props) => {
  let content = <Spinner />;

  if (!props.crepesLoading) {
    const crepes = props.crepes.map(crepe => {
      const ingredientNames = Object.keys(crepe.ingredients).map(ingredientId => {
          const ingredientFound = props.ingredients.find(ingredient => {
            return ingredient.id === ingredientId;
          })

          return (ingredientFound !== undefined) ? ingredientFound.name : null;
      }).filter(value => value !== null);

      return (
        <div key={crepe.id} className="Element">
          <div className="Title">{crepe.name}</div>
          <div className="Content">
            <div>{ingredientNames.join(', ')}</div>
            <div className="Actions">
              <button className="ImageButton"><AddImage message="Add Crepe"/></button>
              <button className="ImageButton" onClick={(e) => props.openModalMethod(e, crepe)}><EditImage message="Customize crepe" /></button>
            </div>
          </div>
        </div>
      );
    });

    content = (
      <Aux>
        {crepes}
        <CustomizeCrepe
          crepe={props.currentCrepe}
          ingredients={props.ingredients}
          additionalIngredients={props.additionalIngredients}
          lessIngredientMethod={props.lessIngredientMethod}
          moreIngredientMethod={props.moreIngredientMethod}
          deleteIngredientMethod={props.deleteIngredientMethod}
          addIngredientMethod={props.addIngredientMethod}
          addCrepeMethod={props.addCrepeMethod}
          modalError={props.modalError}
          show={props.show}
          closeModalMethod={props.closeModalMethod}/>
      </Aux>
    )
  }

  return (
    <div className="Menu">
      <h1 className="Header">Menu</h1>
        {content}
    </div>
  );
}

export default menu;
