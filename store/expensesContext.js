import { createContext, useReducer } from "react";

const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const initialState = [
  // {
  //   id: "e1",
  //   description: "New Shoes",
  //   amount: 99.99,
  //   date: new Date(2021, 7, 14),
  // },
];

function expensesReducer(state, action) {
  switch (action.type) {
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

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

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

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
    setExpenses,
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
