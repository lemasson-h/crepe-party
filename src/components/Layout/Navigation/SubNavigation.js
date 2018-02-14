import React from 'react';
import { NavLink } from 'react-router-dom';

const subNavigation = (props) => {
  return (
    <div className="NavLink">
      <NavLink to={props.parentPath}>{props.parentName}</NavLink>
      <div className="Navigation">
          {props.children.map((child, key) => {
              const duplicateChild = {
                ...child,
                props: {
                  ...child.props,
                  activeClassName: "subActive"
                }
              };

              return (
                <div key={key}
                  className="NavLink">
                  {duplicateChild}
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}

export default subNavigation;
