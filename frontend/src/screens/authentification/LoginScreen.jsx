import { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import SocialButton from '../../components/Buttons/SocialButton';
import FormInput from '../../components/Inputs/FormInput';
import styles from './loginStyles';

export default function LoginScreen() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleSignIn = () => {
    console.log('Email:', form.email);
    console.log('Password:', form.password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../assets/images/AppLogo.png")} style={styles.headerImg} alt="logo" />
        <Text style={styles.title}>Aeris</Text>
        <Text style={styles.subtitle}>Sign in</Text>
      </View>

      <View style={styles.form}>      
        <FormInput
          icon={require("../../assets/images/Mail.png")}
          placeholder="abc@email.com"
          value={form.email}
          onChangeText={email => setForm({ ...form, email })}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          icon={require("../../assets/images/Password.png")}
          placeholder="Your password"
          value={form.password}
          onChangeText={password => setForm({ ...form, password })}
          secureTextEntry
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>   

      <Text style={styles.orText}>OR</Text>

      <View style={styles.socialButtonsContainer}>
        <SocialButton 
          icon={require("../../assets/images/Google.png")} 
          text="Login with Google" 
          onPress={() => console.log('Google login')} 
        />
        
        <SocialButton 
          icon={require("../../assets/images/Facebook.png")} 
          text="Login with Facebook" 
          onPress={() => console.log('Facebook login')} 
        />
      </View>
    </View>
  );
}