import { StyleSheet, View } from "react-native";

import { globalStyles } from "../../constants/styles";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
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
    date: new Date(2021, 7, 18),
  },
  {
    id: "e6",
    description: "New Shoes",
    amount: 99.99,
    date: new Date(2021, 7, 14),
  },
  {
    id: "e7",
    description: "New Shirt",
    amount: 49.99,
    date: new Date(2021, 7, 15),
  },
  {
    id: "e8",
    description: "New Pants",
    amount: 79.99,
    date: new Date(2021, 7, 16),
  },
  {
    id: "e9",
    description: "New Hat",
    amount: 29.99,
    date: new Date(2021, 7, 17),
  },
  {
    id: "e10",
    description: "New Socks",
    amount: 9.99,
    date: new Date(2021, 7, 18),
  },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={DUMMY_EXPENSES}
        expensesPeriod={expensesPeriod}
      />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    padding: 24,
    backgroundColor: globalStyles.colors.primary700,
  },
});

export default ExpensesOutput;
