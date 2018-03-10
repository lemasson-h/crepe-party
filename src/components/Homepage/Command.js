import React from 'react';

import Aux from '../../hoc/Aux';
import DeleteImage from '../UI/DeleteImage';
import EditImage from '../UI/EditImage';
import { getIngredientNames } from '../../helpers/crepeHelper';

const command = (props) => {
  const length = props.orders.length;
  let currentLength = 0;
  let orders = props.orders.map(order => {
    ++currentLength;
    const ingredientNames = getIngredientNames(order, props.ingredients);

    return (
      <Aux key={order.uniqueId}>
        <div className="Element">
          <div className="Title">{order.name}</div>
          <div className="Content">
            <div>{ingredientNames.join(', ')}</div>
            <div className="Actions">
              <button className="ImageButton" onClick={(e) => props.openModalMethod(e, order)}><EditImage message="Edit crepe" /></button>
              <button className="ImageButton" onClick={(e) => props.deleteCrepeMethod(e, order.uniqueId)}><DeleteImage message="Delete crepe" /></button>
            </div>
          </div>
        </div>
        {currentLength < length ? <div className="LineSeparator" /> : null}
      </Aux>
    );
  });

  if (orders.length === 0) {
    orders = <div className="EmptyBasket">Empty basket.</div>
  }

  return (
    <div className="Command">
      <h1 className="Header">My command</h1>
      {orders}
    </div>
  );
};

export default command;
