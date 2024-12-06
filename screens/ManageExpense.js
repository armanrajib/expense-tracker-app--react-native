import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import { globalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/expensesContext";

function ManageExpense({ route, navigation }) {
  const { addExpense, updateExpense, deleteExpense } =
    useContext(ExpensesContext);

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

  function handleDeleteExpense() {
    deleteExpense(expenseId);
    navigation.goBack();
  }

  function handleCancel() {
    navigation.goBack();
  }

  function handleConfirm() {
    isEditing
      ? updateExpense(expenseId, {
          description: "Updated Expense",
          amount: 200,
          date: new Date(),
        })
      : addExpense({
          description: "New Expense",
          amount: 100,
          date: new Date(2024, 7, 15),
        });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={handleCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={handleConfirm} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            size={36}
            color={globalStyles.colors.error500}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: globalStyles.colors.primary800,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  button: {
    minWidth: 120,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: globalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
