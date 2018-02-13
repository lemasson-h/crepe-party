import React from 'react';

import Navigation from './Navigation/Navigation';
import './Layout.css';

const layout = (props) => {
  return (
    <div className="Layout">
      <Navigation isAuthenticated={props.isAuthenticated} isAdmin={props.isAdmin} />
      {props.children}
    </div>
  );
}

export default layout;
