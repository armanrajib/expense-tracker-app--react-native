import { StyleSheet, Text, TextInput, View } from "react-native";
import { globalStyles } from "../../constants/styles";

function Input({ label, style, textInputConfig }) {
  const inputStyles =
    textInputConfig && textInputConfig.multiline
      ? [styles.input, styles.inputMultiline]
      : styles.input;

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: globalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: globalStyles.colors.primary100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    fontSize: 18,
    color: globalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});

export default Input;
