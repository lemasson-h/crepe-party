import React from 'react';

import SmartLink from '../../../hoc/SmartLink';

const subNavigation = (props) => {
  return (
    <div className="NavLink">
      <SmartLink to={props.parentPath}>{props.parentName}</SmartLink>
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
