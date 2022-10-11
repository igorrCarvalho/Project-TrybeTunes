import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';

class FavMusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: true,
    };
    this.handleEvent = this.handleEvent.bind(this);
  }

  async handleEvent({ target }) {
    const { checked } = target;
    const { trackId, allFavs, removeSong } = this.props;
    const filterObj = allFavs.filter((obj) => obj.trackId === trackId);
    if (!checked) {
      this.setState({ loading: true, check: false });
      await removeSong(filterObj[0]);
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      artworkUrl100,
      musicUrl,
      trackId,
      trackName,
    } = this.props;
    const { loading, check } = this.state;
    return (
      loading ? <Loading /> : (
        <div>
          <img src={ artworkUrl100 } alt={ trackName } />
          <h4>{ trackName }</h4>
          <audio data-testid="audio-component" src={ musicUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
          <label htmlFor={ `favorite-${trackId}` }>
            <input
              id={ `favorite-${trackId}` }
              name={ `${trackId}` }
              onChange={ this.handleEvent }
              type="checkbox"
              checked={ check }
            />
            Favorita
          </label>
        </div>
      )
    );
  }
}

FavMusicCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  musicUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  removeSong: PropTypes.func.isRequired,
  allFavs: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  })).isRequired,
};

export default FavMusicCard;
