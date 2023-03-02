import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  totalExpense = () => {
    const { expenses } = this.props;
    let total = 0;

    expenses.forEach((element) => {
      const { currency } = element;
      const value = element.exchangeRates[currency].ask;
      total += element.value * value;
    });

    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <h2 style={ { color: '#550beb' } }>Trybe</h2>
          <h2>Wallet</h2>
        </div>
        <div>
          <p data-testid="email-field">
            Email:
            { email }
          </p>
        </div>
        <div>
          <p>
            Despesa Total:
          </p>
          <p data-testid="total-field">
            { this.totalExpense() }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
