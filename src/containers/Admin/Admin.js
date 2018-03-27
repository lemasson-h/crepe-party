import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminCrepes from './AdminCrepes';
import AdminEditCrepe from './AdminEditCrepe';
import AdminEditIngredient from './AdminEditIngredient';
import AdminIngredients from './AdminIngredients';
import AdminNewCrepe from './AdminNewCrepe';
import AdminNewIngredient from './AdminNewIngredient';
import AdminShopping from './AdminShopping';
import AdminUsers from './AdminUsers';
import NotFound from '../../components/NotFound/NotFound';

class Admin extends Component {
    render() {
      return (
        <div>
          <Switch>
              <Route path={this.props.match.url} exact component={AdminUsers} />
              <Route path={this.props.match.url + '/crepes'} exact component={AdminCrepes} />
              <Route path={this.props.match.url + '/crepes/add'} exact component={AdminNewCrepe} />
              <Route path={this.props.match.url + '/crepes/:crepeId/edit'} exact component={AdminEditCrepe} />
              <Route path={this.props.match.url + '/ingredients'} exact component={AdminIngredients} />
              <Route path={this.props.match.url + '/ingredients/add'} exact component={AdminNewIngredient} />
              <Route path={this.props.match.url + '/ingredients/:ingredientId/edit'} exact component={AdminEditIngredient} />
              <Route path={this.props.match.url + '/shopping'} exact component={AdminShopping} />
              <Route component={NotFound} />
          </Switch>
        </div>
      );
    }
}

export default Admin;
