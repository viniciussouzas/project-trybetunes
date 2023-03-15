import { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
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
    }
  };

  render() {
    const { favoriteSongs, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading />
          : favoriteSongs.map((music) => (
            <MusicCard
              key={ music.trackNumber }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              objMusic={ music }
              handleUpdate={ this.handleGetFavoriteSongs }
            />
          ))}
      </div>
    );
  }
}

export default Favorites;
