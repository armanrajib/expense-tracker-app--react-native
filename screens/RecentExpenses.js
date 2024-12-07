import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expensesContext";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(function () {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const fetchedExpenses = await fetchExpenses();
        setExpenses(fetchedExpenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      } finally {
        setIsFetching(false);
      }
    }
    getExpenses();
  }, []);

  if (isFetching) return <LoadingOverlay />;

  if (error && !isFetching)
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <View>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 Days"
        fallbackText="No expenses registered in the last 7 days."
      />
    </View>
  );
}

export default RecentExpenses;
