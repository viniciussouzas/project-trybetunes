import { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
        loading: false,
        favoriteSongs: [],
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

  render() {
    const { trackName, previewUrl,
      trackId, objMusic } = this.props;

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
        <input
          type="checkbox"
          name="checkbox"
          checked={ favoriteSongs.some(({ trackId: id }) => id === objMusic.trackId) }
          onChange={ () => this.handleAddSong(objMusic) }
          data-testid={ `checkbox-music-${trackId}` }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  objMusic: PropTypes.objectOf(PropTypes.shape({}).isRequired).isRequired,
};

export default MusicCard;
