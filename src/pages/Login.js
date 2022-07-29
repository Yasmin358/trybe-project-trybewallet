import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  validateButton = () => {
    const { email, password } = this.state;
    const minLength = 6;
    if (password.length >= minLength && email.includes('@') && email.includes('.com')) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  submitLogin = () => {
    const { email } = this.state;
    const { history, setEmail } = this.props;
    setEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Digite seu email aqui"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          placeholder="Digite sua senha aqui"
          name="password"
          value={ password }
        />
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.submitLogin }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
