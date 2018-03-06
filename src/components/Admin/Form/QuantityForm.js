import React from 'react';

const quantityForm = (props) => {
/**
Ingredient => QuantityForm
IngredientName => QuantityFormName
IngredientQuantity => QuantityFormValue
*/
  return (
    <div className="QuantityForm" key={props.entity.id}>
      <div className="QuantityFormName">{props.entity.name} <span>({props.entity.name})</span></div>
      <div className="QuantityFormValue">{props.entity.value}</div>
      <button className="Plus"
        onClick={e => props.addEntity(e, props.entity.id)}>+</button>
      <button className="Less"
        disabled={props.entity.value < 1}
        onClick={e => props.removeEntity(e, props.entity.id)}>-</button>
    </div>
  );
}

export default quantityForm;
