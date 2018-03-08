import React from 'react';

import deleteImg from '../../assets/images/delete.png';

const deleteImage = (props) => (
  <img src={deleteImg} alt={props.message} width="20"/>
);

export default deleteImage;
