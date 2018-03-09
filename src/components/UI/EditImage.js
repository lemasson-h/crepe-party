import React from 'react';

import editImg from '../../assets/images/edit.png';

const editImage = (props) => (
  <img src={editImg} alt={props.message} width="20"/>
);

export default editImage;
