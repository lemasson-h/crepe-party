import React from 'react';

import addImg from '../../assets/images/add.png';

const addImage = (props) => (
  <img src={addImg} alt={props.message} width="20"/>
);

export default addImage;
