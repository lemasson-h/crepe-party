import React from 'react';
import { NavLink } from 'react-router-dom';

import AdminEntity from './AdminEntity';
import Spinner from '../UI/Spinner/Spinner';
import './Admin.css'

const adminList = (props) => {
  let mainContent = <Spinner />;

  if (props.error) {
    mainContent = <div className="Content">Unable to load {props.entityName}.</div>
  } else if (!props.loading) {
    mainContent = props.entityList
      .map(
        entity => {
          return <AdminEntity key={entity.id} entityName={props.entityName} entity={entity} deleteEntity={props.deleteEntity}/>
        }
      );
    if (mainContent.length === 0) {
      mainContent = <div className="Content">No {props.entityName} yet, start adding some.</div>
    }
  }

  return (
    <div className="AdminPage">
      <h1>{ props.entityName.charAt(0).toUpperCase() + props.entityName.slice(1) }</h1>
      <nav>
        { props.entityAddLink ? <NavLink to={props.entityAddLink}>Add {props.entityName}</NavLink> : null }
      </nav>
      {mainContent}
    </div>
  );
}

export default adminList;
