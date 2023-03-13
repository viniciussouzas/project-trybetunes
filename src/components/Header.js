import { Component } from 'react';
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
        <p data-testid="header-user-name">{userName}</p>
      </header>
    );
  }
}

export default Header;
