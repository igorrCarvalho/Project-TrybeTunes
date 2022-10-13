import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
      email: '',
      description: '',
      loading: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const data = await getUser();
    this.setState({
      loading: false,
      name: data.name,
      image: data.image,
      email: data.email,
      description: data.description,
      btnDisabled: true,
    });
  }

  handleInput({ target }) {
    const { name: nam, image, email, description } = this.state;
    const { name, value } = target;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
    this.setState({
      [name]: value,
    });
    if (nam && image && regex.test(email) && description) {
      this.setState({ btnDisabled: false });
    }
  }

  async onBtnClick() {
    const { history } = this.props;
    const { image, description, email, name } = this.state;
    const newSave = {
      name,
      email,
      image,
      description,
    };
    this.setState({ loading: true });
    await updateUser(newSave);
    this.setState({ loading: false });
    history.push('/profile');
  }

  render() {
    const { btnDisabled, name, image, email, description, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          { loading ? <Loading />
            : (
              <>
                <label htmlFor="img">
                  Imagem
                  <input
                    data-testid="edit-input-image"
                    id="img"
                    onChange={ this.handleInput }
                    name="image"
                    type="text"
                    value={ image }
                  />
                </label>
                <img src={ image } alt="Sem imagem atual" />
                <label htmlFor="name">
                  Nome
                  <input
                    data-testid="edit-input-name"
                    id="name"
                    onChange={ this.handleInput }
                    type="text"
                    name="name"
                    value={ name }
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    data-testid="edit-input-email"
                    id="email"
                    onChange={ this.handleInput }
                    name="email"
                    type="text"
                    value={ email }
                  />
                </label>
                <label htmlFor="desc">
                  Description
                  <textarea
                    data-testid="edit-input-description"
                    id="desc"
                    onChange={ this.handleInput }
                    name="description"
                    type="text"
                    value={ description }
                  />
                </label>
                <button
                  disabled={ btnDisabled }
                  type="button"
                  data-testid="edit-button-save"
                  onClick={ this.onBtnClick }
                >
                  Salvar
                </button>
              </>
            )}
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
