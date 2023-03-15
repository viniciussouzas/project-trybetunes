import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../Loading';
import { getUser, updateUser } from '../services/userAPI';

const MIN_LENGTH_PROFILE = 0;

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    this.setState({
      loading: true,
    });

    const response = await getUser();

    const { name, email, image, description } = response;

    this.setState({
      name,
      email,
      image,
      description,
      loading: false,
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(({
      [name]: value,
    }));
  };

  saveButton = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;

    this.setState({
      loading: true,
    });

    await updateUser(({ name, email, image, description }));

    this.setState({
      loading: false,
    });

    return history.push('/profile');
  };

  render() {
    const { name, email, image, description, loading } = this.state;

    const buttonDisabledProfile = (name.length > MIN_LENGTH_PROFILE)
      && email.length > MIN_LENGTH_PROFILE
      && image.length > MIN_LENGTH_PROFILE
      && description.length > MIN_LENGTH_PROFILE;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading />
          : (
            <form>
              <label>
                URL Image:
                <img
                  src={ image }
                  alt={ `Foto do usuário ${name}` }
                />
                <input
                  type="url"
                  name="image"
                  value={ image }
                  onChange={ this.onInputChange }
                  data-testid="edit-input-image"
                />
              </label>
              <label>
                Nome:
                <input
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }
                  data-testid="edit-input-name"
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={ email }
                  onChange={ this.onInputChange }
                  data-testid="edit-input-email"
                />
              </label>
              <label>
                Descrição:
                <textarea
                  name="description"
                  value={ description }
                  onChange={ this.onInputChange }
                  data-testid="edit-input-description"
                />
              </label>
              <button
                type="button"
                disabled={ !buttonDisabledProfile }
                onClick={ this.saveButton }
                data-testid="edit-button-save"
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
