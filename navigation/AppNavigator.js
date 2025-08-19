import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import AmazoniaScreen from '../screens/AmazoniaScreen';
import CaatingaScreen from '../screens/CaatingaScreen';
import CerradoScreen from '../screens/CerradoScreen';
import MataAtlanticaScreen from '../screens/MataAtlanticaScreen';
import MapaBiomas from '../screens/MapaBiomas';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="MapaBiomas">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }}/>
      <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: true }}/>
      <Stack.Screen name="Amazonia" component={AmazoniaScreen} options={{ headerShown: true }}/>
      <Stack.Screen name="Cerrado" component={CerradoScreen} options={{ headerShown: true }}/>
      <Stack.Screen name="Caatinga" component={CaatingaScreen} options={{ headerShown: true }}/>
      <Stack.Screen name="MataAtlantica" component={MataAtlanticaScreen} options={{ headerShown: true }} />
      <Stack.Screen name="MapaBiomas" component={MapaBiomas} options={{headerShown: true}} />
    </Stack.Navigator>
    
  );
}
