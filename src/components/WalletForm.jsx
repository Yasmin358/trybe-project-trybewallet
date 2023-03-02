import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchExpenses } from '../redux/actions';
import './WalletForm.css';

class WalletForm extends React.Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;

    this.setState({
      [id]: value,
    }, this.validateButton);
  }

  submitForm = (event) => {
    event.preventDefault();
    const { value, currency, method, tag, description } = this.state;
    const { expenses, getExpenses } = this.props;
    const data = { expenses, value, currency, method, tag, description };
    getExpenses(data);
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      description: '',
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form className="Form">
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            id="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies.map((moeda) => <option key={ moeda }>{moeda}</option>)}
          </select>
        </label>

        <label htmlFor="method">
          Metodo:
          <select
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <div>
          <button type="button" onClick={ this.submitForm }>
            Adicionar despesa
          </button>
        </div>
      </form>

    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchApi()),
  getExpenses: (data) => dispatch(fetchExpenses(data)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
