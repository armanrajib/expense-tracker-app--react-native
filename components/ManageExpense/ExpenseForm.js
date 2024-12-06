import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { globalStyles } from "../../constants/styles";
import Input from "./Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../utils/date";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  function handleInputChange(inputIdentifier, enteredValue) {
    setInputValues((inputValues) => ({
      ...inputValues,
      [inputIdentifier]: enteredValue,
    }));
  }

  function handleSubmit() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            value: inputValues.amount,
            onChangeText: (amount) => handleInputChange("amount", amount),
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            placeholderTextColor: globalStyles.colors.primary200,
            maxLength: 10,
            value: inputValues.date,
            onChangeText: (date) => handleInputChange("date", date),
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          value: inputValues.description,
          onChangeText: (description) =>
            handleInputChange("description", description),
        }}
      />

      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={handleSubmit} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 16,
  },
  button: {
    minWidth: 120,
  },
});

export default ExpenseForm;
