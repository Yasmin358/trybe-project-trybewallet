// Coloque aqui suas actions

export const USER_EMAIL = 'USER_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_API = 'REQUEST_API';

export const saveEmail = (email) => ({ type: USER_EMAIL, email });
export const requestApi = () => ({ type: REQUEST_API });
export const getCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });

export function fetchApi() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(getCurrencies(Object.keys(currencies)
        .filter((moeda) => moeda !== 'USDT'))));
  };
}
