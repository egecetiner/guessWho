import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "../screens/ProfileScreen";
import React, { useContext } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack';
import UpdateScreen from '../screens/UpdateScreen';
import CustomHeader from '../utils/CustomHeader';
import GuessScreen from '../screens/GuessScreen';
import CongratsScreen from '../screens/CongratsScreen';
import WrongScreen from '../screens/WrongScreen';
import { AppContext } from '../context/AppContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => {
    const { colorScheme } = useContext(AppContext)
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colorScheme === "dark" ? "white" : "black",
                headerShown: true,
                headerTitleAlign: 'center',
                headerTitle: () => <CustomHeader />,
            }}>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerLeft: () => (null) }}
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
            <Stack.Screen
                name="ProfileUpdate"
                component={UpdateScreen}
            />
        </Stack.Navigator>
    )
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarInactiveTintColor: 'white',
                tabBarActiveTintColor: '#e47911',
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: 'black' }
            }}
        >
            <Tab.Screen name="ProfileStack" component={ProfileStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name='man' color={color} size={25} />
                    ),
                }} />
            <Tab.Screen name="GuessStack"
                component={GuessStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name='mask' color={color} size={25} />
                    ),
                    headerTitleAlign: 'center',
                    headerShown: true, headerTitle: () => <CustomHeader />,
                }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator