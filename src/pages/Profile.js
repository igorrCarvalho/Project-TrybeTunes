import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      loading: false,
    };

    this.btnProfileClick = this.btnProfileClick.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false });
    this.setState({ userData: user });
  }

  btnProfileClick() {
    const { history } = this.props;
    history.push('/profile/edit');
  }

  render() {
    const { loading, userData } = this.state;
    const { image } = userData;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          { loading ? <Loading />
            : (
              <>
                <div>
                  <img
                    data-testid="profile-image"
                    src={ image }
                    alt="Nenhuma foto salva"
                  />
                </div>
                <div>
                  <Link
                    to="/profile/edit"
                  >
                    Editar perfil
                  </Link>
                </div>
                <div>
                  <h3>Nome</h3>
                  <p>{ userData.name }</p>
                </div>
                <div>
                  <h3>E-mail</h3>
                  { userData.email === '' ? <p>Nenhum E-mail informado</p>
                    : (
                      <p>{ userData.email }</p>
                    )}
                </div>
                <div>
                  <h3>Descrição</h3>
                  { userData.description === '' ? <p>Nenhuma descrição informada</p>
                    : (
                      <p>{ userData.description }</p>
                    )}
                </div>
              </>
            )}
        </div>
      </>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
