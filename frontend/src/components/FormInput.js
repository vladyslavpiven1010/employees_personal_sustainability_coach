import { View, TextInput, Image, StyleSheet } from 'react-native';

export default function FormInput({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true
}) {
  return (
    <View style={styles.input}> 
      <Image style={styles.inputImg} source={icon} />
      <TextInput 
        style={styles.inputForm}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: "center", 
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    gap: 14,
    marginBottom: 20
  },
  inputImg: {
    width: 22,
    height: 22,
  },
  inputForm: {
    flex: 1
  }
});