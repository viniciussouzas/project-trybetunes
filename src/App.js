import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import { createUser } from './services/userAPI';

const MIN_LENGTH_LOGIN = 3;
const MIN_LENGTH_SEARCH = 2;

class App extends React.Component {
  state = {
    login: '',
    search: '',
    searchArtist: '',
    searchMusics: [],
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

  handleSearchAlbums = async () => {
    const { search } = this.state;

    this.setState({
      loading: true,
    });

    const musicsOfArtist = await searchAlbumsAPI(search);

    if (musicsOfArtist) {
      this.setState({
        loading: false,
        search: '',
        searchArtist: search,
        searchMusics: musicsOfArtist,
      });
    }
  };

  render() {
    const { login, loading, redirect, search, searchArtist, searchMusics } = this.state;

    const buttonDisabledLogin = login.length < MIN_LENGTH_LOGIN;

    const buttonDisabledSearch = search.length < MIN_LENGTH_SEARCH;

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
              isButtonDisabled={ buttonDisabledLogin }
            />) }
          />
          <Route
            exact
            path="/search"
            render={ (props) => (<Search
              { ...props }
              onInputChange={ this.onInputChange }
              handleSearchAlbums={ this.handleSearchAlbums }
              search={ search }
              loading={ loading }
              searchArtist={ searchArtist }
              searchMusics={ searchMusics }
              isButtonDisabled={ buttonDisabledSearch }
            />) }
          />
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
