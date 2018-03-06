import React from 'react';

import InputForm from './Form/InputForm';
import QuantityListForm from './Form/QuantityListForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../components/Admin/Admin.css';

const adminForm = (props) => {
  const children = Object.keys(props.entity).map(entityName => {
    switch(props.entity[entityName].type) {
      case 'input':
        return <InputForm
        key={entityName}
        name={entityName}
        value={props.entity[entityName].value}
        placeholder={props.entity[entityName].placeholder} />;
      case 'quantityList':
        return <QuantityListForm
          entityList={props.entity[entityName].value}
          addEntity={props.entity[entityName].addEntity}
          removeEntity={props.entity[entityName].removeEntity}
      default:
        return null;
    }
  });

  if (!props.initialized) {
    return (
      <div className="AdminPage">
        <h1>Loading {props.entityName}</h1>
        <Spinner />
      </div>
    );
  } else if (props.loading) {
    return (
      <div className="AdminPage">
        <h1>{props.entity.id !== null ? 'Saving' : 'Creating'} {props.entityName}</h1>
        <Spinner />
      </div>
    );
  }

  if (props.finished) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="AdminPage">
      <h1>{props.entity.id !== null ? 'Edit' : 'New'} {props.entityName}</h1>
      <form onSubmit={props.submitFormMethod}>
        {children}
        <div className="FormActions">
          <button className="Submit" onClick={this.cancelFormMethod}>Cancel</button>
          <button className="Submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default adminForm;
