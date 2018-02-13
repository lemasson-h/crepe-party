import React from 'react';
import { NavLink } from 'react-router-dom';

import AdminCrepe from './AdminCrepe';
import './AdminMenu.css';

const adminMenu = (props) => {
  console.log(props.menu);
  const items = props.menu
    .map(
      crepe => {
        return <AdminCrepe key={crepe.id} crepe={crepe} deleteCrepe={props.deleteCrepe}/>
      }
    );

  return <div className="AdminMenu">
    <h1>Menu</h1>
    <nav>
      <NavLink to="/admin/crepe/add">Add crepe</NavLink>
    </nav>
    {items}
  </div>;
}

export default adminMenu;
