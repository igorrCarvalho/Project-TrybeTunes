import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      albumImg: '',
      albumName: '',
      favorites: [],
      loading: false,
    };
    this.searchMusics = this.searchMusics.bind(this);
    this.favoriteClick = this.favoriteClick.bind(this);
  }

  async componentDidMount() {
    this.searchMusics();
    this.setState({ loading: true });
    const fav = await getFavoriteSongs();
    this.setState({ loading: false, favorites: fav });
  }

  async searchMusics() {
    const { match: { params: { id } } } = this.props;
    const albumMusics = await getMusics(id);
    const imgAlbum = albumMusics[0].artworkUrl100;
    const albumMakerName = albumMusics[0].artistName;
    const nameAlbum = albumMusics[0].collectionName;
    this.setState({
      musics: albumMusics,
      artistName: albumMakerName,
      albumName: nameAlbum,
      albumImg: imgAlbum,
    });
  }

  async favoriteClick(e) {
    const { musics } = this.state;
    const { name, checked } = e.target;
    const ftrMusicObj = musics.filter((obj) => obj.trackId === Number(name));
    const musicObj = {
      trackName: ftrMusicObj[0].trackName,
      trackId: ftrMusicObj[0].trackId,
      check: checked,
      artistName: ftrMusicObj[0].artistName,
      artworkUrl100: ftrMusicObj[0].artworkUrl100,
    };
    await addSong(musicObj);
  }

  render() {
    const { musics, artistName, albumImg, albumName, loading, favorites } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          { loading ? <Loading />
            : (
              <>
                <img src={ albumImg } alt="album" />
                <h3 data-testid="album-name">{ albumName }</h3>
                <h4 data-testid="artist-name">{ artistName }</h4>
                { musics.map((obj, index) => {
                  if (index > 0) {
                    return (
                      <MusicCard
                        favorites={ favorites }
                        click={ this.favoriteClick }
                        loading={ this.handleLoading }
                        key={ index }
                        musicObj={ obj }
                        trackId={ obj.trackId }
                        musicName={ obj.trackName }
                        preview={ obj.previewUrl }
                      />
                    );
                  }
                  return [];
                })}
              </>
            )}
        </div>
      </>
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
