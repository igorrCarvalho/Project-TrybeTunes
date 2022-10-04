import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      btndisabled: true,
      searchTxt: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
  }

  handleInput({ target }) {
    const { value } = target;
    const minLength = 2;
    if (value.length >= minLength) {
      return this.setState({ btndisabled: false, searchTxt: value });
    }
    this.setState({ btndisabled: true, searchTxt: value });
  }

  disableBtn() {

  }

  render() {
    const { btndisabled, searchTxt } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
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
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
