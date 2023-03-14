import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';

class Search extends Component {
  render() {
    const { onInputChange, handleSearchAlbums,
      search, isButtonDisabled,
      loading, searchArtist, searchMusics } = this.props;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading />
          : (
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
                type="button"
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ handleSearchAlbums }
              >
                Pesquisar
              </button>
            </form>
          )}
        <h3>
          Resultado de álbuns de:
          {' '}
          {searchArtist}
        </h3>

        {searchMusics.length === 0 ? <span>Nenhum álbum foi encontrado</span>
          : (
            searchMusics.map(({ collectionId, artworkUrl100, collectionName }) => (
              <div key={ collectionId }>
                <img src={ artworkUrl100 } alt={ collectionName } />

                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  {collectionName}
                </Link>
              </div>
            ))
          )}
      </div>
    );
  }
}

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  handleSearchAlbums: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  searchArtist: PropTypes.string.isRequired,
  searchMusics: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  })).isRequired,
};

export default Search;
