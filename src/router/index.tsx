import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import HintScreen from '../screens/HintScreen';
import IntroScreen from '../screens/IntroScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CustomHeader from '../utils/CustomHeader';
import { Alert, Appearance } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import { getBase64FromUrl } from '../utils/UsefulFunctions';
import Loading from '../utils/Loading';
import SkipHeaderRight from '../utils/SkipHeaderRight';
import Config from 'react-native-config';
import { AppContext } from '../context/AppContext';

const Stack = createStackNavigator();

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

const Router = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { user, setUser, colorScheme, setColorScheme } = useContext(AppContext)

  useEffect(() => {
    setColorScheme(Appearance.getColorScheme())
  }, []);

  useEffect(() => {
    if (!user) {
      fetchData()
    }
  }, []);

  const fetchData = async () => {
    setLoading(true)
    await getUniqueId().then(async (item) => {
      await firestore().collection('Users').doc(item).get().then(async (data) => {
        let newUser = data.data()
        if (newUser) {
          if(newUser.registeredUser) {
            await getBase64FromUrl(newUser?.imageUrl).then((result: any) => {
              newUser!.imageUrl = result
              setUser(newUser)
            })
          } else {
            setUser(newUser)
          }
        }
      })
    }).finally(() => {
      setLoading(false)
    })
  }

  const createAnonymousProfile = async (navigation) => {
    setLoading(true)
    const firebaseUrl = Config.FIREBASE_URL
    try {
      await getUniqueId().then(async (item) => {
        let newUser = {
          registeredUser: false,
          id: item,
          imageUrl: `${firebaseUrl}/o/${item}?alt=media`,
          instagram: "-",
          hints: [],
          gender: "Prefer Not to Say",
          genderPreferences: ["Male", "Female", "Non-Binary/Other"],
          attempts: 0,
          correctGuess: 0
        }
        await firestore().collection('Users').doc(item).set(newUser).then(() => {
          setUser(newUser)
          setLoading(false)
        })
      })
      navigation.push('TabNav')
    } catch (e) {
      setLoading(false)
      Alert.alert(
        'Error',
        "We regret to inform you that the profile creation process has failed.",
        [
          { text: 'OK', onPress: () => console.log("Failed") },
        ]
      );
    }

  }

  const onClickHeaderRight = (navigation) => {
    Alert.alert('Confirmation', "Please confirm that you wish to proceed without registering. By skipping registration, you will not be able to set a gender preference for the profiles you'll see, and others will not be able to guess your profile. We highly recommend registering for a better user experience. Are you sure you want to continue without registration?", [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Confirm', onPress: () => { createAnonymousProfile(navigation) }
      },
    ])
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
            headerTitleAlign: 'center',
            headerShown: false,
            headerTintColor: colorScheme === "dark" ? "white" : "black",
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
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: () => <CustomHeader />,
              headerTitleAlign: 'center',
              headerRight: () => <SkipHeaderRight onClickHeaderRight={() => onClickHeaderRight(navigation)} />,
              headerRightContainerStyle: { justifyContent: "center", flex: 1 },
            })}
          />
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
