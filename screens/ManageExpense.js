import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { globalStyles } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { ExpensesContext } from "../store/expensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    expenses,
    addExpense,
    updateExpense: updateExpenseCtx,
    deleteExpense: deleteExpenseCtx,
  } = useContext(ExpensesContext);

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

  async function handleDeleteExpense() {
    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId);
      deleteExpenseCtx(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense!");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    navigation.goBack();
  }

  async function handleConfirm(expenseData) {
    // isEditing ? updateExpense(expenseId, expenseData) : addExpense(expenseData);
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateExpense(expenseId, expenseData);
        updateExpenseCtx(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save expense!");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) return <LoadingOverlay />;

  if (error && !isSubmitting)
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;

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
