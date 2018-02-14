import React from 'react';
import { NavLink } from 'react-router-dom';

import './AdminMenu.css'

const adminIngredients = (props) => {
  console.log(props.ingredients);
  const items = props.menu
    .map(
      crepe => {
        return <AdminIngredient key={ingredient.id} ingredient={ingredient} deleteIngredient={props.deleteIngredient}/>
      }
    );

  return <div className="AdminMenu">
    <h1>Ingredients</h1>
    <nav>
      <NavLink to="/admin/ingredient/add">Add Ingredients</NavLink>
    </nav>
    {items}
  </div>;
}

export default adminMenu;
