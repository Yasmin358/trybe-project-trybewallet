import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, getItemById } from '../redux/actions';
import trash from '../images/trash.png';
import edit from '../images/edit.png';
import './Table.css';

class Table extends Component {
  deleteButton = (id) => {
    const { removeItem } = this.props;
    removeItem(id);
  }

  editButton = (id) => {
    const { getItem } = this.props;
    getItem(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table className="table-element">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Forma de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].code}</td>
                  <td>
                    {
                      Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                    }
                  </td>
                  <td>
                    { Number(expense.exchangeRates[expense.currency].ask
                 * expense.value).toFixed(2)}
                  </td>
                  <td>BRL</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      className="btn-edit"
                      onClick={ () => this.editButton(expense.id) }
                    >
                      <img src={ edit } alt="editar" />
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      className="btn-delete"
                      onClick={ () => this.deleteButton(expense.id) }
                    >
                      <img src={ trash } alt="excluir" />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  removeItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (idItem) => dispatch(deleteItem(idItem)),
  getItem: (idItem) => dispatch(getItemById(idItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
