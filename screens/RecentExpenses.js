import { Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function RecentExpenses() {
  return (
    <View>
      <ExpensesOutput expensesPeriod="Last 7 Days" />
    </View>
  );
}

export default RecentExpenses;
