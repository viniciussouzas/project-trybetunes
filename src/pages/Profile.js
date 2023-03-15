import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    userName: '',
    loading: false,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    this.setState({
      loading: true,
    });

    const responseUser = await getUser();

    this.setState({
      userName: responseUser,
      loading: false,
    });
  };

  render() {
    const { userName: { name, email, image, description }, loading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading
          ? <Loading />
          : (
            <div>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <h2>
                Nome:
                <p>{name}</p>
              </h2>
              <h3>
                Email:
                <p>{email}</p>
              </h3>
              <h4>
                Descrição:
                <p>{description}</p>
              </h4>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>) }
      </div>
    );
  }
}

export default Profile;
