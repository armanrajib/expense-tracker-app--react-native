import { StyleSheet, Text, View } from "react-native";

import { globalStyles } from "../../constants/styles";

function ExpensesSummary({ expenses, expensesPeriod }) {
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{expensesPeriod}</Text>
      <Text style={styles.sum}>${totalExpenses.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: globalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: globalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: globalStyles.colors.primary500,
  },
});

export default ExpensesSummary;
