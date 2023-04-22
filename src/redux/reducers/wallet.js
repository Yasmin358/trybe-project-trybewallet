// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  item: {},
  editEnabled: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'GET_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };

  case 'DELETE_ITEM':
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload),
    };

  case 'GET_ITEM_BY_ID':
    return {
      ...state,
      id: action.payload,
      item: state.expenses.find((item) => item.id === action.payload),
      editEnabled: true,
    };

  case 'EDIT_ITEM':
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === state.id) {
          item = action.payload;
        }
        return item;
      }),
    };
  case 'EDIT_DISABLED':
    return {
      ...state,
      editEnabled: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
