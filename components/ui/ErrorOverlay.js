import { StyleSheet, Text, View } from "react-native";

import { globalStyles } from "../../constants/styles";
import Button from "./Button";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm} style={styles.button}>
        Okay
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: globalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    marginTop: 8,
    width: 120,
  },
});

export default ErrorOverlay;
