import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminHomepage from './AdminHomepage';

class Admin extends Component {
    render() {
      return (
        <div>
          <Switch>
              <Route path={this.props.match.url} exact component={AdminHomepage} />
          </Switch>
        </div>
      );
    }
}

export default Admin;
