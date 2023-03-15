import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    favoriteSongs: [],
    loading: false,
  };

  componentDidMount() {
    this.handleGetFavoriteSongs();
  }

  handleGetFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });

    const response = await getFavoriteSongs();

    if (response) {
      this.setState({
        loading: false,
        favoriteSongs: response,
      });
    } else {
      this.setState({
        favoriteSongs: [],
        loading: false,
      });
    }
  };

  handleAddSong = async (music) => {
    const { favoriteSongs } = this.state;

    this.setState({
      loading: true,
    });

    await addSong(music);

    const addFavoriteSong = [...favoriteSongs, music];

    this.setState({
      loading: false,
      favoriteSongs: addFavoriteSong,
    });
  };

  handleRemoveSong = async (music) => {
    this.setState({
      loading: true,
    });

    const response = await removeSong(music);

    if (response === 'OK') {
      await this.handleGetFavoriteSongs();
    }

    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl,
      trackId, objMusic, handleUpdate } = this.props;

    const { loading, favoriteSongs } = this.state;

    if (loading) return <Loading />;

    return (
      <div>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkbox">
          Favorita
          <input
            id="checkbox"
            type="checkbox"
            name="checkbox"
            checked={ favoriteSongs.some(({ trackId: id }) => id === objMusic.trackId) }
            onChange={ ({ target: { checked } }) => {
              if (checked) {
                this.handleAddSong(objMusic);
              } else {
                this.handleRemoveSong(objMusic);
                if (handleUpdate) handleUpdate();
              }
            } }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  objMusic: PropTypes.objectOf(PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  handleUpdate: PropTypes.func,
};

MusicCard.defaultProps = {
  handleUpdate: null,
};

export default MusicCard;
