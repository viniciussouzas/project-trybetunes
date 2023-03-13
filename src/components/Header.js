import { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    userName: '',
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    const responseUser = await getUser();

    this.setState({
      userName: responseUser.name,
    });
  };

  render() {
    const { userName } = this.state;

    if (userName === '') return <Loading />;

    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">{userName}</h2>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
