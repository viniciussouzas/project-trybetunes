import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musicId: [],
  };

  componentDidMount() {
    this.handleGetMusics();
  }

  handleGetMusics = async () => {
    const { match: { params: { id } } } = this.props;

    const responseGetMusics = await getMusics(id);

    this.setState({
      musicId: responseGetMusics,
    });
  };

  render() {
    const { musicId } = this.state;
    const sliceAlbumfromMusic = musicId.slice(1);

    return (
      <div data-testid="page-album">
        <Header />

        <h2 data-testid="artist-name">{ musicId[0]?.artistName }</h2>

        <h3 data-testid="album-name">{ musicId[0]?.collectionName }</h3>

        {
          sliceAlbumfromMusic.map((music) => (
            <MusicCard
              key={ music.trackNumber }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              objMusic={ music }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
