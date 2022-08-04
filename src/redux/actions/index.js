// Coloque aqui suas actions

export const USER_EMAIL = 'USER_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_API = 'REQUEST_API';
export const GET_EXPENSES = 'GET_EXPENSES';
export const DELETE_ITEM = 'DELETE_ITEM';

export const saveEmail = (email) => ({ type: USER_EMAIL, email });
export const requestApi = () => ({ type: REQUEST_API });
export const getCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });
export const getExpenses = (expenses) => ({ type: GET_EXPENSES, expenses });
export const deleteItem = (item) => ({ type: DELETE_ITEM, payload: item });

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
