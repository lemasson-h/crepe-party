import React from 'react';

import AdminCrepe from './AdminCrepe';
import './AdminMenu.css';

const adminMenu = (props) => {
  const items = props.menu.map((item) => {
    return <AdminCrepe crepe={item} />
  });

  return <div className="AdminMenu">
    <h1>Menu</h1>
    {items}
  </div>;
}

export default adminMenu;
