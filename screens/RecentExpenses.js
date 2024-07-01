import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);


  useEffect(() => {
    // robimy tak zeby funkcja poczekala na zakonczenie pobierania z serwera
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);

      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }

    //I dopiero potem ja wywolujemy
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null)
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
