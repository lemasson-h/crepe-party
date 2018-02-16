import React from 'react';

import AdminCrepe from './Entity/AdminCrepe';
import AdminIngredient from './Entity/AdminIngredient';
import NotFound from '../NotFound/NotFound';

const adminEntity = (props) => {
  let entityContent = null;

  switch (props.entityName) {
    case 'crepes':
      entityContent = <AdminCrepe crepe={props.entity} />;
      break;
    case 'ingredients':
      entityContent = <AdminIngredient ingredient={props.entity} />;
      break;
    default:
  }

  if (null === entityContent) {
    return <NotFound />;
  }

  return (
    <div>
      <h2>{props.entity.name}</h2>
      {entityContent}
      <button onClick={() => props.deleteEntity(props.entity.id) }>Delete</button>
    </div>
  );
}

export default adminEntity;
