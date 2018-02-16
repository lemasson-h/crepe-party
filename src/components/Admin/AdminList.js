import React from 'react';
import { NavLink } from 'react-router-dom';

import AdminEntity from './AdminEntity';
import Spinner from '../UI/Spinner/Spinner';
import './Admin.css'

const adminList = (props) => {
  let mainContent = <Spinner />;

  if (props.error) {
    mainContent = <p>Unable to load {props.entityName}.</p>
  } else if (!props.loading) {
    mainContent = props.entityList
      .map(
        entity => {
          return <AdminEntity key={entity.id} entityName={props.entityName} entity={entity} deleteEntity={props.deleteEntity}/>
        }
      );
    if (mainContent.length === 0) {
      mainContent = <p>No {props.entityName} yet, start adding some.</p>
    }
  }

  return (
    <div className="AdminPage">
      <h1>{ props.entityName.charAt(0).toUpperCase() + props.entityName.slice(1) }</h1>
      <nav>
        { props.entityAddLink ? <NavLink to={props.entityAddLink}>Add {props.entityName}</NavLink> : null }
      </nav>
      <div className="Content">
        {mainContent}
      </div>
    </div>
  );
}

export default adminList;
