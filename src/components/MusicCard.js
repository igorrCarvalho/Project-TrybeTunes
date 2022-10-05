import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
      favoriteMusics: [],
    };
    this.favoriteClick = this.favoriteClick.bind(this);
  }

  async favoriteClick({ target }) {
    const { checked } = target;
    const { musicObj } = this.props;
    const { favoriteMusics } = this.state;
    this.setState({ loading: true, check: checked });
    const favMusic = await addSong(musicObj);
    this.setState({
      loading: false,
      favoriteMusics: [...favoriteMusics, favMusic],
    });
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
              <label htmlFor="favorite">
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.favoriteClick }
                  id="favorite"
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
  musicObj: PropTypes.shape({ artistId: PropTypes.number }),
};

MusicCard.defaultProps = {
  musicName: '',
  preview: '',
  trackId: 0,
  musicObj: PropTypes.shape({ artistId: 0 }),
};

export default MusicCard;
