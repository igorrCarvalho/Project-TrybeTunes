import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
    this.handleEvent = this.handleEvent.bind(this);
    /* this.favoriteClick = this.favoriteClick.bind(this);
    this.getFavoriteMusic = this.getFavoriteMusic.bind(this);
    this.handleCheck = this.handleCheck.bind(this); */
  }

  componentDidMount() {
    const { favorites, musicObj } = this.props;
    const savedMusic = favorites.filter((obj) => obj.musicId !== musicObj.trackId);
    console.log(savedMusic);
    if (savedMusic.length > 0) this.setState({ check: savedMusic[0].check });
  }

  handleEvent(e) {
    const { click } = this.props;
    const { checked } = e.target;
    this.setState({ check: checked });
    click(e);
  }

  /*  async componentDidMount() {
    const { loading, musicObj } = this.props;
    loading(true);
    const favMusics = await getFavoriteSongs();
    const isCheck = favMusics.some((obj) => obj.trackId === musicObj.trackId);
    this.setState({ check: isCheck });
    loading(false);
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

  async favoriteAdd() {
    const { musicObj, loading } = this.props;
    const { check } = this.state;
    if (check) {
      loading(true);
      await addSong(musicObj);
      loading(false);
    }
  }

  favoriteClick({ target }) {
    const { checked } = target;
    this.setState({ check: checked }, () => this.favoriteAdd());
  }
 */
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
  favorites: PropTypes.arrayOf(PropTypes.shape({
    musicId: PropTypes.number.isRequired,
    check: PropTypes.bool.isRequired,
  })),
  musicName: PropTypes.string,
  preview: PropTypes.string,
  trackId: PropTypes.number,
  musicObj: PropTypes.shape({ artistId: PropTypes.number, trackId: PropTypes.number }),
};

MusicCard.defaultProps = {
  favorites: [],
  musicName: '',
  preview: '',
  trackId: 0,
  musicObj: PropTypes.shape({ artistId: 0, trackId: 0 }),
};

export default MusicCard;
