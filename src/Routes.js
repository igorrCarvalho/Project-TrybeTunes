import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class Routes extends React.Component {
  render() {
    return (
      <>
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/profile/edit" render={ (props) => <ProfileEdit { ...props } /> } />
        <Route path="*" component={ NotFound } />
      </>
    );
  }
}

export default Routes;
