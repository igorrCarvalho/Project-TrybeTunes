import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import logo from './figmaLogo.png';
import randomUser from '../randomUser.png';

const STATE = {
  btnDisabled: true,
  username: '',
  logged: false,
  loading: false,
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = STATE;
    this.handleBtn = this.handleBtn.bind(this);
    this.entryBtnClick = this.entryBtnClick.bind(this);
  }

  handleBtn({ target }) {
    const { value } = target;
    const minLeng = 3;
    if (value.length >= minLeng) {
      return this.setState({
        btnDisabled: false,
        username: value,
      });
    }
    this.setState({
      btnDisabled: true,
      username: value,
    });
  }

  async entryBtnClick() {
    const { history } = this.props;
    const { username } = this.state;
    this.setState({ loading: true });
    await createUser({ name: username, image: randomUser });
    this.setState({ loading: false });
    history.push('/search');
  }

  render() {
    const {
      btnDisabled,
      username,
      loading,
    } = this.state;
    return (
      <div className="loginDiv" data-testid="page-login">
        <img id="figmaLogo" src={ logo } alt="logo" />
        { loading ? <Loading id="loginLoading" />
          : (
            <form>
              <label id="labelInput" htmlFor="username">
                Nome
                <input
                  id="username"
                  type="text"
                  data-testid="login-name-input"
                  value={ username }
                  onChange={ this.handleBtn }
                />
              </label>
              <button
                id="enterBtn"
                onClick={ this.entryBtnClick }
                disabled={ btnDisabled }
                data-testid="login-submit-button"
                type="submit"
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
