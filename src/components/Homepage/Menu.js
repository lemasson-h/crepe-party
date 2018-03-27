import React from 'react';

import AddImage from '../UI/AddImage';
import Aux from '../../hoc/Aux';
import EditImage from '../UI/EditImage';
import FlashMessage from '../../components/UI/FlashMessage';
import { getIngredientNames } from '../../helpers/crepeHelper';
import Spinner from '../UI/Spinner/Spinner';

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
        <FlashMessage message={props.flashMessage} />
        {content}
    </div>
  );
}

export default menu;
