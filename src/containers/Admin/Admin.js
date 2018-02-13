import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminHomepage from './AdminHomepage';
import AdminNewCrepe from './AdminNewCrepe';
import NotFound from '../../components/NotFound/NotFound';

class Admin extends Component {
    render() {
      return (
        <div>
          <Switch>
              <Route path={this.props.match.url} exact component={AdminHomepage} />
              <Route path={this.props.match.url + '/crepe/add'} exact component={AdminNewCrepe} />
              <Route component={NotFound} />
          </Switch>
        </div>
      );
    }
}

export default Admin;
