import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        <img id={ id } className="loadingImg" src="https://i.pinimg.com/originals/e2/63/00/e26300c0c746d3163a0f48223c897cee.gif" alt="loading" />
      </div>
    );
  }
}

Loading.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Loading;
