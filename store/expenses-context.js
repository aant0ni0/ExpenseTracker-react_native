import { createContext, useReducer } from 'react';
import { storeExpense } from '../util/http';

// Lista przykładowych wydatków


// Tworzenie kontekstu dla wydatków, początkowe wartości to pusta lista i puste funkcje
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => { },
  setExpenses: (Expenses) => { },
  deleteExpense: (id) => { },
  updateExpense: (id, { description, amount, date }) => { },
});

// Reducer, który zarządza stanem wydatków na podstawie typu akcji
function expensesReducer(state, action) {
  //state to lista wydatków, która przechowuje wszystkie wydatki.
  //action zawiera typ akcji (action.type) oraz dane potrzebne do wykonania tej akcji (action.payload).
  switch (action.type) {

    case 'ADD':
      return [{ ...action.payload }, ...state];

    case 'SET':
      return action.payload.reverse();

    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      // Zwraca bieżący stan, jeśli typ akcji jest nieznany
      return state;
  }
}

// Komponent dostarczający kontekst dla wydatków
function ExpensesContextProvider({ children }) {
  // Używa reducera do zarządzania stanem wydatków, inicjalny stan to DUMMY_EXPENSES
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  // Funkcja do dodawania wydatku
  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }

  // Funkcja do usuwania wydatku
  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  // Funkcja do aktualizacji wydatku
  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  // Wartości, które będą dostarczane do komponentów zagnieżdżonych
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  // Zwraca komponent kontekstowy z przekazanymi wartościami
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
