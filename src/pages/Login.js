import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';
import Logo from '../images/TrybeWallet.png';
import './Login.css';

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
      <div className="page-login">
        <section className="container">
          <div className="Logo">
            <img src={ Logo } alt="Logo" id="imageLogo" />
            <div className="Title-Container">
              <h2 className="TitleOne">Trybe</h2>
              <h2 className="TitleTwo">Wallet</h2>
            </div>
          </div>
          <form>
            <label htmlFor="email-input" className="email-label">
              Email
              <input
                type="email"
                data-testid="email-input"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password-input" className="password-label">
              Password
              <input
                type="password"
                data-testid="password-input"
                onChange={ this.handleChange }
                name="password"
                value={ password }
              />
            </label>
            <div className="button-container">
              <button
                type="button"
                disabled="true"
              >
                Cadastre-se
              </button>
              <button
                type="button"
                disabled={ buttonDisabled }
                onClick={ this.submitLogin }
              >
                Entrar
              </button>
            </div>
          </form>
        </section>
      </div>

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
