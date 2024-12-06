import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

function ManageExpense({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId; // Convert to boolean

  useLayoutEffect(
    function () {
      navigation.setOptions({
        title: isEditing ? "Edit Expense" : "Add Expense",
      });
    },
    [navigation, isEditing]
  );

  return (
    <View>
      <Text>Manage Expense</Text>
    </View>
  );
}

export default ManageExpense;
