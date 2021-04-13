import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Welcome from './src/screen/Welcome';
import Lobby from './src/screen/Lobby';
import GameSettings from './src/screen/GameSettings';

const Stack = createStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Welcome} />
            <Stack.Screen name="Lobby" component={Lobby} />
            <Stack.Screen name="GameSetting" component={GameSettings} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );

}

