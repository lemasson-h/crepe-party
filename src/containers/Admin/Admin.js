import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminCrepes from './AdminCrepes';
import AdminIngredients from './AdminIngredients';
import AdminNewCrepe from './AdminNewCrepe';
import AdminNewIngredient from './AdminNewIngredient';
import NotFound from '../../components/NotFound/NotFound';

class Admin extends Component {
    render() {
      return (
        <div>
          <Switch>
              <Route path={this.props.match.url} exact component={AdminCrepes} />
              <Route path={this.props.match.url + '/crepes/add'} exact component={AdminNewCrepe} />
              <Route path={this.props.match.url + '/ingredients'} exact component={AdminIngredients} />
              <Route path={this.props.match.url + '/ingredients/add'} exact component={AdminNewIngredient} />
              <Route component={NotFound} />
          </Switch>
        </div>
      );
    }
}

export default Admin;
