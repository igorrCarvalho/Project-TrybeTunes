import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      albumImg: '',
      albumName: '',
    };
    this.searchMusics = this.searchMusics.bind(this);
  }

  componentDidMount() {
    this.searchMusics();
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

  render() {
    const { musics, artistName, albumImg, albumName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <img src={ albumImg } alt="album" />
          <h3 data-testid="album-name">{ albumName }</h3>
          <h4 data-testid="artist-name">{ artistName }</h4>
          { musics.map((obj, index) => {
            if (index > 0) {
              return (
                <MusicCard
                  key={ index }
                  musicName={ obj.trackName }
                  preview={ obj.previewUrl }
                />
              );
            }
            return undefined;
          })}
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
