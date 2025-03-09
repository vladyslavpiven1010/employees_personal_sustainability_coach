import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function SocialButton({ icon, text, onPress }) {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress}>
      <Image source={icon} style={styles.socialIcon} />
      <Text style={styles.socialButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10
  },
  socialIcon: {
    width: 32,
    height: 32,
    marginRight: 60,
    marginLeft: 20
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#120d26'
  }
});