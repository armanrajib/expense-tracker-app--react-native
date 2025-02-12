import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-51c95-default-rtdb.firebaseio.com";

export async function storeExpense(expense) {
  const response = await axios.post(`${BACKEND_URL}/expenses.json`, expense);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(expenseId, expenseData) {
  return axios.put(`${BACKEND_URL}/expenses/${expenseId}.json`, expenseData);
}

export function deleteExpense(expenseId) {
  return axios.delete(`${BACKEND_URL}/expenses/${expenseId}.json`);
}
