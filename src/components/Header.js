import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import logo from '../pages/figmaLogo.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: '',
      image: '',
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
      username: userHeaderData.name,
      image: userHeaderData.image,
    });
    this.setState({ loading: false });
  }

  render() {
    const { loading, username, image } = this.state;
    return (
      <header className="header" data-testid="header-component">
        <img src={ logo } alt="logo" />
        <Link
          className="headerLink"
          to="/search"
          data-testid="link-to-search"
        >
          Search
        </Link>
        <Link
          className="headerLink"
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Favorites
        </Link>
        <Link
          className="headerLink"
          data-testid="link-to-profile"
          to="/profile"
        >
          Profile
        </Link>
        <div className="userDiv">
          { loading ? <Loading id="headerLoading" />
            : (
              <>
                <img className="userImg" src={ image } alt="user" />
                <h3
                  className="usernameShow"
                  data-testid="header-user-name"
                >

                  { username }
                </h3>
              </>
            )}
        </div>
      </header>
    );
  }
}

export default Header;
