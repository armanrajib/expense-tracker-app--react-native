import { Text, View } from "react-native";

function ExpensesSummary({ expenses, expensesPeriod }) {
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <View>
      <Text>{expensesPeriod}</Text>
      <Text>${totalExpenses.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;
