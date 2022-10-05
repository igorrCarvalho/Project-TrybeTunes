import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
      favorites: [],
    };
    this.favoriteClick = this.favoriteClick.bind(this);
    this.getFavoriteMusic = this.getFavoriteMusic.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    this.getFavoriteMusic();
  }

  handleCheck() {
    const { musicObj } = this.props;
    const { favorites } = this.state;
    const isFavorite = favorites.some((obj) => musicObj.trackId === obj.id);
    this.setState({ check: isFavorite });
  }

  async getFavoriteMusic() {
    const favorited = await getFavoriteSongs();
    this.setState({
      favorites: favorited,
    }, () => this.handleCheck());
  }

  async favoriteClick({ target }) {
    const { checked } = target;
    const { musicObj } = this.props;
    const paramObj = {
      id: musicObj.trackId,
      checked,
    };
    this.setState({ loading: true, check: checked });
    await addSong(paramObj);
    this.setState({ loading: false });
  }

  render() {
    const { loading, check } = this.state;
    const { musicName, preview, trackId } = this.props;
    return (
      <div>
        { loading ? <Loading />
          : (
            <>
              <h4>{ musicName }</h4>
              <audio data-testid="audio-component" src={ preview } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor={ `favorite-${trackId}` }>
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.favoriteClick }
                  id={ `favorite-${trackId}` }
                  type="checkbox"
                  checked={ check }
                />
                Favorita
              </label>
            </>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string,
  preview: PropTypes.string,
  trackId: PropTypes.number,
  musicObj: PropTypes.shape({ artistId: PropTypes.number, trackId: PropTypes.number }),
};

MusicCard.defaultProps = {
  musicName: '',
  preview: '',
  trackId: 0,
  musicObj: PropTypes.shape({ artistId: 0, trackId: 0 }),
};

export default MusicCard;
