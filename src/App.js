import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import UserAuth from './places/pages/Auth/UserAuth';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" component={Users} exact />
          <Route path="/places/new" component={NewPlace} exact />
          {/*order matters! if /places/:placeId was before /new we would always route to the placeId route with "new" as the id*/}
          <Route path="/places/:placeId" component={UpdatePlace} exact />
          <Route path="/:userId/places" component={UserPlaces} exact />
          <Route path="/auth" component={UserAuth} exact />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
