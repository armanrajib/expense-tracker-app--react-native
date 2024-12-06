import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import { globalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/expensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId; // Convert to boolean

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

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

  function handleConfirm(expenseData) {
    isEditing ? updateExpense(expenseId, expenseData) : addExpense(expenseData);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={handleCancel}
        onSubmit={handleConfirm}
        defaultValues={selectedExpense}
      />

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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: globalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
