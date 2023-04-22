// Coloque aqui suas actions

export const USER_EMAIL = 'USER_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_API = 'REQUEST_API';
export const GET_EXPENSES = 'GET_EXPENSES';
export const DELETE_ITEM = 'DELETE_ITEM';
export const GET_ITEM_BY_ID = 'GET_ITEM_BY_ID';
export const EDIT_ITEM = 'EDIT_ITEM';
export const EDIT_DISABLED = 'EDIT_DISABLED';

export const saveEmail = (email) => ({ type: USER_EMAIL, email });
export const requestApi = () => ({ type: REQUEST_API });
export const getCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });
export const getExpenses = (expenses) => ({ type: GET_EXPENSES, expenses });
export const deleteItem = (id) => ({ type: DELETE_ITEM, payload: id });
export const getItemById = (id) => ({ type: GET_ITEM_BY_ID, payload: id });
export const editItem = (item) => ({ type: EDIT_ITEM, payload: item });
export const editDisabled = (status) => ({ type: EDIT_DISABLED, payload: status });

export function fetchApi() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(getCurrencies(Object.keys(currencies)
        .filter((moeda) => moeda !== 'USDT'))));
  };
}

export function fetchExpenses(data) {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((expense) => {
      const { expenses, value, currency, method, tag, description } = data;
      const newObj = {
        id: expenses.length,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates: expense,
      };
      dispatch(getExpenses(newObj));
    });
}
