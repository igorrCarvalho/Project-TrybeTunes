import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
    this.handleEvent = this.handleEvent.bind(this);
  }

  async componentDidMount() {
    const { musicObj } = this.props;
    const favorites = await getFavoriteSongs();
    const savedMusic = favorites
      .some((obj) => obj.trackId === musicObj.trackId);
    if (savedMusic) this.setState({ check: savedMusic });
  }

  async handleEvent(e) {
    const { musicObj } = this.props;
    const { click } = this.props;
    const { checked } = e.target;
    if (!checked) {
      this.setState({ loading: true });
      await removeSong(musicObj);
      this.setState({ loading: false, check: checked });
    }
    if (checked) {
      console.log('oi');
      this.setState({ loading: true });
      await click(e);
      this.setState({ check: checked, loading: false });
    }
  }

  render() {
    const { loading, check } = this.state;
    const { musicName, preview, trackId } = this.props;
    return (
      <div className="musicPreviewDiv">
        { loading ? <Loading id="musicPageLoading" />
          : (
            <>
              <div className="musicNameDiv">
                <h4>{ musicName }</h4>
              </div>
              <audio
                className="musicPreview"
                data-testid="audio-component"
                src={ preview }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor={ `favorite-${trackId}` }>
                <input
                  name={ `${trackId}` }
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.handleEvent }
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
  click: PropTypes.func.isRequired,
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
