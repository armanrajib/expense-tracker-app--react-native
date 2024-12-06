import { useContext } from "react";
import { Text, View } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expensesContext";

function AllExpenses() {
  const { expenses } = useContext(ExpensesContext);

  return (
    <View>
      <ExpensesOutput
        expenses={expenses}
        expensesPeriod="Total"
        fallbackText="No registered expenses found!"
      />
    </View>
  );
}

export default AllExpenses;
