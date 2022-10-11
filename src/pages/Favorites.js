import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import FavMusicCard from '../components/FavMusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favSongs: [],
      loading: false,
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favs = await getFavoriteSongs();
    this.setState({ loading: false, favSongs: favs });
  }

  async handleRemove(obj) {
    await removeSong(obj);
    const savedArr = JSON.parse(localStorage.getItem('favorite_songs'));
    this.setState({ favSongs: savedArr });
  }

  render() {
    const { favSongs, loading } = this.state;
    return (
      <>
        <Header />
        <h3>Músicas favoritas</h3>
        <div data-testid="page-favorites">
          { loading ? <Loading />
            : (
              favSongs.map((obj) => (
                <FavMusicCard
                  key={ obj.trackId }
                  artistName={ obj.artistName }
                  artworkUrl100={ obj.artworkUrl100 }
                  musicUrl={ obj.musicUrl }
                  trackId={ obj.trackId }
                  trackName={ obj.trackName }
                  removeSong={ this.handleRemove }
                  allFavs={ favSongs }
                />
              ))
            )}
        </div>
      </>
    );
  }
}

export default Favorites;
