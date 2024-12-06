import { Pressable, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";

function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: globalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "trasparent",
    borderWidth: 1,
    borderColor: globalStyles.colors.primary400,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: globalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: globalStyles.colors.primary100,
    borderRadius: 4,
  },
});

export default Button;
