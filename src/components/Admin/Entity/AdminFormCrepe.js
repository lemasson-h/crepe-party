import React from 'react';

import AdminCrepeIngredients from '../AdminCrepeIngredients';
import Aux from '../../../hoc/Aux';

const adminFormCrepe = (props) => {
    return (
      <Aux>
        <input type="text" value={props.entity.name} onChange={props.changedCrepeNameMethod} placeholder="name"/>
        <h2>Ingredients</h2>
        <AdminCrepeIngredients
          crepe={props.entity}
          adminIngredients={props.ingredients}
          addIngredient={props.addIngredientMethod}
          removeIngredient={props.removeIngredientMethod}/>
      </Aux>
    );
  }
}

export default adminFormCrepe;
