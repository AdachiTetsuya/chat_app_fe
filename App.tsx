import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';



export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider >
      <Navigation colorScheme={colorScheme} />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}