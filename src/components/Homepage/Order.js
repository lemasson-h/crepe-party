import React from 'react';

import Aux from '../../hoc/Aux';
import DeleteImage from '../UI/DeleteImage';
import EditImage from '../UI/EditImage';
import { getIngredientNames } from '../../helpers/crepeHelper';
import Spinner from '../UI/Spinner/Spinner';

const order = (props) => {
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

  let actions = <button disabled={props.orders.length === 0 || props.loadingOrder} className="Submit" onClick={props.sendOrderMethod}>Order</button>;

  if (props.sendingOrder) {
    actions = <Spinner small={1}/>;
  }

  return (
    <div className="Order">
      <h1 className="Header">My order</h1>
      {orders}
      <div className="Actions">
        {actions}
      </div>
    </div>
  );
};

export default order;
