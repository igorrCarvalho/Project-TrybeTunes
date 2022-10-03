import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: '',
    };
    this.handleUsername = this.handleUsername.bind(this);
  }

  componentDidMount() {
    this.handleUsername();
  }

  async handleUsername() {
    this.setState({ loading: true });
    const userHeaderData = await getUser();
    this.setState({
      loading: false,
      username: userHeaderData.name,
    });
  }

  render() {
    const { loading, username } = this.state;
    return (
      <header data-testid="header-component">
        <h3>Trybetunes</h3>
        <div>
          { loading ? <Loading /> : <h3 data-testid="header-user-name">{ username }</h3> }
        </div>
      </header>
    );
  }
}

export default Header;
