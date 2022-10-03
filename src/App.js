import React from 'react';
import Routes from './Routes';
import { createUser } from './services/userAPI';

const STATE = {
  btnDisabled: true,
  username: '',
  logged: false,
  loading: false,
};

class App extends React.Component {
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
    const { username } = this.state;
    this.setState({ loading: true });
    await createUser({ name: username });
    this.setState({ loading: false });
  }

  render() {
    const { loading, btnDisabled, username } = this.state;
    return (
      <Routes
        entryClick={ this.entryBtnClick }
        loading={ loading }
        username={ username }
        btnIsDisabled={ btnDisabled }
        handleStats={ this.handleBtn }
      />
    );
  }
}

export default App;
