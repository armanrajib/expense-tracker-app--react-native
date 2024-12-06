import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { globalStyles } from "../../constants/styles";
import Input from "./Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../utils/date";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function handleInputChange(inputIdentifier, enteredValue) {
    setInputs((inputs) => ({
      ...inputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  }

  function handleSubmit() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      new Date(expenseData.date).toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((inputs) => ({
        amount: {
          value: inputs.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: inputs.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: inputs.description.value,
          isValid: descriptionIsValid,
        },
      }));

      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            value: inputs.amount.value,
            onChangeText: (amount) => handleInputChange("amount", amount),
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            placeholderTextColor: globalStyles.colors.primary200,
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: (date) => handleInputChange("date", date),
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          onChangeText: (description) =>
            handleInputChange("description", description),
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check your entered data!
        </Text>
      )}

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
  errorText: {
    textAlign: "center",
    fontWeight: "bold",
    color: globalStyles.colors.error500,
    backgroundColor: globalStyles.colors.error50,
    margin: 4,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 6,
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
