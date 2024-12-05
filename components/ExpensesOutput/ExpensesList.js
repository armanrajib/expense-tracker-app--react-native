import { FlatList, Text, View } from "react-native";

function renderExpenseItem(expense) {
  return (
    <View>
      <Text>{expense.item.description}</Text>
      <Text>${expense.item.amount.toFixed(2)}</Text>
    </View>
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
