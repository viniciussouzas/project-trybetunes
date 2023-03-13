import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

const MIN_LENGTH = 3;

class App extends React.Component {
  state = {
    login: '',
    loading: false,
    redirect: false,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(({
      [name]: value,
    }));
  };

  handleCreateUser = async () => {
    const { login } = this.state;

    this.setState({
      loading: true,
    });

    const response = await createUser({ name: login });

    if (response === 'OK') {
      this.setState({
        loading: false,
        redirect: true,
      });
    }
  };

  render() {
    const { login, loading, redirect } = this.state;

    const buttonDisabled = login.length < MIN_LENGTH === true;

    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              onInputChange={ this.onInputChange }
              handleCreateUser={ this.handleCreateUser }
              login={ login }
              loading={ loading }
              redirect={ redirect }
              isButtonDisabled={ buttonDisabled }
            />) }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <NotFound />
        </Switch>
      </div>
    );
  }
}

export default App;
