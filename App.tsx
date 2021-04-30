import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Welcome from './src/screens/Welcome';
import GameContent from './src/screens/GameContent';
import Lobby from './src/screens/Lobby';
import { SnackbarProvider } from './src/context/SnackbarProvider';
// import GameSettings from './src/screen/GameSettings';
import { AuthProvider } from './src/context/AuthProvider';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens';
const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  StartScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  Dashboard: { username: string };
  ResetPasswordScreen: undefined;
  GameContent: { username: string };
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

export type START_SCREEN_PROPS = StackScreenProps<RootStackParamList, 'StartScreen'>;
export type LOGIN_SCREEN_PROPS = StackScreenProps<RootStackParamList, 'LoginScreen'>;
export type REGISTER_SCREEN_PROPS = StackScreenProps<RootStackParamList, 'RegisterScreen'>;
export type DASHBOARD_SCREEN_PROPS = StackScreenProps<RootStackParamList, 'Dashboard'>;
export type RESET_PASSWORD_SCREEN_PROPS = StackScreenProps<
  RootStackParamList,
  'ResetPasswordScreen'
>;
export type GAME_CONTENT_PROPS = StackScreenProps<RootStackParamList, 'GameContent'>;
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SnackbarProvider>
          <AuthProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="StartScreen"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />

                {/* <Stack.Screen name="Home" component={Welcome} /> */}
                <Stack.Screen name="GameContent" component={GameContent} />
                {/* <Stack.Screen name="Lobby" component={Lobby} /> */}
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </SnackbarProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
