import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}