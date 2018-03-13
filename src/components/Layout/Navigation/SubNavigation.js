import React from 'react';

import SmartLink from '../../../hoc/SmartLink';

const buildLink = (link, key = undefined) => {
  const duplicateLink = {
    ...link,
    props: {
      ...link.props,
      activeClassName: "subActive"
    }
  };

  return (
    <div key={key}
      className="NavLink">
      {duplicateLink}
    </div>
  );
}

const subNavigation = (props) => {
  let children = null;

  if (props.children instanceof Array) {
    children = props.children.map((child, key) => {
        return buildLink(child, key);
      }
    );
  } else {
    children = buildLink(props.children);
  }

  return (
    <div className="NavLink">
      <SmartLink to={props.parentPath}>{props.parentName}</SmartLink>
      <div className="Navigation">
        {children}
      </div>
    </div>
  );
}

export default subNavigation;
