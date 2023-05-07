import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import HintScreen from '../screens/HintScreen';
import IntroScreen from '../screens/IntroScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CustomHeader from '../utils/CustomHeader';
import { Appearance, ColorSchemeName } from 'react-native';

const Stack = createStackNavigator();

const Router = () => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(undefined)

  useEffect(() => {
    setColorScheme(Appearance.getColorScheme())
  }, []);

  const BlackTheme = {
    dark: true,
    colors: {
      primary: 'black',
      background: 'black',
      card: 'black',
      text: 'black',
      border: 'black',
      notification: 'black',
    },
  };

  return (
    <NavigationContainer theme={colorScheme === "dark" ? BlackTheme : DefaultTheme }>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTintColor: colorScheme === "dark" ?   "white" : "black"
        }}
        >
        <Stack.Screen
          name="TabNav"
          component={BottomTabNavigator} />

        <Stack.Screen
          name="Intro"
          component={IntroScreen}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: true,
            headerTitle: () => <CustomHeader />
          }} />
        <Stack.Screen
          name="Hints"
          component={HintScreen}
          options={{
            headerShown: true,
            headerTitle: () => <CustomHeader />
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
