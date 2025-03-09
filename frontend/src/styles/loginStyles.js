import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 40,
    justifyContent: 'center'
  },
  headerImg: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36
  },
  title: {
    fontSize: 60,
    fontWeight: '500',
    color: '#37364A',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#120d26',
  },
  form: {
    marginBottom: 20
  },
  forgotPassword: {
    color: '#120d26',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20
  },
  signInButton: {
    backgroundColor: '#5A67EA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  orText: {
    textAlign: 'center',
    color: '#A1A1A1',
    marginVertical: 20
  },
  socialButtonsContainer: {
    marginBottom: 12
  }
});