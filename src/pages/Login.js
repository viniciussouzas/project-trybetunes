import { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';

class Login extends Component {
  render() {
    const { login, loading, redirect,
      isButtonDisabled, onInputChange, handleCreateUser } = this.props;

    if (loading) return <Loading />;

    if (redirect) return <Redirect to="/search" />;

    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            name="login"
            value={ login }
            onChange={ onInputChange }
            data-testid="login-name-input"
            placeholder="Insira seu Nome"
          />
          <button
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ handleCreateUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
};

export default Login;
