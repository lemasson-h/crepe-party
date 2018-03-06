import React from 'react';

const quantityListForm = (props) => {
  const {quantityList} = Object.keys(props.entityList).map(entityId => {
    return (
      <QuantityForm
        key={entityId}
        entity={props.entityList[entityId]}
        addEntity={props.addEntity}
        removeEntity={props.removeEntity}/>
    );
  });

/** Ingredients **/
  return (
    <div className="QuantityListForm">
      {quantityList}
    </div>
  );
}

export default quantityListForm;
