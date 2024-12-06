import { createContext, useReducer } from "react";

const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const initialState = [
  {
    id: "e1",
    description: "New Shoes",
    amount: 99.99,
    date: new Date(2021, 7, 14),
  },
  {
    id: "e2",
    description: "New Shirt",
    amount: 49.99,
    date: new Date(2021, 7, 15),
  },
  {
    id: "e3",
    description: "New Pants",
    amount: 79.99,
    date: new Date(2021, 7, 16),
  },
  {
    id: "e4",
    description: "New Hat",
    amount: 29.99,
    date: new Date(2021, 7, 17),
  },
  {
    id: "e5",
    description: "New Socks",
    amount: 9.99,
    date: new Date(2024, 11, 5),
  },
];

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload }, ...state];

    case "UPDATE":
      const updatedExpenses = state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.expense }
          : expense
      );
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState);

  function addExpense(expense) {
    dispatch({ type: "ADD", payload: expense });
  }

  function updateExpense(id, expense) {
    dispatch({ type: "UPDATE", payload: { id: id, expense: expense } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export { ExpensesContext, ExpensesContextProvider };
