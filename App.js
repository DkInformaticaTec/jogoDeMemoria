import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import AccessibilityPanel from './components/AccessibilityPanel';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <AppNavigator />
          {/* Painel de acessibilidade fixo no canto inferior direito */}
          <View style={styles.accessibilityContainer}>
            {/*<AccessibilityPanel />*/}
          </View>
        </View>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  accessibilityContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999, // fica por cima de tudo
  },
});
