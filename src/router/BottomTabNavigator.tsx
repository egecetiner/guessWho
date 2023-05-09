import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "../screens/ProfileScreen";
import React, { useContext, useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack';
import UpdateScreen from '../screens/UpdateScreen';
import CustomHeader from '../utils/CustomHeader';
import GuessScreen from '../screens/GuessScreen';
import CongratsScreen from '../screens/CongratsScreen';
import WrongScreen from '../screens/WrongScreen';
import { Appearance, ColorSchemeName } from 'react-native';
import { UserContext } from '../context/UserContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => {
    const [colorScheme, setColorScheme] = useState<ColorSchemeName>(undefined)

    useEffect(() => {
        setColorScheme(Appearance.getColorScheme())
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colorScheme === "dark" ? "white" : "black",
                headerShown: true,
                headerTitle: () => <CustomHeader />,
            }}>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerLeft: () => (
                        null
                    )
                }}
            />
            <Stack.Screen
                name="ProfileUpdate"
                component={UpdateScreen}
            />
        </Stack.Navigator>
    )
}

const GuessStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Guess"
                component={GuessScreen}
            />
            <Stack.Screen
                name="Congrats"
                component={CongratsScreen}
            />
            <Stack.Screen
                name="Wrong"
                component={WrongScreen}
            />
        </Stack.Navigator>
    )
}

const BottomTabNavigator = () => {
    const { user } = useContext(UserContext)
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarInactiveTintColor: 'white',
                tabBarActiveTintColor: '#e47911',
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: 'black' },
                tabBarIconStyle: { display: user ? "flex" : "none" }
            }}
            initialRouteName='GuessStack'
        >
            {
                user ? <Tab.Screen name="ProfileStack" component={ProfileStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Entypo name='man' color={color} size={25} />
                        ),
                    }} /> : null
            }

            <Tab.Screen name="GuessStack"
                component={GuessStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='mask' color={color} size={25} />
                    ),
                    headerShown: true, headerTitle: () => <CustomHeader />,

                }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator