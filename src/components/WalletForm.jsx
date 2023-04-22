import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchExpenses, editItem, editDisabled } from '../redux/actions';
import './WalletForm.css';

class WalletForm extends React.Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: '',
    description: '',
    edit: false,
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    const { editEnabled, editabled, item } = this.props;
    console.log(item);
    if (editEnabled) {
      this.setState({
        value: item.value,
        currency: item.currency,
        method: item.method,
        tag: item.tag,
        description: item.description,
        edit: true,
      });
      editabled(false);
    }

    this.setState({
      [id]: value,
    }, this.validateButton);
  }

  submitForm = (event) => {
    event.preventDefault();
    const { value, currency, method, tag, description, edit } = this.state;
    const { expenses, getExpenses, editItemById, item } = this.props;
    const data = { value, currency, method, tag, description };
    console.log(data);
    if (edit) {
      const { exchangeRates, id } = item;
      const newData = { id, ...data, exchangeRates };
      console.log(newData);
      editItemById(newData);
    } else {
      getExpenses({ ...data, expenses });
    }
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      edit: false,
    });
  }

  render() {
    const { currencies, editEnabled, item } = this.props;
    const { value, currency, method, tag, description, edit } = this.state;

    return (
      <form className="Form">
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            id="value"
            onChange={ this.handleChange }
            value={ editEnabled ? item.value : value }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ editEnabled ? item.currency : currency }
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
            value={ editEnabled ? item.method : method }
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
            value={ editEnabled ? item.tag : tag }
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
            value={ editEnabled ? item.description : description }
          />
        </label>
        <div>
          <button type="button" onClick={ this.submitForm }>
            { editEnabled || edit ? 'Editar despesa' : 'Adicionar despesa' }
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
  item: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  editEnabled: PropTypes.bool.isRequired,
  editItemById: PropTypes.func.isRequired,
  editabled: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchApi()),
  getExpenses: (data) => dispatch(fetchExpenses(data)),
  editItemById: (item) => dispatch(editItem(item)),
  editabled: (status) => dispatch(editDisabled(status)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  item: state.wallet.item,
  editEnabled: state.wallet.editEnabled,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
