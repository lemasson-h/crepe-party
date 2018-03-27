import React from 'react';

const ucfirst = (str) => {
  return str[0].toUpperCase() + str.substr(1);
}

const flashMessage = (props) => {
  console.log(props);

  return (
    props.message ?
      <div className={"FlashMessage " + ucfirst(props.message.type)}>{props.message.value}</div>
      : null
  );
}

export default flashMessage;
