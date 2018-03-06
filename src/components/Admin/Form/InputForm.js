import React from 'react';

const inputForm = (props) => {
  return <input type="text"
    value={props.value}
    onChange={() => props.changedInputMethod(props.name)}
    placeholder={props.placeholder}/>
}

export default inputForm;
