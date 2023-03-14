import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { onInputChange, search, isButtonDisabled } = this.props;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="search"
            value={ search }
            onChange={ onInputChange }
            data-testid="search-artist-input"
            placeholder="Procure o artista ou nome da banda"
          />
          <button
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
};

export default Search;
