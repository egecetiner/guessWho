import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import HintScreen from '../screens/HintScreen';
import IntroScreen from '../screens/IntroScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CustomHeader from '../utils/CustomHeader';
import { Appearance, ColorSchemeName } from 'react-native';
import { UserContext } from '../context/UserContext';
import { getUniqueId } from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import { getBase64FromUrl } from '../utils/UsefulFunctions';
import Loading from '../utils/Loading';

const Stack = createStackNavigator();

const Router = () => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    setColorScheme(Appearance.getColorScheme())
    fetchData()
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

  const fetchData = async () => {
    setLoading(true)
    await getUniqueId().then(async (item) => {
      await firestore().collection('Users').doc(item).get().then(async (data) => {
        let newUser = data.data()
        if (newUser) {
          try {
            await getBase64FromUrl(newUser?.imageUrl).then((result: any) => {
              newUser!.imageUrl = result
              setUser(newUser)
            })
          }
          catch {
            newUser!.imageUrl = ""
            setUser(newUser)
          }
        }
      })
    }).finally(() => {
      setLoading(false)
    })
  }


  if (loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <NavigationContainer theme={colorScheme === "dark" ? BlackTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTintColor: colorScheme === "dark" ? "white" : "black"
          }}
        >
          {
            user ? null :
              <Stack.Screen
                name="Intro"
                component={IntroScreen}
              />
          }
          <Stack.Screen
            name="TabNav"
            component={BottomTabNavigator}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: true,
              headerTitle: () => <CustomHeader />,
              headerBackTitle: ""
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
    )
  }
}

export default Router;
