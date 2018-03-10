import React from 'react';

import AddImage from '../UI/AddImage';
import Aux from '../../hoc/Aux';
import EditImage from '../UI/EditImage';
import { getIngredientNames } from '../../helpers/crepeHelper';
import Spinner from '../UI/Spinner/Spinner';

const ucfirst = (str) => {
  return str[0].toUpperCase() + str.substr(1);
}

const menu = (props) => {
  let content = <Spinner />;

  if (!props.crepesLoading) {
    const crepes = props.crepes.map(crepe => {
      const ingredientNames = getIngredientNames(crepe, props.ingredients);

      return (
        <div key={crepe.id} className="Element">
          <div className="Title">{crepe.name}</div>
          <div className="Content">
            <div>{ingredientNames.join(', ')}</div>
            <div className="Actions">
              <button className="ImageButton" onClick={(e) => props.addCrepeMethod(e, crepe)}><AddImage message="Add Crepe"/></button>
              <button className="ImageButton" onClick={(e) => props.openModalMethod(e, crepe)}><EditImage message="Customize crepe" /></button>
            </div>
          </div>
        </div>
      );
    });

    content = (
      <Aux>
        {crepes}
      </Aux>
    )
  }

  return (
    <div className="Menu">
      <h1 className="Header">Menu</h1>
        {!props.show && props.flashMessage ? <div className={ucfirst(props.flashMessage.type)}>{props.flashMessage.message}</div> : null}
        {content}
    </div>
  );
}

export default menu;
