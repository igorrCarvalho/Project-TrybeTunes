import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      btndisabled: true,
      searchTxt: '',
      loading: false,
      albums: [],
      req: false,
      searched: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  handleInput({ target }) {
    const { value } = target;
    const minLength = 2;
    if (value.length >= minLength) {
      return this.setState({ btndisabled: false, searchTxt: value });
    }
    this.setState({ btndisabled: true, searchTxt: value });
  }

  async onBtnClick(e) {
    e.preventDefault();
    const { searchTxt } = this.state;
    this.setState({ loading: true });
    const resultSearch = await searchAlbumsAPI(searchTxt);
    this.setState({
      searched: searchTxt,
      searchTxt: '',
      loading: false,
      albums: resultSearch,
      req: true,
    });
    return resultSearch;
  }

  render() {
    const { searched, req, albums, btndisabled, searchTxt, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          { loading ? <Loading />
            : (
              <form>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  placeholder="Nome do Artista..."
                  value={ searchTxt }
                  onChange={ this.handleInput }
                />
                <button
                  disabled={ btndisabled }
                  type="submit"
                  data-testid="search-artist-button"
                  onClick={ this.onBtnClick }
                >
                  Pesquisar
                </button>
              </form>
            ) }
          <h3>{ `Resultado de álbuns de: ${searched}` }</h3>
          { (req && albums.length === 0) ? <h3>Nenhum álbum foi encontrado</h3>
            : (
              albums.map((obj, index) => (
                <div key={ index }>
                  <img src={ obj.artworkUrl100 } alt="album" />
                  <div>
                    <h3>{ obj.collectionName }</h3>
                    <h4>{ `Artista: ${obj.artistName}` }</h4>
                    <Link
                      to={ `/album/${obj.collectionId}` }
                      data-testid={ `link-to-album-${obj.collectionId}` }
                    >
                      Informações
                    </Link>
                  </div>
                </div>
              ))) }
        </div>
      </>
    );
  }
}

export default Search;
