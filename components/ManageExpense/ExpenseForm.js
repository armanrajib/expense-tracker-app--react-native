import { StyleSheet, Text, View } from "react-native";

import { globalStyles } from "../../constants/styles";
import Input from "./Input";

function ExpenseForm() {
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{ keyboardType: "decimal-pad" }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            placeholderTextColor: globalStyles.colors.primary200,
            maxLength: 10,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input label="Description" textInputConfig={{ multiline: true }} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 16,
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
});

export default ExpenseForm;
