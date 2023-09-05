import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import WalletNavigation from './src/features/wallet/walletnavigation/WalletNavigaton';

export default function App() {
  return (
    <NavigationContainer>
      <WalletNavigation />
    </NavigationContainer>
  );
}
