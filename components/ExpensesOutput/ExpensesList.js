import { FlatList, View } from "react-native";

import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(expense) {
  return (
    <ExpenseItem
      description={expense.item.description}
      date={expense.item.date}
      amount={expense.item.amount}
    />
  );
}

function ExpensesList({ expenses }) {
  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
      />
    </View>
  );
}

export default ExpensesList;
